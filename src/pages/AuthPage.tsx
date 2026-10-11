import React, { useState } from 'react';

import { useApp } from '../context/AppContext';

import {
  Sparkles,
  Store,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const {
    login,
    register,
    loginAsDemo,
    setCurrentView,
  } = useApp();

  const [tab, setTab] = useState<'login' | 'signup' | 'forgot'>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('demo@pricepilot.ai');
  const [password, setPassword] = useState('pricepilot2026');
  const [storeName, setStoreName] = useState('Sharma Daily Mart & Cafe');

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (tab === 'forgot') {
      // Password-reset delivery is not implemented by the current Flask API.
      setForgotSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      if (tab === 'signup') {
        await register(name, storeName, email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
        message?: string;
      };

      setErrorMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Unable to continue. Check your details and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await loginAsDemo();
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
        message?: string;
      };

      setErrorMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Demo login failed. Check whether the demo account exists in MongoDB.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeTab = (nextTab: 'login' | 'signup' | 'forgot') => {
    setTab(nextTab);
    setErrorMessage('');
    setForgotSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#060a12] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-slate-800/80 bg-slate-900/80 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Left Side: Auth Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2.5 mb-8 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
              </div>

              <span className="font-extrabold text-base tracking-tight text-white">
                PricePilot <span className="text-brand-400">AI</span>
              </span>
            </div>

            {/* Tabs */}
            <div className="flex items-center p-1 bg-slate-950/70 border border-slate-800 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => changeTab('login')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === 'login'
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => changeTab('signup')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === 'signup'
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Demo Access */}
            {tab !== 'forgot' && (
              <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-brand-900/40 via-indigo-900/30 to-purple-900/40 border border-brand-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Judge / Evaluator Fast-Track
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Sign in to the configured demo merchant account
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={isSubmitting}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition-all shrink-0"
                  >
                    {isSubmitting ? 'Please wait…' : 'Demo Login'}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs"
              >
                {errorMessage}
              </div>
            )}

            {/* Forgot Password */}
            {tab === 'forgot' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">
                  Reset Password
                </h3>

                <p className="text-xs text-slate-400">
                  Enter your registered merchant email address.
                </p>

                {forgotSubmitted ? (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs font-medium space-y-2">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>Password reset is not connected yet.</span>
                    </div>

                    <p>
                      The current Flask backend does not have a password-reset
                      endpoint, so no email has been sent. You can return to
                      Sign In or implement this endpoint later.
                    </p>

                    <button
                      type="button"
                      onClick={() => changeTab('login')}
                      className="text-xs text-brand-400 font-bold underline block mt-2"
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                          placeholder="seller@mart.com"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white transition-colors"
                    >
                      Check Password Reset Availability
                    </button>

                    <button
                      type="button"
                      onClick={() => changeTab('login')}
                      className="w-full text-center text-xs text-slate-400 hover:text-white"
                    >
                      Cancel & Return
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Login / Signup Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'signup' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Merchant Name
                      </label>

                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />

                        <input
                          type="text"
                          required
                          minLength={2}
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Shop / Business Name
                      </label>

                      <div className="relative">
                        <Store className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />

                        <input
                          type="text"
                          required
                          minLength={2}
                          value={storeName}
                          onChange={(event) =>
                            setStoreName(event.target.value)
                          }
                          className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                          placeholder="e.g. Metro Supermarket & Snacks"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Merchant Email
                  </label>

                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />

                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      placeholder="seller@mart.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Password
                    </label>

                    {tab === 'login' && (
                      <button
                        type="button"
                        onClick={() => changeTab('forgot')}
                        className="text-[11px] text-brand-400 hover:text-brand-300 font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />

                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete={
                        tab === 'signup' ? 'new-password' : 'current-password'
                      }
                      minLength={tab === 'signup' ? 8 : undefined}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {tab === 'signup' && (
                    <p className="text-[10px] text-slate-500 mt-1.5">
                      Use at least 8 characters.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="rounded bg-slate-950 border-slate-800 text-brand-600 focus:ring-0"
                    />
                    <span>Remember me on this terminal</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-60 text-xs font-bold text-white shadow-lg shadow-brand-500/20 transition-all transform hover:-translate-y-0.5 mt-2"
                >
                  <span>
                    {isSubmitting
                      ? 'Please wait…'
                      : tab === 'login'
                        ? 'Enter Merchant Dashboard'
                        : 'Create Free Merchant Account'}
                  </span>

                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Protected merchant access
            </span>

            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              className="text-slate-400 hover:text-slate-200"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Right Side: Visual Showcase Banner */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-tr from-brand-950 via-slate-900 to-indigo-950 border-l border-slate-800/80 relative">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3 h-3 text-brand-400" />
              <span>Smart Retail AI Engine</span>
            </div>

            <h3 className="text-2xl font-black text-white leading-snug">
              Stop Guessing Prices.
              <br />
              Start Capturing Margins.
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              PricePilot AI combines local weather forecasts, festive rushes,
              shelf inventory velocity, and competitor price ranges to
              recommend the sweet spot for your goods.
            </p>

            {/* Demo testimonial */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-300">
                  RS
                </div>

                <div>
                  <span className="text-xs font-bold text-white block">
                    Ramesh Sharma
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Demo merchant profile
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic">
                “On hot festival weekends, PricePilot helps us evaluate
                demand, compare prices, and make informed pricing decisions.”
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-6">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Zero automatic pricing — full human seller approval</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Instant demand forecasts with confidence ratings</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Merchant products stored in MongoDB Atlas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};