"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const partners = [
  { name: "University of Technology", initials: "UT" },
  { name: "Global Learning Institute", initials: "GLI" },
  { name: "EduTech Corp", initials: "ETC" },
  { name: "Innovation Academy", initials: "IA" },
  { name: "Digital Skills Hub", initials: "DSH" },
  { name: "Future Learn Pro", initials: "FLP" },
  { name: "Knowledge Bridge", initials: "KB" },
  { name: "Smart Education", initials: "SE" },
];

// Ultra-smooth easing
const smoothEase = [0.22, 1, 0.36, 1];

export default function Partners() {
  // Memoize partner arrays to prevent re-renders
  const row1Partners = useMemo(() => [...partners, ...partners, ...partners], []);
  const row2Partners = useMemo(() => [...[...partners].reverse(), ...partners, ...partners], []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Trusted By Leading Organizations
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Our Partners & Clients
          </h2>
        </motion.div>

        {/* Partner logos - CSS-based infinite scroll */}
        <div className="relative partner-scroll-container">
          {/* First row - moving left */}
          <div className="partner-scroll-left flex gap-8 mb-8">
            {row1Partners.map((partner, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 ease-out">
                  <span className="text-lg font-bold text-primary">{partner.initials}</span>
                </div>
                <span className="font-medium text-sm whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </div>

          {/* Second row - moving right */}
          <div className="partner-scroll-right flex gap-8">
            {row2Partners.map((partner, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 ease-out">
                  <span className="text-lg font-bold text-primary">{partner.initials}</span>
                </div>
                <span className="font-medium text-sm whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats below partners */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEase, delay: 0.1 }}
        >
          {[
            { label: "Enterprise Clients", value: "500+" },
            { label: "Universities", value: "120+" },
            { label: "Course Creators", value: "10,000+" },
            { label: "Countries", value: "50+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.15 + index * 0.06 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .partner-scroll-container {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
        .partner-scroll-left {
          animation: scroll-left 40s linear infinite;
          width: max-content;
        }
        .partner-scroll-left:hover {
          animation-play-state: paused;
        }
        .partner-scroll-right {
          animation: scroll-right 40s linear infinite;
          width: max-content;
        }
        .partner-scroll-right:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * 8)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-280px * 8)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
