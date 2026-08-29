"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center text-white">

        {/* Welcome Heading */}
        <p className="text-sm tracking-[0.35em] font-semibold text-blue-100 mb-6">
          WELCOME TO VAI FINANCE
        </p>

        {/* Illustration */}
        <div className="relative w-full h-72 mb-8 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
          <Image
            src="/illustrations/onboarding1.png"
            alt="VAI Finance business intelligence illustration"
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">
          VAI Finance
        </h1>

        <p className="text-lg text-blue-50 mb-8">
          AI Powered Business Intelligence
        </p>

        {/* Continue */}
        <button
          onClick={() => router.push("/login")}
          className="w-full rounded-xl bg-white px-6 py-4 text-lg font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
        >
          Get Started
        </button>

      </div>
    </main>
  );
}