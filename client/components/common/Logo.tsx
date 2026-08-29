"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({
  size = 70,
  showText = true,
}: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-5"
    >
      {/* LOGO */}
      <div
        className="flex items-center justify-center"
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src="/images/vai-finance-logo.png"
          alt="VAI Finance Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* BRAND NAME */}
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white">
            VAI Finance
          </h1>

          <p className="mt-2 text-sm font-semibold tracking-[0.35em] text-blue-100">
            SMART FINANCE
          </p>
        </div>
      )}
    </motion.div>
  );
}