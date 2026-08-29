"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface OnboardingCardProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function OnboardingCard({
  title,
  subtitle,
  image,
}: OnboardingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex w-full flex-col items-center text-center"
    >
      {/* Illustration */}
      <div className="relative mb-8 flex h-[280px] w-full items-center justify-center sm:h-[320px]">
        <Image
          src={image}
          alt={title}
          width={320}
          height={320}
          priority
          className="h-auto max-h-[300px] w-auto max-w-[90%] object-contain drop-shadow-xl"
        />
      </div>

      {/* Text */}
      <div className="max-w-md px-4">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 text-sm leading-6 text-blue-100 sm:text-base">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}