"use client";

import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>

      {/* Input Field */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-2xl
          border
          border-white/20
          bg-white/10
          px-4
          py-3
          text-white
          placeholder:text-blue-100
          outline-none
          transition-all
          duration-300
          focus:border-white
          focus:ring-2
          focus:ring-blue-300
        "
      />
    </div>
  );
}