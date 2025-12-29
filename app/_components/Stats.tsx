"use client";

import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import { HiOutlineUsers, HiOutlineBookOpen, HiOutlineStar, HiOutlineGlobe } from "react-icons/hi";

const stats = [
  {
    icon: HiOutlineUsers,
    value: 10000,
    suffix: "+",
    label: "Active Users",
    description: "Educators worldwide",
  },
  {
    icon: HiOutlineBookOpen,
    value: 50000,
    suffix: "+",
    label: "Courses Created",
    description: "And counting",
  },
  {
    icon: HiOutlineStar,
    value: 4.9,
    suffix: "",
    label: "User Rating",
    description: "Average satisfaction",
    decimals: 1,
  },
  {
    icon: HiOutlineGlobe,
    value: 120,
    suffix: "+",
    label: "Countries",
    description: "Global presence",
  },
];

// Ultra-smooth easing
const smoothEase = [0.22, 1, 0.36, 1];

function AnimatedCounter({ 
  value, 
  suffix, 
  decimals = 0 
}: { 
  value: number; 
  suffix: string; 
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 80,
    mass: 1,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = decimals > 0 
          ? latest.toFixed(decimals) + suffix
          : Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Memoize background to prevent re-renders
  const background = useMemo(() => (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse-slow"
        style={{ animationDuration: '8s' }}
      />
    </div>
  ), []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {background}

      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.1 }}
          >
            Trusted Platform
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Numbers That Speak
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of educators who are transforming online learning
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.08 }}
            >
              <div className="relative overflow-hidden rounded-2xl border bg-background/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
                {/* Simple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
                    <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                </div>

                {/* Value */}
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                    {isInView && (
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    )}
                  </h3>
                  <p className="mt-2 text-base md:text-lg font-medium text-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
