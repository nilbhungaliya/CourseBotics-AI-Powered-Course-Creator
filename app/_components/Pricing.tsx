"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <motion.h2 
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the perfect plan for your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "Free",
              description: "Perfect for trying out our platform",
              features: [
                "Create up to 3 courses",
                "Basic AI content generation",
                "Standard templates",
                "Community support"
              ]
            },
            {
              name: "Pro",
              price: "$29",
              period: "/month",
              description: "Best for professional educators",
              features: [
                "Unlimited courses",
                "Advanced AI features",
                "Custom templates",
                "Priority support",
                "Analytics dashboard",
                "Video integration"
              ],
              popular: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For organizations and institutions",
              features: [
                "Everything in Pro",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee",
                "Team management",
                "Advanced security"
              ]
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col rounded-xl border bg-background/50 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link href="/sign-up">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 