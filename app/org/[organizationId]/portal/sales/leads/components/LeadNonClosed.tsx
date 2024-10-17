"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@tremor/react";

interface Lead {
  createdAt: string;
  proposedprice: { price: number; closed: boolean; createdAt: string }[];
}

interface LeadNonClosedProps {
  startDate: string;
  endDate: string;
}

export default function LeadNonClosed({
  startDate,
  endDate,
}: LeadNonClosedProps) {
  const [leadData, setLeadData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPeriodNonClosedTotal, setCurrentPeriodNonClosedTotal] =
    useState<number>(0);
  const [currentPeriodNonClosedCount, setCurrentPeriodNonClosedCount] =
    useState<number>(0);
  const [previousPeriodNonClosedTotal, setPreviousPeriodNonClosedTotal] =
    useState<number>(0);
  const [previousPeriodNonClosedCount, setPreviousPeriodNonClosedCount] =
    useState<number>(0);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await fetch("/api/leads");
        if (!response.ok) {
          throw new Error("Error fetching lead data");
        }
        const data: Lead[] = await response.json();
        setLeadData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lead data:", error);
        setLoading(false);
      }
    };

    fetchLeadData();
  }, []);

  useEffect(() => {
    if (leadData.length > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Inclure entièrement la date de fin
      const previousStart = new Date(startDate);
      previousStart.setMonth(start.getMonth() - 1);
      const previousEnd = new Date(endDate);
      previousEnd.setMonth(end.getMonth() - 1);
      previousEnd.setHours(23, 59, 59, 999); // Inclure entièrement la date de fin précédente

      let totalNonClosedAmount = 0;
      let nonClosedLeadCount = 0;

      leadData.forEach((lead) => {
        lead.proposedprice.forEach((price) => {
          const priceDate = new Date(price.createdAt);
          if (priceDate >= start && priceDate <= end && !price.closed) {
            nonClosedLeadCount++;
            totalNonClosedAmount += price.price;
          }
        });
      });

      setCurrentPeriodNonClosedTotal(totalNonClosedAmount);
      setCurrentPeriodNonClosedCount(nonClosedLeadCount);

      let previousTotal = 0;
      let previousCount = 0;

      leadData.forEach((lead) => {
        lead.proposedprice.forEach((price) => {
          const priceDate = new Date(price.createdAt);
          if (
            priceDate >= previousStart &&
            priceDate <= previousEnd &&
            !price.closed
          ) {
            previousCount++;
            previousTotal += price.price;
          }
        });
      });

      setPreviousPeriodNonClosedTotal(previousTotal);
      setPreviousPeriodNonClosedCount(previousCount);
    }
  }, [leadData, startDate, endDate]);

  function formatNumber(num: number): string {
    const decimalPart = num - Math.floor(num);
    return decimalPart === 0 ? num.toString() : num.toFixed(2);
  }

  return (
    <Card className="mx-auto flex max-w-lg ">
      <div className="flex space-x-2.5 items-center justify-center">
        <div className="flex flex-col">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            Pending proposals
          </p>
          <div className="flex justify-center h-full w-full">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-3xl font-semibold mt-2">
              ${formatNumber(currentPeriodNonClosedTotal)}
              <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                /&nbsp;{currentPeriodNonClosedCount}&nbsp;leads
              </span>
              <p className="text-sm font-normal text-gray-500 mt-4">
                ${formatNumber(previousPeriodNonClosedTotal)} for{" "}
                {previousPeriodNonClosedCount} leads the last period&nbsp;
              </p>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
