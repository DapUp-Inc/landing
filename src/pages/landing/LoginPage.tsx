import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, AlertCircle, Mail, X, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/common/Logo';
import { homeForRole, isAllowedPathForRole } from '../../router/RoleNav';
import { usersApi } from '../../api/endpoints/Users';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/Firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [search] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Forgot password modal state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSending, setResetSending] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const next = useMemo(() => search.get('next') || '', [search]);

  // Auto-redirect if already logged in
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (user) {
        try {
          // Get user role
          const userResponse = await usersApi.getCurrentUser();
          const roleNow = userResponse.success ? userResponse.data?.role ?? null : null;

          if (roleNow) {
            // Check email verification for athletes
            if (roleNow === 'athlete' && !user.emailVerified) {
              console.log('Athlete email not verified. Redirecting to verification page...');
              navigate('/athlete/verify-email', { replace: true });
              return;
            }

            // User is logged in - redirect to their dashboard
            const destination = next && isAllowedPathForRole(roleNow, next)
              ? next
              : homeForRole(roleNow);

            console.log('User already logged in. Redirecting to dashboard...');
            navigate(destination, { replace: true });
            return;
          }
        } catch (err) {
          console.error('Error checking user role:', err);
        }
      }
      setCheckingAuth(false);
    };

    checkAuthAndRedirect();
  }, [user, navigate, next]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'The email or password you entered is incorrect. Please double-check and try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support for assistance.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please wait a few minutes before trying again, or reset your password.';
      case 'auth/network-request-failed':
        return 'Unable to connect to the server. Please check your internet connection and try again.';
      case 'auth/operation-not-allowed':
        return 'Login is currently unavailable. Please try again later or contact support.';
      default:
        return 'We couldn\'t log you in at this time. Please try again or contact support if the problem persists.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length === 0) {
      setError('Please enter your password.');
      return;
    }

    try {
      setSubmitting(true);
      const firebaseUser = await signIn(email, password);

      // Ensure we have a valid token before calling API
      await firebaseUser.getIdToken();

      // Get user role after successful login
      const userResponse = await usersApi.getCurrentUser();
      const roleNow = userResponse.success ? userResponse.data?.role ?? null : null;

      // Check email verification for athletes
      if (roleNow === 'athlete' && !firebaseUser.emailVerified) {
        navigate('/athlete/verify-email', { replace: true });
        return;
      }

      // Only use next if it matches the user's role
      const dest =
        next && isAllowedPathForRole(roleNow, next) ? next : homeForRole(roleNow);

      navigate(dest, { replace: true });
    } catch (err: unknown) {
      // Extract Firebase error code
      const errorData = err as { code?: string };
      const errorCode = errorData?.code || '';
      const errorMessage = getFirebaseErrorMessage(errorCode);
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);

    // Validation
    if (!validateEmail(resetEmail)) {
      setResetError('Please enter a valid email address.');
      return;
    }

    try {
      setResetSending(true);
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess(true);
    } catch (error: unknown) {
      console.error('Password reset error:', error);

      const errorData = error as { code?: string };
      const errorCode = errorData?.code || '';
      switch (errorCode) {
        case 'auth/user-not-found':
          setResetError('No account found with this email address.');
          break;
        case 'auth/invalid-email':
          setResetError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setResetError('Too many requests. Please wait a few minutes before trying again.');
          break;
        default:
          setResetError('Failed to send reset email. Please try again.');
      }
    } finally {
      setResetSending(false);
    }
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetSuccess(false);
    setResetError(null);
  };

  const handleOpenForgotPassword = () => {
    setResetEmail(email); // Pre-fill with login email if provided
    setShowForgotPassword(true);
  };

  // Show loading while checking auth status
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p className="text-white/60">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 opacity-50" />

        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Welcome Back</h1>
            <p className="text-gray-400 text-lg">Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-white placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 bg-dark-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={handleOpenForgotPassword}
                  className="text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-primary-500 text-dark-900 font-semibold rounded-lg hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Log In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-400 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseForgotPassword}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleCloseForgotPassword}
            >
              <div
                className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseForgotPassword}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {!resetSuccess ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-primary-500/10 rounded-lg">
                        <Mail className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                        <p className="text-sm text-gray-400">We'll send you a reset link</p>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          id="reset-email"
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          autoFocus
                          className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-white placeholder-gray-500"
                        />
                      </div>

                      {/* Error Message */}
                      {resetError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>{resetError}</span>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={resetSending}
                        className="w-full py-3 bg-primary-500 text-dark-900 font-semibold rounded-lg hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {resetSending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Reset Link
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    {/* Success State */}
                    <div className="text-center py-4">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-green-500/10 rounded-full">
                          <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
                      <p className="text-gray-400 mb-6">
                        We sent a password reset link to{' '}
                        <span className="text-white font-semibold">{resetEmail}</span>
                      </p>
                      <div className="bg-dark-900/50 border border-white/5 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-300 mb-2">Next steps:</p>
                        <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                          <li>Check your inbox for the reset email</li>
                          <li>Click the link in the email</li>
                          <li>Create a new password</li>
                          <li>Log in with your new password</li>
                        </ol>
                      </div>
                      <button
                        onClick={handleCloseForgotPassword}
                        className="w-full py-3 bg-dark-700 text-white font-medium rounded-lg hover:bg-dark-600 transition-colors"
                      >
                        Got it
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginPage;
