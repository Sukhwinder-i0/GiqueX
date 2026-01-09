'use client';

import React from 'react';

type InputProps = {
  label?: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  min?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onKeyPress,
  placeholder,
  error,
  disabled,
  required,
  min,
  className = '',
}) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        className={`w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
