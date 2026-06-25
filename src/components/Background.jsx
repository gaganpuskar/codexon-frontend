import React from 'react';

export default function Background() {
  return (
    <>
      {/* 🔮 ANIMATED GRADIENT BLOBS LAYER */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* Blob 1 - Top Left Purple */}
        <span 
          className="absolute w-[420px] h-[420px] bg-[#7c5cff] opacity-45 dark:opacity-40 rounded-full blur-[90px] -top-20 -left-15 animate-pulse" 
          style={{ animationDuration: '14s' }} 
        />
        {/* Blob 2 - Bottom Right Cyan */}
        <span 
          className="absolute w-[360px] h-[360px] bg-[#22d3ee] opacity-45 dark:opacity-40 rounded-full blur-[90px] -bottom-25 -right-10 animate-pulse" 
          style={{ animationDuration: '16s', animationDelay: '2s' }} 
        />
        {/* Blob 3 - Middle Rose (The secret to your portfolio look!) */}
        <span 
          className="absolute w-[300px] h-[300px] bg-[#ff5c8a] opacity-35 dark:opacity-20 rounded-full blur-[90px] top-[40%] left-[55%] animate-pulse" 
          style={{ animationDuration: '18s', animationDelay: '4s' }} 
        />
      </div>

      {/* 🕸️ PORTFOLIO EXACT THIN GRID PATTERN MESH */}
      <div 
        className="fixed inset-0 -z-10 opacity-35 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
        }}
      />
    </>
  );
}