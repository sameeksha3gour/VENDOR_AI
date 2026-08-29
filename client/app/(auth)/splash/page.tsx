"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/common/Logo";

const loadingTexts = [
  "Initializing AI...",
  "Loading Financial Intelligence...",
  "Preparing Secure Workspace...",
  "Welcome to VAI Finance",
];

export default function SplashPage() {
  const router = useRouter();

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const pageTimer = setTimeout(() => {
      router.push("/welcome");
    }, 2600);

    return () => {
      clearInterval(textTimer);
      clearTimeout(pageTimer);
    };
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#4facfe,#1976D2,#0D47A1)]">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <Logo size={120} />

        <motion.p
          key={loadingTexts[textIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-blue-100"
        >
          {loadingTexts[textIndex]}
        </motion.p>

        <div className="mt-8 h-2 w-72 rounded-full bg-white/20">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
            className="h-full rounded-full bg-white"
          />

        </div>
      </motion.div>

    </main>
  );
}