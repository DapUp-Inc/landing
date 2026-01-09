import {
  FaUser, FaBuilding, FaComments, FaShieldAlt, // director
  FaTags, FaWallet, FaUserCircle,               // athlete
  FaRocket, FaFolderOpen                        // brand
} from "react-icons/fa";

/**
 * @typedef {"director" | "athlete" | "brand"} Role
 */

/**
 * @typedef {Object} NavItem
 * @property {string} label - The display label for the navigation item
 * @property {string} to - The route path
 * @property {React.ComponentType<{className?: string}>} icon - The icon component
 */

/** @type {Record<Role, NavItem[]>} */
export const navByRole = {
  director: [
    // Home removed; first item is Athletes
    { label: "Athletes",   to: "/director/athletes",   icon: FaUser },
    { label: "Businesses", to: "/director/brands",     icon: FaBuilding },
    { label: "Messages",   to: "/director/messages",   icon: FaComments },
    { label: "Compliance", to: "/director/compliance", icon: FaShieldAlt },
  ],
  athlete: [
    { label: "Home",     to: "/athlete/home",     icon: FaUser },
    { label: "Deals",    to: "/athlete/deals",    icon: FaTags },
    { label: "Earnings", to: "/athlete/earnings", icon: FaWallet },
    { label: "Messages", to: "/athlete/messages", icon: FaComments },
    { label: "Profile",  to: "/athlete/profile",  icon: FaUserCircle },
  ],
  brand: [
    { label: "Home",        to: "/brand/home",      icon: FaUser },
    { label: "Launch",      to: "/brand/launch",    icon: FaRocket },
    { label: "My Campaign", to: "/brand/campaigns", icon: FaFolderOpen },
    { label: "Wallet",      to: "/brand/wallet",    icon: FaWallet },
    { label: "Messages",    to: "/brand/messages",  icon: FaComments },
  ],
};

/**
 * Get the home route for a specific role
 * @param {Role | null} role - The user role
 * @returns {string} The home route path
 */
export function homeForRole(role: "director" | "athlete" | "brand" | null): string {
  if (role === "director") return "/director/athletes"; // changed from home
  if (role === "athlete")  return "/athlete/home";
  if (role === "brand")    return "/brand/home";
  return "/";
}

/**
 * Check if a path is allowed for a specific role
 * @param {Role | null} role - The user role
 * @param {string} path - The path to check
 * @returns {boolean} Whether the path is allowed for the role
 */
export function isAllowedPathForRole(role: "director" | "athlete" | "brand" | null, path: string): boolean {
  if (!role || !path) return false;
  if (role === "athlete")  return path.startsWith("/athlete");
  if (role === "brand")    return path.startsWith("/brand");
  if (role === "director") return path.startsWith("/director");
  return false;
}
