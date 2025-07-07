'use client';
import React from 'react';

interface Props {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const AuthInput = ({ type, value, onChange, placeholder }: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default AuthInput;
