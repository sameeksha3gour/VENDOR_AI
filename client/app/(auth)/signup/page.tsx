"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !fullName.trim() ||
      !businessName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Connect your signup API here later.
      // await registerUser({
      //   fullName,
      //   businessName,
      //   email,
      //   password,
      // });

      router.push("/login");
    } catch (err: any) {
      console.error("SIGNUP ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page signup-page">
      {/* Background */}
      <div className="background-glow background-glow-one" />
      <div className="background-glow background-glow-two" />
      <div className="background-glow background-glow-three" />

      <section className="login-shell">
        {/* LEFT BRAND PANEL */}
        <div className="brand-panel">
          <div className="brand-content">

            <div className="brand-header">
              <div className="brand-logo">
                <Image
                  src="/images/vai-finance-logo.png"
                  alt="VAI Finance Logo"
                  width={72}
                  height={72}
                  priority
                />
              </div>

              <div className="brand-name">
                <h1>VAI Finance</h1>
                <p>SMART FINANCE</p>
              </div>
            </div>

            <div className="marketing-content">
              <div className="brand-badge">
                <span />
                AI-Powered Business Management
              </div>

              <h2>
                Start your
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

        {/* RIGHT SIGNUP PANEL */}
        <div className="login-panel signup-panel">
          <div className="login-content signup-content">

            <div className="login-heading signup-heading">
              <span className="welcome-label">
                GET STARTED
              </span>

              <h2>Create your account</h2>

              <p>
                Set up your VAI Finance account and start managing
                your business smarter.
              </p>
            </div>

            <form
              onSubmit={handleSignup}
              className="login-form signup-form"
            >
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>

              {/* Business Name */}
              <div className="form-group">
                <label htmlFor="businessName">
                  Business name
                </label>

                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) =>
                    setBusinessName(e.target.value)
                  }
                  placeholder="Enter your business name"
                  autoComplete="organization"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="signupEmail">
                  Email address
                </label>

                <input
                  id="signupEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="signupPassword">
                  Password
                </label>

                <input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="signin-button"
              >
                {loading
                  ? "Creating account..."
                  : "Create Account"}
              </button>
            </form>

            {/* Login link */}
            <div className="signup-section">
              <div className="signup-divider">
                <span>ALREADY HAVE AN ACCOUNT?</span>
              </div>

              <Link
                href="/login"
                className="signup-link"
              >
                Sign in to your account
              </Link>
            </div>

            <div className="security-info">
              <span className="security-label">
                SECURE BUSINESS PLATFORM
              </span>

              <strong>VAI Finance</strong>

              <p>
                AI-powered business intelligence for modern
                businesses.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}