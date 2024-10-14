"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LineChart,
  LucideIcon,
  Users2,
  Workflow,
  Wrench,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  type?: "video" | "image";
  path?: string;
  format?: string;
  alt?: string;
  svg: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Lead Management",
    path: "/lead-management.png",
    type: "image",
    description:
      "Organize and track every interaction with your potential customers. Automate lead scoring and prioritization to focus on the prospects with the highest conversion potential.",
    svg: Users2,
  },
  {
    title: "Sales Automation",
    path: "/data-lead.png",
    type: "image",
    description:
      "Streamline your sales process with triggers for follow-ups, task assignments, and deal closures. Minimize manual data entry and maximize efficiency.",
    svg: Workflow,
  },
  {
    title: "Customer Data Analysis",
    path: "/data-chart.png",
    type: "image",
    description:
      "Deep dive into your customer data with advanced analytics. Uncover trends, forecast sales, and personalize customer interactions with data-driven insights.",
    svg: LineChart,
  },
  {
    title: "Integrated Communication Tools",
    description:
      "Communicate with customers directly from the CRM. Track all communication history, from emails to calls, ensuring you never miss a beat in customer relationships.",
    svg: Wrench,
  },
];

interface ItemProps {
  feature: Feature;
  isOpen: boolean;
  setFeatureSelected: () => void;
}
const Item = ({ feature, isOpen, setFeatureSelected }: ItemProps) => {
  const accordion = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0");

  useEffect(() => {
    if (isOpen && accordion.current) {
      setMaxHeight(`${accordion.current.scrollHeight}px`);
    } else {
      setMaxHeight("0");
    }
  }, [isOpen]);

  return (
    <li className="list-none">
      <button
        className={`flex items-center w-full p-5 ${isOpen ? "text-custom-color font-bold text-lg bg-indigo-50" : "text-gray-800 opacity-40 hover:opacity-100 duration-300"}`} // Apply blue background and white text when isOpen is true
        onClick={() => setFeatureSelected()}
        aria-expanded={isOpen}
      >
        {/* Render increment 1 to each  */}
        <p className="text-lg">{features.indexOf(feature) + 1}</p>
        <div className="w-6 h-6 mr-2 ml-4">
          <feature.svg />
        </div>
        <h3 className="font-semibold">{feature.title}</h3>
        <span className="ml-auto">
          {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </span>
      </button>
      <div
        ref={accordion}
        className="transition-[max-height] duration-300 ease-in-out overflow-hidden bg-indigo-50"
        style={{ maxHeight, opacity: isOpen ? 1 : 0 }}
      >
        <p className="p-5">{feature.description}</p>
      </div>
    </li>
  );
};

interface MediaProps {
  feature: Feature;
}

const Media = ({ feature }: MediaProps) => {
  if (!feature.type) {
    return <div className="h-24"></div>; // Returns a div with minimal height when no media is present
  }

  if (feature.type === "video") {
    return (
      <video
        className="w-full rounded-lg aspect-video"
        autoPlay
        muted
        loop
        playsInline
        controls
      >
        <source src={feature.path} type={feature.format} />
      </video>
    );
  } else {
    return (
      <Image
        src={feature.path!}
        alt={feature.alt!}
        className="w-full h-auto object-cover rounded-lg"
        width={500}
        height={281}
      />
    );
  }
};

const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <div className="p-12 py-20 max-w-7xl mx-auto mt-8">
      <div className="flex items-center justify-center">
        <h2 className="text-4xl text-gray-700 text-center font-bold mb-12">
          Everything you need to boost your sales and <br /> grow your business.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-start py-14">
        <ul className="flex-1">
          {features.map((feature, i) => (
            <Item
              key={i}
              feature={feature}
              isOpen={featureSelected === i}
              setFeatureSelected={() => setFeatureSelected(i)}
            />
          ))}
        </ul>
        <div className="flex-1">
          <Media feature={features[featureSelected]} />
        </div>
      </div>
    </div>
  );
};

export default FeaturesAccordion;
