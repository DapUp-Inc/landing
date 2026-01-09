import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, User, Building2, Shield, Check, X } from 'lucide-react';
import { useAuth, type Role } from '../../context/AuthContext';
import Logo from '../../components/common/Logo';
import { homeForRole } from '../../router/RoleNav';
import { usersApi } from '../../api/endpoints/Users';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Step 1: Role selection, Step 2: Email/Password form
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Auto-redirect if already logged in
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (user) {
        try {
          // Get user role
          const userResponse = await usersApi.getCurrentUser();
          const roleNow = userResponse.success ? userResponse.data?.role ?? null : null;

          if (roleNow) {
            // User is logged in - redirect to their dashboard
            console.log('User already logged in. Redirecting to dashboard...');
            navigate(homeForRole(roleNow), { replace: true });
            return;
          }
        } catch (err) {
          console.error('Error checking user role:', err);
        }
      }
      setCheckingAuth(false);
    };

    checkAuthAndRedirect();
  }, [user, navigate]);

  const roleOptions = [
    {
      value: 'athlete' as Role,
      label: 'Athlete',
      description: 'Get discovered by brands and monetize your NIL',
      icon: User,
    },
    {
      value: 'brand' as Role,
      label: 'Brand',
      description: 'Connect with athletes for marketing campaigns',
      icon: Building2,
    },
    {
      value: 'director' as Role,
      label: 'NIL Director',
      description: 'Manage and oversee NIL compliance',
      icon: Shield,
    },
  ];

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
    setError(null);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEduEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('.edu');
  };

  // Password requirements checker
  const getPasswordRequirements = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(password),
    };
  };

  // Validate password strength
  const validatePasswordStrength = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number.' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one special character (!@#$%^&* etc.).' };
    }
    return { valid: true, message: '' };
  };

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please log in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Your password doesn\'t meet the security requirements. Please ensure it has at least 8 characters, includes uppercase and lowercase letters, numbers, and special characters.';
      case 'auth/operation-not-allowed':
        return 'Account creation is currently unavailable. Please try again later.';
      case 'auth/network-request-failed':
        return 'Unable to connect to the server. Please check your internet connection and try again.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Please wait a few minutes before trying again.';
      case 'auth/invalid-credential':
        return 'The provided credentials are invalid. Please check your information and try again.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support for assistance.';
      default:
        return 'We couldn\'t create your account at this time. Please try again or contact support if the problem persists.';
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

    // Athletes must use .edu email
    if (role === 'athlete' && !validateEduEmail(email)) {
      setError('You must be a student to create an athlete account. Please use your student email (.edu).');
      return;
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!role) {
      setError('Please select an account type.');
      return;
    }

    try {
      setSubmitting(true);
      await signUp(email, password, role);

      // Redirect based on role
      if (role === 'athlete') {
        // Redirect to email verification page first
        navigate('/athlete/verify-email', { replace: true });
      } else {
        navigate(homeForRole(role), { replace: true });
      }
    } catch (err: unknown) {
      // Extract Firebase error code and provide user-friendly message
      const errorData = err as { code?: string };
      const errorCode = errorData?.code || '';
      const errorMessage = getFirebaseErrorMessage(errorCode);
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
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
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Create Account</h1>
                <p className="text-gray-400 text-lg">I'm signing up as a...</p>
              </div>

              <div className="space-y-4">
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleRoleSelect(option.value)}
                      className="w-full p-6 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl hover:border-primary-500/50 hover:bg-dark-800/80 transition-all duration-300 text-left group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-400 transition-colors">
                            {option.label}
                          </h3>
                          <p className="text-gray-400 text-sm">{option.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary-500 transition-colors mt-1" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account? Login is temporarily unavailable.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Email/Password Form */}
          {step === 2 && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError(null);
                }}
                className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Create Account</h1>
                <p className="text-gray-400 text-lg">
                  Signing up as{' '}
                  <span className="text-primary-500 font-semibold">
                    {roleOptions.find((r) => r.value === role)?.label}
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address {role === 'athlete' && <span className="text-primary-500">(.edu required)</span>}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'athlete' ? 'you@university.edu' : 'you@example.com'}
                    required
                    className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-white placeholder-gray-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-white placeholder-gray-500"
                  />

                  {/* Password Requirements */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 p-3 bg-dark-800/30 border border-white/5 rounded-lg"
                    >
                      <p className="text-xs font-medium text-gray-400 mb-2">Password must contain:</p>
                      <div className="space-y-1.5">
                        {(() => {
                          const requirements = getPasswordRequirements(password);
                          return (
                            <>
                              <div className="flex items-center gap-2 text-xs">
                                {requirements.minLength ? (
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                )}
                                <span className={requirements.minLength ? 'text-green-500' : 'text-gray-400'}>
                                  At least 8 characters
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                {requirements.hasUpperCase ? (
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                )}
                                <span className={requirements.hasUpperCase ? 'text-green-500' : 'text-gray-400'}>
                                  One uppercase letter (A-Z)
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                {requirements.hasLowerCase ? (
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                )}
                                <span className={requirements.hasLowerCase ? 'text-green-500' : 'text-gray-400'}>
                                  One lowercase letter (a-z)
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                {requirements.hasNumber ? (
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                )}
                                <span className={requirements.hasNumber ? 'text-green-500' : 'text-gray-400'}>
                                  One number (0-9)
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                {requirements.hasSpecialChar ? (
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                )}
                                <span className={requirements.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}>
                                  One special character (!@#$%^&* etc.)
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-white placeholder-gray-500"
                  />
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account? Login is temporarily unavailable.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
