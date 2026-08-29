"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import Logo from "@/components/common/Logo";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser({
        email,
        password,
      });

      router.replace("/dashboard");
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] lg:grid-cols-2">

          {/* LEFT BRAND PANEL */}
          <section className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#2563eb] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg">
                <span className="text-lg font-black text-blue-700">
                  VAI
                </span>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  VAI Finance
                </h1>

                <p className="text-xs font-medium tracking-[0.2em] text-blue-200">
                  SMART FINANCE
                </p>
              </div>
            </div>

            {/* Main message */}
            <div className="relative z-10 max-w-md">
              <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100 backdrop-blur">
                AI-Powered Business Management
              </div>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                Manage your business
                <span className="block text-blue-300">
                  smarter.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-7 text-blue-100">
                Manage vendors, simplify procurement, track invoices,
                and make better business decisions from one intelligent
                platform.
              </p>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  Vendor Management
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  Procurement
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  Invoice Tracking
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="relative z-10 text-sm text-blue-200">
              Intelligent finance. Simplified operations.
            </p>
          </section>

          {/* RIGHT LOGIN PANEL */}
          <section className="flex min-h-[650px] items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">

              {/* Mobile logo */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600">
                  <span className="text-sm font-black text-white">
                    VAI
                  </span>
                </div>

                <div>
                  <h1 className="font-bold text-slate-900">
                    VAI Finance
                  </h1>

                  <p className="text-[10px] font-semibold tracking-[0.18em] text-blue-600">
                    SMART FINANCE
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-blue-600">
                  WELCOME BACK
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Access your vendors, procurement, invoices and
                  business insights.
                </p>
              </div>

              {/* Login form */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-slate-500"
                  >
                    Remember me
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  SECURE BUSINESS PLATFORM
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Bottom text */}
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  VAI Finance
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  AI-powered business intelligence for modern businesses.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}