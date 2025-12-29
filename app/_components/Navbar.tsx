"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Features", href: "/#features", sectionId: "features" },
  { name: "How It Works", href: "/#how-it-works", sectionId: "how-it-works" },
  { name: "Testimonials", href: "/#testimonials", sectionId: "testimonials" },
  { name: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { name: "FAQ", href: "/#faq", sectionId: "faq" },
  { name: "About", href: "/about", sectionId: null },
  { name: "Contact", href: "/contact", sectionId: null },
];

// Ultra-smooth easing curves
const smoothEase = [0.22, 1, 0.36, 1];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    // Only track active section on home page
    if (!isHomePage) {
      setActiveSection("");
      return;
    }
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = navLinks.filter(link => link.sectionId).map(link => link.sectionId!);
          for (const section of sections.reverse()) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 150) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Handle hash navigation after page loads
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [isHomePage, pathname]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsOpen(false);
    
    // If it's a page link (not hash), let Link handle it
    if (!link.sectionId) return;
    
    // If on home page, prevent default and smooth scroll
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(link.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If not on home page, let the Link navigate to /#section
  }, [isHomePage]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b shadow-sm"
            : "bg-transparent"
        }`}
        style={{ willChange: "background-color, box-shadow" }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: smoothEase }}
                className="relative w-[120px] h-[40px] sm:w-[150px] sm:h-[50px] hover:scale-[1.02] transition-transform duration-300 ease-out"
              >
                <Image
                  src={"/courseBotics-logo.svg"}
                  alt="CourseBotics"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: smoothEase, delay: 0.05 + index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ease-out ${
                      (link.sectionId && activeSection === link.sectionId) || 
                      (!link.sectionId && pathname === link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {((link.sectionId && activeSection === link.sectionId) || 
                      (!link.sectionId && pathname === link.href)) && (
                      <motion.div
                        className="absolute -bottom-1 left-2 right-2 h-0.5 bg-primary rounded-full"
                        layoutId="activeNav"
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 40,
                          mass: 0.8
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: smoothEase, delay: 0.2 }}
              >
                <ThemeToggle />
              </motion.div>

              <div className="hidden sm:flex gap-2 sm:gap-3">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: smoothEase, delay: 0.25 }}
                >
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="rounded-full px-4 sm:px-6 py-2 h-9 text-sm font-medium hover:bg-primary/10 transition-all duration-300 ease-out"
                    >
                      Sign in
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: smoothEase, delay: 0.3 }}
                  className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-out"
                >
                  <Link href="/sign-up">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 sm:px-6 py-2 h-9 text-sm font-medium transition-all duration-300 ease-out shadow-md hover:shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <motion.button
                className="lg:hidden p-2 rounded-lg hover:bg-accent z-50 transition-colors duration-200 ease-out"
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: smoothEase }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              className="fixed inset-0 top-0 bg-background/98 backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: smoothEase }}
            >
              <div className="flex flex-col items-center justify-center min-h-screen gap-6 pt-20">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, ease: smoothEase, delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="text-2xl font-medium text-foreground hover:text-primary transition-colors duration-300 ease-out"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="flex flex-col gap-4 mt-8"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, ease: smoothEase, delay: 0.25 }}
                >
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                    <Button className="rounded-full px-8 py-6 text-lg bg-primary">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
