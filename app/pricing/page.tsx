"use client";

import { motion } from "framer-motion";
import { Navbar } from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiCheck, HiX, HiOutlineSparkles } from "react-icons/hi";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out CourseBotics",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: "Up to 3 courses", included: true },
      { name: "Basic AI generation", included: true },
      { name: "Standard templates", included: true },
      { name: "Community support", included: true },
      { name: "Basic analytics", included: true },
      { name: "Video integration", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
      { name: "Team collaboration", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "Best for professional educators",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { name: "Unlimited courses", included: true },
      { name: "Advanced AI features", included: true },
      { name: "Premium templates", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Video integration", included: true },
      { name: "Custom branding", included: true },
      { name: "Export to SCORM", included: true },
      { name: "API access", included: false },
      { name: "Team collaboration", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations and institutions",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Unlimited team members", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "SLA guarantee", included: true },
      { name: "SSO authentication", included: true },
      { name: "Advanced security", included: true },
      { name: "Custom AI training", included: true },
      { name: "Full API access", included: true },
      { name: "White-label options", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer: "Yes! We offer a 14-day free trial for our Pro plan. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
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

        <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Simple Pricing
            </motion.span>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Choose Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Perfect Plan
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start free and scale as you grow. All plans include a 14-day money-back guarantee.
            </motion.p>

            {/* Billing toggle */}
            <motion.div
              className="inline-flex items-center gap-4 p-1 rounded-full bg-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isYearly ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly
                <span className="ml-2 text-xs text-primary">Save 20%</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col rounded-3xl border ${
                  plan.popular
                    ? "border-primary shadow-xl shadow-primary/10"
                    : "border-border"
                } bg-background/50 backdrop-blur-sm overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-primary text-primary-foreground text-center text-sm font-medium">
                    <HiOutlineSparkles className="inline-block w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? "pt-14" : ""}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.monthlyPrice !== null ? (
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold">
                          ${isYearly ? Math.floor(plan.yearlyPrice! / 12) : plan.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold">Custom Pricing</div>
                    )}
                    {isYearly && plan.yearlyPrice !== null && plan.yearlyPrice > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed ${plan.yearlyPrice}/year
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/sign-up"}>
                      <Button
                        className={`w-full py-6 rounded-xl text-lg ${
                          plan.popular
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Features */}
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      >
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <HiCheck className="w-3 h-3 text-primary" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                            <HiX className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground line-through"
                          }
                        >
                          {feature.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our pricing? We've got answers.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl border bg-background/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-12 md:p-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Our team is here to help you find the perfect plan for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button className="rounded-full px-8 py-6 text-lg">
                    Contact Sales
                  </Button>
                </Link>
                <Link href="/#faq">
                  <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                    View All FAQs
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
