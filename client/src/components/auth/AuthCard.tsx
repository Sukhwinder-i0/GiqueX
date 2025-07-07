import React from 'react';

const AuthCard = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white shadow-2xl">
    {children}
  </div>
);

export default AuthCard;
