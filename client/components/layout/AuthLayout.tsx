"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {// whatever inside in these brackets is considered as children
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#4facfe,#1976D2,#0D47A1)]">

      {/* Background Glow */}

      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

      {/* Content */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        {children}
      </div>

    </main>
  );
}