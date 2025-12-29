"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { HiOutlineLightBulb, HiOutlineCog, HiOutlinePlay, HiOutlineShare, HiOutlineSparkles } from "react-icons/hi";

const steps = [
  {
    icon: HiOutlineLightBulb,
    title: "Choose Your Topic",
    description: "Enter any topic you want to teach. From programming to cooking, any subject works!",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: HiOutlineSparkles,
    title: "AI Generates Content",
    description: "Our AI analyzes your topic and creates a comprehensive course outline with chapters and lessons.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: HiOutlineCog,
    title: "Customize & Edit",
    description: "Review and customize the generated content. Add your personal touch and expertise.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: HiOutlinePlay,
    title: "Add Media",
    description: "Enhance your course with auto-suggested videos, images, and interactive elements.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: HiOutlineShare,
    title: "Publish & Share",
    description: "Publish your course and share it with the world. Start making an impact!",
    color: "from-primary to-primary/60",
  },
];

// Ultra-smooth easing
const smoothEase = [0.22, 1, 0.36, 1];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Memoize background - use CSS animations instead of JS
  const background = useMemo(() => (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      {/* Static particles with CSS animation */}
      <div className="particles-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  ), []);

  return (
    <section id="how-it-works" className="relative py-20 md:py-32 overflow-hidden">
      {background}

      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8" ref={containerRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
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
            Simple Process
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional courses in minutes with our streamlined 5-step process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line - centered */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-primary/50"
              style={{ height: lineHeight, willChange: "height" }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-12 md:mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: smoothEase, delay: index * 0.08 }}
            >
              {/* Content Card + Circle Container */}
              <div className={`pl-24 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <div className={`relative flex items-center gap-4 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Card */}
                  <motion.div
                    className={`relative flex-1 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 group ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 ease-out`} />
                    
                    <div className="relative">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                        Step {index + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>

                  {/* Circle Icon - positioned next to card */}
                  <motion.div
                    className="hidden md:flex flex-shrink-0 w-16 h-16 z-10 items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.1 }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Mobile circle - stays on timeline */}
              <motion.div
                className="absolute left-8 md:hidden w-16 h-16 -translate-x-1/2 z-10 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              {/* Empty space for the other side */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to create your first course?
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            Start Creating Now
            <span className="animate-bounce-x">→</span>
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: hsl(var(--primary) / 0.3);
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s ease-in-out infinite;
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </section>
  );
}
