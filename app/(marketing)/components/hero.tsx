"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TestimonialsAvatars from "./testimonials-avatars";
import { ArrowRight, Medal } from "lucide-react";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";

export default function Hero() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 pt-24 pb-32">
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-8 items-center justify-center text-center lg:text-left lg:items-start">
        <div className="flex items-center border shadow-sm py-2 px-4 bg-amber-100 text-amber-700 rounded-full uppercase text-sm">
          <Medal className="h-6 w-6 mr-2" />
          Your Ultimate CRM Solution
        </div>
        <h1 className="font-extrabold text-4xl lg:text-6xl text-gray-800 md:-mb-8">
          Transform Your Business Workflow in Days,
          <span className=" ml-2 text-3xl md:text-5xl bg-gradient-to-r mt-4 from-blue-400 to-indigo-600 text-white px-4 rounded-md w-fit font-bold">
            not weeks.
          </span>
        </h1>

        <p className="text-lg opacity-80 leading-relaxed mt-4 md:mt-12">
          The powerful CRM solution you need, to streamlines your core business
          activities. Connect the dots between sales, service, and support with
          a suite that adapts to your needs.
        </p>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full md:mt-8 lg:mt-0">
        <div className="w-full lg:max-w-2xl mx-auto">
          <div className="relative max-w-7xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg blur-4xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Image
              src="/hero-landing-img.png"
              alt="Product Demo"
              className="w-full rounded-lg z-20 relative"
              priority={true}
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
