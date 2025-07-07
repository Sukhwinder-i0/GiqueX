import React from 'react';

interface TextInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
