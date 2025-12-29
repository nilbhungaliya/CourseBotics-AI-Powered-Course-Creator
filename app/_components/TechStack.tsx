"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPrisma, 
  SiOpenai,
  SiYoutube,
  SiCloudinary
} from "react-icons/si";
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineCube } from "react-icons/hi";

const technologies = [
  { icon: SiNextdotjs, name: "Next.js", description: "React Framework" },
  { icon: SiReact, name: "React", description: "UI Library" },
  { icon: SiTypescript, name: "TypeScript", description: "Type Safety" },
  { icon: SiTailwindcss, name: "Tailwind", description: "Styling" },
  { icon: SiPrisma, name: "Prisma", description: "Database ORM" },
  { icon: SiOpenai, name: "AI/ML", description: "Intelligence" },
  { icon: SiYoutube, name: "YouTube API", description: "Video Integration" },
  { icon: SiCloudinary, name: "Cloudinary", description: "Media Storage" },
];

const features = [
  {
    icon: HiOutlineLightningBolt,
    title: "Lightning Fast",
    description: "Optimized for speed with server-side rendering and edge functions",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Secure by Design",
    description: "Enterprise-grade security with OAuth and encrypted data storage",
  },
  {
    icon: HiOutlineSparkles,
    title: "AI-Powered",
    description: "Advanced language models for intelligent content generation",
  },
  {
    icon: HiOutlineCube,
    title: "Scalable",
    description: "Built to handle millions of users and courses seamlessly",
  },
];

// Ultra-smooth easing
const smoothEase = [0.22, 1, 0.36, 1];

export default function TechStack() {
  // Memoize tech items for infinite scroll
  const techItems = useMemo(() => [...technologies, ...technologies, ...technologies], []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background - CSS grid instead of JS animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            Technology
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Built with Modern Tech Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powered by cutting-edge technologies for the best experience
          </p>
        </motion.div>

        {/* Tech logos carousel - CSS animation for smoothness */}
        <div className="relative mb-20 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="tech-scroll flex gap-8 py-8">
            {techItems.map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group"
              >
                <div className="flex flex-col items-center text-center">
                  <tech.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300 ease-out" />
                  <h4 className="mt-3 font-semibold text-sm">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.08 }}
            >
              <div className="relative h-full p-6 rounded-2xl border bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:border-primary/20 hover:-translate-y-1">
                {/* Simple gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 ease-out">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="relative text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="relative text-sm text-muted-foreground">{feature.description}</p>

                {/* Decorative line - CSS animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code snippet decoration */}
        <motion.div
          className="mt-16 p-6 rounded-2xl border bg-background/80 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-sm text-muted-foreground">courseGenerator.ts</span>
          </div>
          <pre className="text-sm overflow-x-auto">
            <code className="text-muted-foreground">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">generateCourse</span>{" "}
              <span className="text-foreground">=</span>{" "}
              <span className="text-purple-400">async</span>{" "}
              <span className="text-foreground">(</span>
              <span className="text-orange-400">topic</span>
              <span className="text-foreground">:</span>{" "}
              <span className="text-green-400">string</span>
              <span className="text-foreground">) =&gt; {"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-purple-400">const</span>{" "}
              <span className="text-foreground">course</span>{" "}
              <span className="text-foreground">=</span>{" "}
              <span className="text-purple-400">await</span>{" "}
              <span className="text-blue-400">ai</span>
              <span className="text-foreground">.</span>
              <span className="text-yellow-400">generate</span>
              <span className="text-foreground">({"{"}</span>
              {"\n"}
              {"    "}
              <span className="text-foreground">topic,</span>
              {"\n"}
              {"    "}
              <span className="text-foreground">chapters:</span>{" "}
              <span className="text-orange-400">10</span>
              <span className="text-foreground">,</span>
              {"\n"}
              {"    "}
              <span className="text-foreground">includeVideos:</span>{" "}
              <span className="text-purple-400">true</span>
              {"\n"}
              {"  "}
              <span className="text-foreground">{"})"}</span>
              <span className="text-foreground">;</span>
              {"\n"}
              {"  "}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-foreground">course;</span>
              {"\n"}
              <span className="text-foreground">{"}"}</span>
            </code>
          </pre>
        </motion.div>
      </div>

      <style jsx>{`
        .tech-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        .tech-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-160px * 8 - 32px * 8)); }
        }
      `}</style>
    </section>
  );
}
