"use client";

import { useRouter } from "next/navigation";

export default function LanguagePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[380px]">

        <h1 className="text-3xl font-bold text-center">
          Choose Language
        </h1>

        <button
          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl"
          onClick={() => router.push("/login")}
        >
          🇬🇧 English
        </button>

        <button
          className="mt-4 w-full border border-blue-600 text-blue-600 py-4 rounded-xl"
          onClick={() => router.push("/login")}
        >
          🇮🇳 हिन्दी
        </button>

      </div>

    </main>
  );
}