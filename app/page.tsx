"use client";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <div className="bg-gray-100 h-full fixed w-full">
      <Header />
      <Hero />
    </div>
  );
}
