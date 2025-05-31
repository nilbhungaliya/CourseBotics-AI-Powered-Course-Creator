"use client";
import { Header } from "./_components/Header";
import Hero from "./_components/Hero";
import { motion } from "framer-motion";
import Features from "./_components/Features";
import FAQ from "./_components/FAQ";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        
        {/* Animated mesh grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              style={{
                top: `${i * 5}%`,
                left: '0',
                right: '0',
                transform: `translateX(${Math.sin(i) * 20}px)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Floating tech elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`tech-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            >
              <div className="relative">
                {/* Tech symbol */}
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm" />
                {/* Connection lines */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, j) => (
                    <motion.div
                      key={`line-${j}`}
                      className="absolute w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"
                      style={{
                        transform: `rotate(${j * 90}deg)`,
                        transformOrigin: 'left center',
                      }}
                      animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: j * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-primary/10 blur-xl"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Tech circuit patterns */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`circuit-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="relative w-24 h-24">
                {/* Circuit lines */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, j) => (
                    <motion.div
                      key={`circuit-line-${j}`}
                      className="absolute h-[1px] bg-primary/20"
                      style={{
                        width: '100%',
                        top: `${j * 33}%`,
                      }}
                      animate={{
                        scaleX: [0, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: j * 0.5,
                      }}
                    />
                  ))}
                </div>
                {/* Circuit nodes */}
                {[...Array(4)].map((_, j) => (
                  <motion.div
                    key={`circuit-node-${j}`}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    style={{
                      left: `${j % 2 === 0 ? '0' : '100%'}`,
                      top: `${Math.floor(j / 2) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: j * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative">
        <Header />
        <Hero />
        <Features />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
