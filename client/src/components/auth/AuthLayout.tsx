'use client';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/coolbackgrounds1.png')`,
      }}
    >
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
