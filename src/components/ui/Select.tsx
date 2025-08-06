"use client";

import React from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}

export default function Select({
  label,
  options,
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
  placeholder,
}: SelectProps) {
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

      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        className={classes}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {success && <p className="mt-1 text-sm text-green-600">{success}</p>}
    </div>
  );
}
