'use client';

import React from 'react';

export default function BackgroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute w-[60vw] h-[60vw] -top-40 -left-20 bg-blue-900 opacity-30 blur-[100px] rounded-full z-0" />
      <div className="absolute w-[50vw] h-[50vw] top-1/2 left-[60%] -translate-y-1/2 bg-cyan-900 opacity-0 blur-[120px] rounded-full z-0" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
