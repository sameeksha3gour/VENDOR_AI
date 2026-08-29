"use client";

import { ArrowRight } from "lucide-react";

interface PrimaryButtonProps {//defines what information this component accepts
  title: string;
  loading?: boolean;
  onClick?: () => void;//this receive function when clicked
}

export default function PrimaryButton({
  title,
  loading = false,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button //this actually html button
      onClick={onClick}
      disabled={loading}
      className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl //large rounded corners
        bg-gradient-to-r //left to right
        from-blue-700
        to-sky-500
        py-4
        text-lg
        font-semibold
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-2xl
        disabled:cursor-not-allowed
        disabled:opacity-60 //when disabled button becomes faded
      "
    >
      {loading ? "Please wait..." : title}

      {!loading && ( //if not loading show arrow if not loading don't show arrow
        <ArrowRight
          size={20}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </button>
  );
}