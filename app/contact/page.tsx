"use client";

import { motion } from "framer-motion";
import { Navbar } from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineChat,
  HiOutlineClock,
  HiCheck
} from "react-icons/hi";

const contactInfo = [
  {
    icon: HiOutlineMail,
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    value: "support@coursebotics.com",
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    description: "Mon-Fri from 8am to 5pm",
    value: "+1 (555) 123-4567",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Visit Us",
    description: "Come say hello at our office",
    value: "123 Innovation Street, Tech City",
  },
  {
    icon: HiOutlineChat,
    title: "Live Chat",
    description: "Chat with our support team",
    value: "Available 24/7",
  },
];

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer: "We typically respond to all inquiries within 24 hours during business days.",
  },
  {
    question: "Do you offer phone support?",
    answer: "Yes, phone support is available for Pro and Enterprise plan users.",
  },
  {
    question: "Can I schedule a demo?",
    answer: "Absolutely! Use the contact form to request a personalized demo.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            >
              <HiOutlineMail className="w-5 h-5 text-primary/20" />
            </motion.div>
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
              Get In Touch
            </motion.span>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We'd Love to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Hear From You
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have questions about CourseBotics? Need help getting started? 
              Our team is here to help you succeed.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="relative group p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <info.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-1">{info.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                <p className="text-sm font-medium text-primary">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm outline-none transition-all duration-300 ${
                      focusedField === "name"
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border"
                    }`}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john@example.com"
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm outline-none transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border"
                    }`}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Subject */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <motion.select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm outline-none transition-all duration-300 ${
                      focusedField === "subject"
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border"
                    }`}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </motion.select>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm outline-none transition-all duration-300 resize-none ${
                      focusedField === "message"
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border"
                    }`}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`w-full py-6 rounded-xl text-lg font-medium transition-all duration-300 ${
                      status === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {status === "loading" && (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    {status === "success" && <HiCheck className="w-5 h-5 mr-2" />}
                    {status === "idle" && "Send Message"}
                    {status === "loading" && "Sending..."}
                    {status === "success" && "Message Sent!"}
                    {status === "error" && "Try Again"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Right side - FAQ & Additional Info */}
            <motion.div
              className="order-1 lg:order-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Response Time */}
              <div className="p-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <HiOutlineClock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">Average response time: 2 hours</p>
                  </div>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl border bg-background/50 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="font-medium mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <motion.div
                className="relative h-64 rounded-2xl border bg-gradient-to-br from-muted/50 to-muted/30 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <HiOutlineLocationMarker className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="font-medium">123 Innovation Street</p>
                    <p className="text-sm text-muted-foreground">Tech City, TC 12345</p>
                  </div>
                </div>
                {/* Animated dots for map effect */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
