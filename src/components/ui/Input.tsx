"use client";

import React from "react";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
  className?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  success,
  className = "",
  name,
  id,
  autoComplete,
}: InputProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const stateClasses = error
    ? "border-red-500 focus:ring-red-500 bg-red-50"
    : success
      ? "border-green-500 focus:ring-green-500 bg-green-50"
      : "border-gray-300 focus:ring-red-500 bg-white hover:border-gray-400";

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-100"
    : "";

  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        autoComplete={autoComplete}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {success && <p className="mt-1 text-sm text-green-600">{success}</p>}
    </div>
  );
}
