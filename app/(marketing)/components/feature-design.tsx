import React from "react";
import Image from "next/image";
import WobbleCard from "./wobble-card";

const FeatureDesign = () => {
  return (
    <div className="p-4 mx-4 md:mx-80 pt-8 pb-12 ">
      <h2 className="text-center text-5xl text-gray-800 font-bold pt-8">
        Unmatched productivity
      </h2>
      <p className="pb-10 pt-4 text-center text-gray-800">
        project, time, knowledge management platform that provides amazing
        collaboration !
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] bg-blue-600">
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Insightful Lead Tracking
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Watch your leads turn into customers through our delightful
            </p>
          </div>
          <Image
            src="/hero-img.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="bg-indigo-700 col-span-1 min-h-[300px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Streamline
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Keep the pulse on every lead with our One-Click Update feature.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-800 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Signup for blazing-fast
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Free up valuable time with AI-powered task management. Our CRM
              automates the routine so you can focus on closing deals and
              building customer relationships.
            </p>
          </div>
          <Image
            src="/hero-img.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
};

export default FeatureDesign;
