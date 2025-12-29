"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  HiOutlineTemplate,
  HiOutlineChartBar,
  HiOutlineShare,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
  HiOutlinePlay,
  HiArrowRight,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineSparkles,
    title: "AI-Powered Content Generation",
    description: "Our advanced AI analyzes your topic and generates comprehensive course outlines, including learning objectives, chapter structure, key points, and quizzes. Save hours of planning time.",
    benefits: ["Save 80% of course creation time", "Generate structured outlines instantly", "AI-optimized learning paths"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: HiOutlineVideoCamera,
    title: "Smart Video Integration",
    description: "Automatically discover and integrate relevant YouTube videos for each chapter. Our AI matches content to ensure the highest quality educational material.",
    benefits: ["Auto-suggest relevant videos", "Seamless YouTube integration", "Video quality scoring"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: HiOutlineTemplate,
    title: "Beautiful Templates",
    description: "Choose from dozens of professionally designed templates that make your courses look stunning. Fully customizable to match your brand.",
    benefits: ["50+ professional templates", "Customizable branding", "Mobile-responsive designs"],
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: HiOutlineChartBar,
    title: "Advanced Analytics",
    description: "Track student progress, engagement, and completion rates with detailed analytics. Make data-driven decisions to improve your courses.",
    benefits: ["Real-time progress tracking", "Engagement metrics", "Performance insights"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: HiOutlineShare,
    title: "Easy Sharing & Publishing",
    description: "Share your courses with a single link or embed them on any website. Export to multiple formats including SCORM for LMS integration.",
    benefits: ["One-click sharing", "Multiple export formats", "LMS compatible"],
    color: "from-red-500 to-rose-500",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Lightning Fast Performance",
    description: "Built with cutting-edge technology for blazing fast load times. Your students will never have to wait for content to load.",
    benefits: ["Sub-second load times", "Global CDN delivery", "Optimized media"],
    color: "from-indigo-500 to-violet-500",
  },
];

const comparisons = [
  { feature: "Course creation time", traditional: "2-4 weeks", coursebotics: "2-4 hours" },
  { feature: "Video integration", traditional: "Manual search", coursebotics: "AI-powered" },
  { feature: "Content quality", traditional: "Variable", coursebotics: "Consistently high" },
  { feature: "Cost per course", traditional: "$500-2000", coursebotics: "From $0" },
  { feature: "Updates & revisions", traditional: "Time-consuming", coursebotics: "One-click" },
];

export default function FeaturesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <main className="relative min-h-screen" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`grid-h-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                style={{ top: `${i * 5}%`, left: 0, right: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Powerful Features
            </motion.span>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Everything You Need to Create{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Amazing Courses
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover the powerful features that make CourseBotics the #1 choice 
              for educators worldwide. Create, customize, and share courses with ease.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/sign-up">
                <Button className="rounded-full px-8 py-6 text-lg group">
                  Start Free Trial
                  <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                <HiOutlinePlay className="mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-full p-8 rounded-3xl border bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/30">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="relative text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="relative text-muted-foreground mb-6">{feature.description}</p>

                  {/* Benefits */}
                  <ul className="relative space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover decoration */}
                  <motion.div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why CourseBotics?
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Traditional vs CourseBotics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how CourseBotics revolutionizes the course creation process
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto overflow-hidden rounded-3xl border bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-muted/50 border-b">
              <div className="font-semibold">Feature</div>
              <div className="font-semibold text-center text-muted-foreground">Traditional</div>
              <div className="font-semibold text-center text-primary">CourseBotics</div>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-3 gap-4 p-6 border-b last:border-b-0 hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="font-medium">{item.feature}</div>
                <div className="text-center text-muted-foreground">{item.traditional}</div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {item.coursebotics}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                See It In Action
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Create a Course in Minutes
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Watch how easy it is to create a professional course with CourseBotics. 
                From topic to published course in just a few clicks.
              </p>

              <div className="space-y-4">
                {[
                  { step: 1, title: "Enter your topic", time: "5 seconds" },
                  { step: 2, title: "AI generates content", time: "30 seconds" },
                  { step: 3, title: "Customize & add videos", time: "5 minutes" },
                  { step: 4, title: "Publish & share", time: "10 seconds" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-background/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                    </div>
                    <span className="text-sm text-primary font-medium">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Demo visualization */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-video rounded-3xl border bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                {/* Animated demo placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.4)",
                        "0 0 0 20px rgba(var(--primary), 0)",
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <HiOutlinePlay className="w-10 h-10 text-primary ml-1" />
                  </motion.div>
                </div>

                {/* Animated elements */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡ 10x Faster
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                🎯 AI-Powered
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Security & Trust
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your content and data are protected with industry-leading security measures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: HiOutlineShieldCheck, title: "SOC 2 Compliant", description: "Enterprise-grade security standards" },
              { icon: HiOutlineGlobe, title: "GDPR Ready", description: "Full compliance with data regulations" },
              { icon: HiOutlineLightningBolt, title: "99.9% Uptime", description: "Reliable service guaranteed" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl border bg-background/50 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 md:p-16 text-center text-primary-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decoration */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${50 + i * 30}px`,
                  height: `${50 + i * 30}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Ready to Transform Your Course Creation?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Join thousands of educators who have already made the switch to CourseBotics.
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <Link href="/sign-up">
                  <Button size="lg" variant="secondary" className="rounded-full px-10 py-6 text-lg shadow-lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg border-white/30 hover:bg-white/10">
                    Contact Sales
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
