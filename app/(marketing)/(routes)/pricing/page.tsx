"use client";
import React, { useState } from "react";
import FAQ from "./components/faq";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Check, X } from "lucide-react";
import AvatarCircles from "@/app/(marketing)/components/avatar-circles";

const Pricing = () => {
  const [isAnnually, setIsAnnually] = useState(false);

  const PRICES = {
    starter: 15,
    growth: 30,
    business: 50,
  };
  const DISCOUNTS = {
    starter: 0.85,
    growth: 0.8,
    business: 0.75,
  };

  const toggleAnnually = () => {
    setIsAnnually(!isAnnually);
  };

  const getPrice = (monthlyPrice: number, discount: number) => {
    return isAnnually ? monthlyPrice * 12 * discount : monthlyPrice;
  };

  const getOriginalAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12;
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className="text-center pt-12 pb-6">
          <h1 className="text-4xl font-bold mt-12">
            Simple pricing, <span className="text-blue-600">no commitment</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Be satisfied or cancel anytime.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Label htmlFor="yearly" className="mr-2 text-base">
              Monthly
            </Label>
            <Switch onCheckedChange={toggleAnnually} />
            <Label htmlFor="yearly" className="ml-2 text-base">
              Yearly
            </Label>
            <p className="ml-4 text-xs font-semibold bg-green-300 py-1 px-2 rounded-full text-green-800 uppercase">
              Save up to 25%
            </p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 py-12 flex-col lg:flex-row ml-2 lg:ml-0">
          <div className="bg-white text-black rounded-lg shadow-sm border-2 border-gray-100 p-8 w-80 ml-6 lg:ml-0">
            <h2 className="text-2xl font-semibold">Starter</h2>
            <div className="text-4xl font-bold mt-4">
              {isAnnually && (
                <p className="text-base text-gray-500">
                  <span className="line-through">
                    ${getOriginalAnnualPrice(PRICES.starter).toFixed(2)}
                  </span>
                </p>
              )}
              ${getPrice(PRICES.starter, DISCOUNTS.starter)}{" "}
              <span className="text-base font-medium">USD</span>
              {isAnnually && (
                <span className="ml-4 text-xs font-semibold bg-green-300 py-1 px-2 rounded-full text-green-800 uppercase">
                  Save 15%
                </span>
              )}
            </div>
            <p className="text-gray-400">
              {isAnnually ? "Billed annually" : "Billed monthly"}
            </p>
            <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 mt-6 rounded-full w-full">
              Get started
            </button>
            <ul className="mt-6 text-left">
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Basic invoicing
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Easy to use accounting
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Multi-accounts
              </li>
            </ul>
          </div>
          <div className="bg-white text-black border-blue-600 border-2 rounded-lg shadow-lg p-8 w-80 lg:transform lg:-translate-y-6 transform-none mt-4 lg:mt-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-600">Growth</h2>
              <p className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Most popular
              </p>
            </div>

            <div className="text-4xl font-bold mt-4">
              {isAnnually && (
                <p className="text-base text-gray-500">
                  <span className="line-through">
                    ${getOriginalAnnualPrice(PRICES.growth).toFixed(2)}
                  </span>
                </p>
              )}
              ${getPrice(PRICES.growth, DISCOUNTS.growth)}{" "}
              <span className="text-base font-medium">USD</span>
              {isAnnually && (
                <span className="ml-4 text-xs font-semibold bg-green-300 py-1 px-2 rounded-full text-green-800 uppercase">
                  Save 20%
                </span>
              )}
            </div>
            <p className="text-gray-400">Billed monthly</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-6 rounded-full w-full">
              Get started
            </button>
            <ul className="mt-6 text-left">
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Advanced invoicing
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Easy to use accounting
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Multi-accounts
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Tax planning toolkit
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                VAT & VATMOSS filing
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Free bank transfers
              </li>
            </ul>
          </div>
          <div className="bg-white text-black rounded-lg shadow-sm border-2 border-gray-100 p-8 w-80 mt-4 lg:mt-0">
            <h2 className="text-2xl font-semibold">Business</h2>
            <div className="text-4xl font-bold mt-4">
              {isAnnually && (
                <p className="text-base text-gray-500">
                  <span className="line-through">
                    ${getOriginalAnnualPrice(PRICES.business).toFixed(2)}
                  </span>
                </p>
              )}
              ${getPrice(PRICES.business, DISCOUNTS.business)}{" "}
              <span className="text-base font-medium">USD</span>
              {isAnnually && (
                <span className="ml-4 text-xs font-semibold bg-green-300 py-1 px-2 rounded-full text-green-800 uppercase">
                  Save 25%
                </span>
              )}
            </div>
            <p className="text-gray-400">Billed monthly</p>
            <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 mt-6 rounded-full w-full">
              Get started
            </button>
            <ul className="mt-6 text-left">
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Basic invoicing
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Easy to use accounting
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Multi-accounts
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Tax planning toolkit
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center">
          <p className="text-2xl font-bold mb-4 text-center">
            +100 000 users,{" "}
            <span className="text-blue-600"> save time everyday</span>
          </p>
          <AvatarCircles
            avatarUrls={[
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            ]}
            numPeople={99}
          />
          <p className="mt-2 text-gray-600">Reviewer on Google and G2</p>
          <div className="flex items-center justify-around mt-4">
            <Image
              src="/google-reviewer.png"
              alt="Google"
              className="mr-8"
              width={120}
              height={120}
            />
            <Image
              src="/g2-reviewer.png"
              alt="G2"
              className="ml-8"
              width={120}
              height={120}
            />
          </div>
        </div>
        <div className="lg:flex flex-col justify-center px-10 pt-4 pb-12 lg:mx-32 2xl:mx-64 hidden max-md:px-5">
          <div className="mt-28 border-t border-solid border-gray-900 border-opacity-10 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                <div className="mt-24 text-lg font-semibold leading-6 text-gray-900 max-md:mt-10">
                  Catered for business
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-12 text-sm max-md:mt-10">
                  <div className="font-semibold text-base text-gray-900 leading-[171%]">
                    Starter
                  </div>
                  <div className="mt-4 leading-6 text-gray-600">
                    All your essential business finances,
                    <br />
                    taken care of.
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[53%] max-md:ml-0 max-md:w-full">
                <div className="grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow justify-end pt-12 pb-1 text-sm border-t-2 border-blue-600 border-solid max-md:mt-8">
                        <div className="font-semibold text-base text-blue-600 leading-[171%]">
                          Growth
                        </div>
                        <div className="mt-4 leading-6 text-gray-600">
                          The best financial services for your
                          <br />
                          thriving business.
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col mt-12 text-sm max-md:mt-10">
                        <div className="font-semibold text-base text-gray-900 leading-[171%]">
                          Business
                        </div>
                        <div className="mt-4 leading-6 text-gray-600">
                          Convenient features to take your
                          <br />
                          business to the next level.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mt-10 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col my-auto text-sm leading-4 text-gray-900 mx-14">
              <div>Tax Savings</div>
              <div className="mt-9">Easy to use accounting</div>
              <div className="mt-9">Multi-accounts</div>
              <div className="mt-9">Invoicing</div>
              <div className="mt-9">Exclusive offers</div>
              <div className="mt-9">6 months free advisor</div>
              <div className="mt-9">Mobile and web access</div>
            </div>
            <div className="flex-auto px-px max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center w-full  leading-6 text-center text-gray-900 bg-white rounded-lg shadow-sm max-md:mt-8">
                    <div className="flex justify-center items-center px-16 py-4 rounded-lg shadow- bg-gray-50 bg-opacity-100 max-md:px-5">
                      <div className="flex flex-col items-center w-[90px]">
                        <Check className="w-5 text-blue-600" />
                        <Check className="mt-7 w-5 text-blue-600" />

                        <div className="self-stretch mt-8">3 accounts</div>
                        <div className="self-stretch mt-9">3 invoices</div>

                        <X className="mt-7 w-5 text-gray-400" />
                        <X className="mt-7 w-5 text-gray-400" />
                        <X className="mt-7 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex justify-center items-center px-16 py-4 rounded-lg shadow-sm bg-gray-50 border-2 border-blue-600 bg-opacity-100 max-md:px-5">
                    <div className="flex flex-col items-center w-[90px]">
                      <Check className="w-5 text-blue-600" />
                      <Check className="mt-7 w-5 text-blue-600" />
                      <div className="self-stretch mt-8">3 accounts</div>
                      <div className="self-stretch mt-9">3 invoices</div>
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex justify-center items-center px-16 py-4 rounded-lg shadow-sm bg-gray-50 bg-opacity-100 max-md:px-5">
                    <div className="flex flex-col items-center w-[90px]">
                      <Check className="w-5 text-blue-600" />
                      <Check className="mt-7 w-5 text-blue-600" />
                      <div className="self-stretch mt-8">3 accounts</div>
                      <div className="self-stretch mt-9">3 invoices</div>
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-lg font-semibold leading-4 text-gray-900 max-md:mt-10 max-md:max-w-full">
            Other perks
          </div>
          <div className="flex gap-5 mt-11 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col my-auto text-sm leading-6 mx-14 text-gray-900">
              <div>24/7 customer support</div>
              <div className="mt-9">Instant notifications</div>
              <div className="mt-9">Budgeting tools</div>
              <div className="mt-9">Digital receipts</div>
              <div className="mt-9">Pots to separate money</div>
              <div className="mt-9">Free bank transfers</div>
            </div>
            <div className="flex-auto px-px max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center w-full bg-white rounded-lg shadow-sm max-md:mt-8">
                    <div className="flex justify-center items-center px-16 py-4 rounded-lg shadow-sm bg-gray-50 bg-opacity-100 max-md:px-5">
                      <div className="flex flex-col items-center w-[90px]">
                        <Check className="w-5 text-blue-600" />
                        <Check className="mt-7 w-5 text-blue-600" />
                        <div className="self-stretch mt-8">3 accounts</div>
                        <div className="self-stretch mt-9">3 invoices</div>
                        <X className="mt-7 w-5 text-gray-400" />
                        <X className="mt-7 w-5 text-gray-400" />
                        <X className="mt-7 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex justify-center items-center px-16 py-4 rounded-lg shadow-sm bg-gray-50 border-2 border-blue-600 bg-opacity-100 max-md:px-5">
                    <div className="flex flex-col items-center w-[90px]">
                      <Check className="w-5 text-blue-600" />
                      <Check className="mt-7 w-5 text-blue-600" />
                      <div className="self-stretch mt-8">3 accounts</div>
                      <div className="self-stretch mt-9">3 invoices</div>
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex justify-center items-center px-16 py-4 rounded-lg shadow-sm bg-gray-50 bg-opacity-100 max-md:px-5">
                    <div className="flex flex-col items-center w-[90px]">
                      <Check className="w-5 text-blue-600" />
                      <Check className="mt-7 w-5 text-blue-600" />
                      <div className="self-stretch mt-8">3 accounts</div>
                      <div className="self-stretch mt-9">3 invoices</div>
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                      <X className="mt-7 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-11 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col my-auto text-sm leading-6 mx-14 text-gray-900">
              <div className="text-white pointer-events-none select-none">
                ------------------------
              </div>
            </div>
            <div className="flex-auto px-px max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center w-full bg-white rounded-lg shadow-sm max-md:mt-8">
                    <div className="flex justify-center items-center px-16 py-2 rounded-full shadow-sm bg-gray-50 border-2 border-gray-200 cursor-pointer hover:text-blue-600 bg-opacity-100 max-md:px-5">
                      <div className="flex flex-col items-center w-[120px]">
                        <p>Get started</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex justify-center items-center px-16 py-2 rounded-full shadow-sm bg-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-blue-700 bg-opacity-100 max-md:px-5">
                    <div className="flex flex-col items-center w-[120px]">
                      <p className="text-white font-semibold">Get started</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex justify-center items-center px-16 py-2 rounded-full shadow-sm bg-gray-50 border-2 border-gray-200 cursor-pointer hover:text-blue-600 bg-opacity-100 max-md:px-5">
                    <div className="flex flex-col items-center w-[120px]">
                      <p>Get started</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FAQ />
        <div className="mx-auto max-w-2xl py-20 sm:px-6 sm:pt-14 sm:pb-24 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-r from-blue-400 to-indigo-600 px-6 pt-16 pb-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-14 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Got a question ?
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-200">
                We are here to help. Check our FAQ, or send us a message.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Let&apos;s talk →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
