'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

function AnimatedStat({ value, suffix, label, icon }: StatItem) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate counter
          let currentValue = 0;
          const duration = 4000; // 2 seconds
          const increment = value / (duration / 16); // 60fps
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            currentValue = Math.floor(value * progress);
            setDisplayValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          animate();
        }
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="relative group -mt-4">
      {/* Blurred rounded card background */}
      <div className="absolute inset-0 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/60" />
      
      {/* 3D Icon Background */}
      <div className="absolute inset-0 flex items-center justify-center perspective overflow-hidden rounded-2xl">
        <div
          className="text-6xl sm:text-8xl font-bold text-brand/10 transform transition-transform duration-300 group-hover:scale-125 blur-[1px]"
          style={{
            textShadow: `
              3px 3px 0px rgba(168, 85, 247, 0.1),
              6px 6px 0px rgba(168, 85, 247, 0.08),
              9px 9px 0px rgba(168, 85, 247, 0.06)
            `,
            transform: 'perspective(1000px) rotateX(10deg) rotateY(-10deg) translateZ(50px)',
          }}
        >
          {icon}
        </div>
      </div>

      {/* Stats Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="text-2xl sm:text-4xl font-bold text-accent">
          {displayValue}
          <span className='text-accent/60'>
          {suffix}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-accent/80 mt-2">{label}</div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const pointerActiveRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, 600);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pointer tracking
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only activate if pointer is within canvas bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointerRef.current = { x, y };
        pointerActiveRef.current = true;
      } else {
        pointerActiveRef.current = false;
      }
    };

    const handlePointerLeave = () => {
      pointerActiveRef.current = false;
      pointerRef.current = { x: -1000, y: -1000 };
    };

    // Use document listener to track globally
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseVx: number;
      baseVy: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < particleCount; i++) {
      const baseVx = (Math.random() - 0.5) * 0.3;
      const baseVy = (Math.random() - 0.5) * 0.3;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: baseVx,
        vy: baseVy,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        baseVx: baseVx,
        baseVy: baseVy,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg');
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p, i) => {
        // Apply pointer repulsion if active
        if (pointerActiveRef.current) {
          const dx = p.x - pointerRef.current.x;
          const dy = p.y - pointerRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 150;

          if (distance < repulsionRadius) {
            const force = (1 - distance / repulsionRadius) * 3; // repulsion strength
            const angle = Math.atan2(dy, dx);
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
          } else {
            // Gradually return to base velocity
            p.vx += (p.baseVx - p.vx) * 0.05;
            p.vy += (p.baseVy - p.vy) * 0.05;
          }
        } else {
          // Return to base velocity when pointer is inactive
          p.vx += (p.baseVx - p.vx) * 0.05;
          p.vy += (p.baseVy - p.vy) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle
        const brandColor = getComputedStyle(document.documentElement).getPropertyValue('--brand');
        ctx.fillStyle = `hsla(301, 100%, 50%, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p2.x - p.x;
            const dy = p2.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.strokeStyle = `hsla(301, 100%, 50%, ${0.1 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const highlights =[{name:'Patient Referral',color:'purple-500'}, 
    {name:'Insurance Verification',color:'green-500'},
    {name:'Prior Authorization',color:'orange-500'},
    {name:'Automated Scheduling',color:'yellow-800'}, 
    {name:'Agentic Follow-Up',color:'accent'},
    {name:'Seamless Infusion',color:'blue-500'}]

  const[highlight,setHighlight]=useState('');
  const[color,setColor]=useState('')

  useEffect(()=>{
    let count = 1;
    let interval;
    setHighlight(highlights[0].name);
    setColor(highlights[0].color);
    const cycleHighlights =()=>{
      interval = setInterval(()=>{
        setHighlight(highlights[count].name);
        setColor(highlights[count].color)
        count = (count +1) %highlights.length;
        

      },5000)

    }
   cycleHighlights();
    //return ()=>clearInterval(interval)
  },[])

  return (
    <section className="relative w-full pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden ">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-background/30 to-primary/15  dark:bg-gray-800 moveBg" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="text-center">
        <div className="mb-6 sm:mb-8 h-[100px] md:-mt-10 items-center justify-center relative flex overflow-hidden">
          
          
          {highlight&&<div className='flex items-center h-[40px] moveHighlight -top-[100px] rounded-full px-[2px] relative overflow-hidden justify-center' style={{ clipPath: 'inset(0)' }}>
            <div className='h-[500%] absolute rotateInner w-[200%] bg-gradient-to-tr  from-transparent via-transparent to-primary'/>
            <div className={`text-center items-center justify-center flex h-[38px] bg-accent/20 text-accent z-[400] rounded-full  self-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand/10 text-brand text-xs sm:text-sm font-semibold`}>
              {highlight}
            </div>

            </div>}


          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 sm:mb-6 text-balance leading-tight">
            Infusion Operations,{' '}
            <span className="bg-gradient-to-r from-brand via-accent to-brand bg-clip-text enlargeBgText text-transparent">
              Simplified
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-foreground/70 mb-8 sm:mb-12 text-balance leading-relaxed">
            Scriptish automates insurance verification, prior authorizations, and patient intake for IV therapy, ketamine, NAD+, and infusion clinics.
          </p>

         

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 pt-12 sm:pt-20 border-t border-border/20">
            <AnimatedStat value={500} suffix="+" label="Clinics Automated" icon="🏥" />
            <AnimatedStat value={50} suffix="M+" label="Claims Processed" icon="💰" />
            <AnimatedStat value={99.9} suffix="%" label="Uptime" icon="⚡" />
          </div>
        </div>
      </div>
    </section>
  );
}
