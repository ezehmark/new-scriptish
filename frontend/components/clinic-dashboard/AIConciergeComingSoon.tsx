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
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(80deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Glowing orb */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)',
          top: mousePos.y,
          left: mousePos.x,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'top 0.1s ease-out, left 0.1s ease-out',
        }}
      />

      {/* Back Button - Top Left */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '8px',
          color: '#c084fc',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168, 85, 247, 0.2)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168, 85, 247, 0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168, 85, 247, 0.1)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168, 85, 247, 0.2)';
        }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          maxWidth: '480px',
          padding: '0 24px',
        }}
      >
        {/* Animated icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 32px',
            border: '1.5px solid rgba(168, 85, 247, 0.5)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(168, 85, 247, 0.08)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        >
          <Zap size={32} style={{ color: 'rgba(192, 132, 252, 0.9)' }} />
        </div>

        {/* Status pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#a855f7',
              display: 'inline-block',
              animation: 'blink 1.4s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c084fc',
              fontFamily: "'Courier New', monospace",
            }}
          >
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: '400',
            color: '#f8fafc',
            lineHeight: '1.2',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          {featureName}
          <br />
          <span
            style={{
              color: 'transparent',
              backgroundImage:
                'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            AI Features
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(148,163,184,0.75)',
            fontSize: '15px',
            lineHeight: '1.7',
            marginBottom: '40px',
            fontFamily: "'Georgia', serif",
          }}
        >
          Advanced AI-powered features are coming soon. We're building powerful tools to help you deliver better patient care.
        </p>

        {/* Divider */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(168, 85, 247, 0.4)',
            margin: '0 auto',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.0); }
          50% { box-shadow: 0 0 24px 4px rgba(168, 85, 247, 0.18); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
