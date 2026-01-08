import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { auth } from "../config/Firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendEmailVerification,
  type User,
} from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/endpoints/Users";
import { athletesApi } from "../api/endpoints/Athletes";
import { brandsApi } from "../api/endpoints/Brands";
import { directorsApi } from "../api/endpoints/Directors";

export type Role = "athlete" | "brand" | "director";

// Session timeout: 24 hours (stricter security for financial application)
const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const LAST_ACTIVITY_KEY = "dapup_last_activity";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, role: Role) => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

async function provisionUserDocs(uid: string, email: string, role: Role) {
  // Create user record via API
  const userResponse = await usersApi.createUser(uid, email, role);
  if (!userResponse.success) {
    console.error("Failed to create user:", userResponse.error);
    throw new Error(userResponse.error?.message || "Failed to create user");
  }

  // Create role-specific profile via API
  if (role === "athlete") {
    const athleteResponse = await athletesApi.createAthlete(uid, {
      visibility: "public",
      email,
      displayName: "",
      school: "",
      photoURL: "",
      profileCompleted: false,
    });
    if (!athleteResponse.success) {
      console.error("Failed to create athlete profile:", athleteResponse.error);
    }
  }

  if (role === "brand") {
    const brandResponse = await brandsApi.createBrand(uid, {
      name: "",
      owners: [uid],
      email,
    });
    if (!brandResponse.success) {
      console.error("Failed to create brand profile:", brandResponse.error);
    }
  }

  if (role === "director") {
    const directorResponse = await directorsApi.createDirector(uid, {
      title: "NIL Director",
      email,
    });
    if (!directorResponse.success) {
      console.error("Failed to create director profile:", directorResponse.error);
    }
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();
  const lastUidRef = useRef<string | null>(null);
  // Ref to prevent race condition between activity interval and auth state changes
  const isSigningOutRef = useRef(false);

  // Update last activity timestamp
  const updateLastActivity = () => {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  };

  // Check if session has expired
  const isSessionExpired = () => {
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;

    const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
    return timeSinceLastActivity > SESSION_TIMEOUT_MS;
  };

  // Handle session timeout
  const handleSessionTimeout = async () => {
    // Prevent concurrent sign-out attempts
    if (isSigningOutRef.current) return;
    isSigningOutRef.current = true;

    try {
      console.log("Session expired due to inactivity. Logging out...");
      await fbSignOut(auth);
      qc.clear();
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    } finally {
      isSigningOutRef.current = false;
    }
  };

  // Track user activity
  useEffect(() => {
    if (!user) return;

    // Update activity timestamp on user actions
    const handleActivity = () => {
      updateLastActivity();
    };

    // Listen to user activity events
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Set initial activity timestamp
    updateLastActivity();

    // Check for session expiry every minute
    const checkInterval = setInterval(() => {
      // Skip check if already signing out to prevent race condition
      if (isSigningOutRef.current) return;
      if (isSessionExpired()) {
        handleSessionTimeout();
      }
    }, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(checkInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // qc is stable and doesn't need to be in dependencies

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      const nextUid = u?.uid ?? null;
      const uidChanged = nextUid !== lastUidRef.current;

      // Check session expiry when auth state changes
      // Skip if already signing out to prevent race condition
      if (u && !isSigningOutRef.current && isSessionExpired()) {
        isSigningOutRef.current = true;
        try {
          console.log("Session expired. Logging out...");
          await fbSignOut(auth);
          qc.clear();
          localStorage.removeItem(LAST_ACTIVITY_KEY);
          setUser(null);
          setLoading(false);
          return;
        } finally {
          isSigningOutRef.current = false;
        }
      }

      setUser(u);
      setLoading(false);

      if (uidChanged) {
        qc.clear();
        lastUidRef.current = nextUid;
      }

      // Update activity on successful auth
      if (u) {
        updateLastActivity();
      } else {
        // Clear activity timestamp on logout
        localStorage.removeItem(LAST_ACTIVITY_KEY);
      }
    });
    return () => unsub();
  }, [qc]);

  const value = useMemo(
    () => ({
      user,
      loading,
      async signIn(email: string, password: string) {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        // Set activity timestamp on successful login
        updateLastActivity();
        return credential.user;
      },
      async signUp(email: string, password: string, role: Role) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await provisionUserDocs(cred.user.uid, email, role);

        // Send verification email for athletes
        if (role === 'athlete') {
          await sendEmailVerification(cred.user);
        }
      },
      async signOut() {
        if (isSigningOutRef.current) return;
        isSigningOutRef.current = true;
        try {
          await fbSignOut(auth);
          qc.clear();
          localStorage.removeItem(LAST_ACTIVITY_KEY);
        } finally {
          isSigningOutRef.current = false;
        }
      },
    }),
    [user, loading, qc]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
