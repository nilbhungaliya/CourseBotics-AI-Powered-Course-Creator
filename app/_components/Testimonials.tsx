"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Online Educator",
    avatar: "SJ",
    rating: 5,
    content: "CourseBotics has completely transformed how I create courses. What used to take weeks now takes just hours. The AI-generated content is incredibly relevant and well-structured.",
    highlight: "What used to take weeks now takes just hours",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Corporate Trainer",
    avatar: "MC",
    rating: 5,
    content: "The video integration feature is a game-changer. It automatically finds the perfect supplementary content for each chapter. Our training engagement has increased by 60%!",
    highlight: "engagement has increased by 60%",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "University Professor",
    avatar: "ER",
    rating: 5,
    content: "As someone who was skeptical about AI, I'm amazed by the quality of content CourseBotics produces. It understands academic rigor while keeping content accessible.",
    highlight: "amazed by the quality",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Tech Instructor",
    avatar: "DK",
    rating: 5,
    content: "I've tried many course creation tools, but nothing comes close to CourseBotics. The customization options are endless, and the support team is phenomenal.",
    highlight: "nothing comes close",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Life Coach",
    avatar: "LT",
    rating: 5,
    content: "CourseBotics helped me launch my coaching business online. The templates are beautiful, and the AI understands the nuances of personal development content.",
    highlight: "launch my coaching business",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Fitness Trainer",
    avatar: "JW",
    rating: 5,
    content: "Creating fitness courses with video integration has never been easier. My clients love the professional quality, and I love how much time I save!",
    highlight: "clients love the professional quality",
  },
];

// Ultra-smooth easing
const smoothEase = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, paginate]);

  // Get visible testimonials for the grid - memoized
  const visibleTestimonials = useMemo(() => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push(testimonials[index]);
    }
    return items;
  }, [currentIndex]);

  // Memoize background
  const background = useMemo(() => (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      {/* Static decorative quotes */}
      <div className="absolute top-20 left-10 text-[200px] font-serif text-primary/5 select-none animate-float-slow">
        "
      </div>
      <div className="absolute bottom-20 right-10 text-[200px] font-serif text-primary/5 select-none rotate-180 animate-float-slow-reverse">
        "
      </div>
    </div>
  ), []);

  return (
    <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden">
      {background}

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
            Testimonials
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by Educators Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say about their experience
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div 
          className="relative max-w-4xl mx-auto mb-16"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="relative h-[400px] md:h-[320px] overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.5, ease: smoothEase },
                  opacity: { duration: 0.4, ease: smoothEase },
                }}
                className="absolute inset-0"
              >
                <div className="h-full p-8 md:p-12 rounded-3xl border bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-sm">
                  <div className="flex flex-col h-full justify-between">
                    {/* Quote */}
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <HiStar key={i} className="w-5 h-5 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                        "{testimonials[currentIndex].content}"
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-8">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                        {testimonials[currentIndex].avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                        <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-200 ease-out z-10"
            onClick={() => paginate(-1)}
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-200 ease-out z-10"
            onClick={() => paginate(1)}
          >
            <HiChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-400 ease-out ${
                  index === currentIndex ? "bg-primary w-8" : "bg-primary/30 w-2 hover:bg-primary/50"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid of smaller testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 ease-out group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.08 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="w-4 h-4 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 8s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0) rotate(180deg); }
          50% { transform: translateY(15px) rotate(177deg); }
        }
      `}</style>
    </section>
  );
}
