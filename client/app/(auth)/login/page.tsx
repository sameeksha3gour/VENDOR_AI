"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginUser } from "@/services/authService";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
    <main className="login-page">
      {/* Background */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Main Card */}
      <section className="login-shell">

        {/* ================= LEFT BRAND PANEL ================= */}
        <div className="brand-panel">
          <div className="brand-content">

            {/* Logo */}
            <div className="brand-header">
              <div className="brand-logo">
                <Image
                  src="/images/vai-finance-logo.png"
                  alt="VAI Finance Logo"
                  width={68}
                  height={68}
                  priority
                />
              </div>

              <div className="brand-name">
                <h1>VAI Finance</h1>
                <p>SMART FINANCE</p>
              </div>
            </div>

            {/* Marketing */}
            <div className="marketing-content">

              <div className="brand-badge">
                <span className="badge-dot" />
                AI-Powered Business Management
              </div>

              <h2>
                Build your
                <br />
                business
                <br />
                <span>smarter.</span>
              </h2>

              <p className="marketing-description">
                Bring vendors, procurement, invoices and business
                intelligence together in one intelligent platform.
              </p>

              <div className="feature-list">
                <span>Vendor Management</span>
                <span>Procurement</span>
                <span>Invoice Tracking</span>
              </div>
            </div>

            <div className="brand-footer">
              Intelligent finance. Simplified operations.
            </div>
          </div>
        </div>

        {/* ================= RIGHT LOGIN PANEL ================= */}
        <div className="login-panel">
          <div className="login-content">

            {/* Heading */}
            <div className="login-heading">
              <span className="welcome-label">
                WELCOME BACK
              </span>

              <h2>
                Sign in to your
                <br />
                account
              </h2>

              <p>
                Access your vendors, procurement, invoices and
                business insights.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="login-form"
            >

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              {/* Remember */}
              <div className="remember-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="signin-button"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Signup */}
            <div className="signup-section">
              <div className="signup-divider">
                <span>NEW TO VAI FINANCE?</span>
              </div>

              <Link
                href="/signup"
                className="signup-link"
              >
                Create an account
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}