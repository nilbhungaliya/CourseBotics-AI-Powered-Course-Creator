"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI course creation work?",
      answer: "Our AI analyzes your topic and generates a comprehensive course outline, including learning objectives, chapter structure, and key points. You can then customize and enhance the content to match your teaching style."
    },
    {
      question: "Can I customize the AI-generated content?",
      answer: "Absolutely! While our AI provides a solid foundation, you have full control to modify, add, or remove any content. The AI is there to help you get started quickly, but you're always in charge of the final product."
    },
    {
      question: "What types of courses can I create?",
      answer: "You can create courses on virtually any topic. Our platform is particularly effective for educational content, professional training, skill development, and knowledge sharing. The AI adapts to your subject matter and helps structure it appropriately."
    },
    {
      question: "How do I share my courses with students?",
      answer: "You can share your courses through multiple channels: direct links, embedding on your website, or through our platform's built-in sharing features. We also support various export formats for maximum flexibility."
    },
    {
      question: "Is there a limit to how many courses I can create?",
      answer: "The number of courses you can create depends on your plan. The free plan allows up to 3 courses, while paid plans offer unlimited course creation. Check our pricing page for detailed information."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer comprehensive support through multiple channels: email support, live chat, and a detailed knowledge base. Pro and Enterprise users also get priority support and dedicated account managers."
    }
  ];

  return (
    <section id="faq" className="relative py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <motion.h2 
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about CourseBotics
          </motion.p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="w-full text-left p-4 rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-muted-foreground"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 