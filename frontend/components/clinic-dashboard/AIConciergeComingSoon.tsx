'use client';

import { useState, useEffect, useRef } from 'react';
import { Zap, ArrowLeft } from 'lucide-react';

interface AIConciergeComingSoonProps {
  featureName: string;
  onBack: () => void;
}

export default function AIConciergeComingSoon({ featureName, onBack }: AIConciergeComingSoonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(80deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Glowing orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, var(--primary-rgba) 0%, transparent 70%)',
          top: mousePos.y,
          left: mousePos.x,
          transform: 'translate(-50%, -50%)',
          transition: 'top 0.1s ease-out, left 0.1s ease-out',
          '--primary-rgba': 'rgba(102, 136, 255, 0.25)',
        } as React.CSSProperties}
      />

      {/* Back Button - Top Left */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="relative text-center max-w-[480px] px-6">
        {/* Animated icon */}
        <div className="w-[72px] h-[72px] mx-auto mb-8 border border-primary/50 rounded-2xl flex items-center justify-center bg-primary/10 animate-pulse">
          <Zap size={32} className="text-primary" />
        </div>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-7">
          <span
            className="w-[7px] h-[7px] rounded-full bg-primary animate-pulse"
          />
          <span className="text-xs tracking-widest uppercase text-primary font-medium">
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-medium text-foreground mb-4 leading-tight">
          {featureName}
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Features
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-foreground/70 text-base leading-relaxed mb-10">
          Advanced AI-powered features are coming soon. We're building powerful tools to help you deliver better patient care.
        </p>

        {/* Divider */}
        <div className="h-px w-10 bg-primary/40 mx-auto" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
