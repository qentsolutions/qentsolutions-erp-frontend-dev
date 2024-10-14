"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What do I get exactly?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        With your purchase, you&apos;ll receive two comprehensive boilerplate :{" "}
        <br />
        <br />
        ➤ Admin Dashboard Boilerplate: This template provides you with all the
        necessary components to swiftly set up and customize an intuitive and
        powerful admin dashboard for your e-commerce site. This dashboard
        empowers you to efficiently oversee every aspect of your online
        store&apos;s operations. <br />
        <br />
        ➤ E-commerce Boilerplate: This template provides you a fully functional
        e-commerce site with a shopping cart, product pages, and checkout
        process. All connected to the admin dashboard to display products and
        orders. <br />
        <br />
      </div>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <p>
        After gaining access to the TurboShop repository, it becomes yours
        indefinitely, making it non-refundable. Rest assured, TurboShop users
        typically launch their e-commerce ventures within 7 days on average and
        start generating online revenue in record time.
      </p>
    ),
  },
  {
    question: "I have another question",
    answer: (
      <div className="space-y-2 leading-relaxed">Cool, contact us by email</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-warning" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-14 px-8 lg:px-16 max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-warning mb-4 text-blue-600">
            FAQ
          </p>
          <p className="sm:text-4xl text-3xl font-bold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
