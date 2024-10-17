"use client";
import React, { useState, useEffect } from "react";
import { Card, SparkAreaChart } from "@tremor/react";

interface Lead {
  createdAt: string;
  cost: number;
  proposedprice: { price: number; closed: boolean; createdAt: string }[];
}

interface LeadRevenueProps {
  startDate: string;
  endDate: string;
}

export default function LeadRevenue({ startDate, endDate }: LeadRevenueProps) {
  const [leadData, setLeadData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPeriodData, setCurrentPeriodData] = useState<
    { day: string; cost: number }[]
  >([]);
  const [currentPeriodCost, setCurrentPeriodCost] = useState<number>(0);
  const [previousPeriodCost, setPreviousPeriodCost] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [differenceSign, setDifferenceSign] = useState<string>("");

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
      end.setHours(23, 59, 59, 999); // Include the end date completely
      const previousStart = new Date(startDate);
      previousStart.setMonth(previousStart.getMonth() - 1);
      const previousEnd = new Date(endDate);
      previousEnd.setMonth(previousEnd.getMonth() - 1);
      previousEnd.setHours(23, 59, 59, 999);

      const daysInCurrentPeriod: { [key: string]: number } = {};
      const daysInPreviousPeriod: { [key: string]: number } = {};

      leadData.forEach((lead) => {
        lead.proposedprice.forEach((price) => {
          const leadDate = new Date(price.createdAt);
          if (leadDate >= start && leadDate <= end && price.closed) {
            const day = leadDate.toISOString().split("T")[0];
            daysInCurrentPeriod[day] =
              (daysInCurrentPeriod[day] || 0) + price.price;
          }
          if (
            leadDate >= previousStart &&
            leadDate <= previousEnd &&
            price.closed
          ) {
            const day = leadDate.toISOString().split("T")[0];
            daysInPreviousPeriod[day] =
              (daysInPreviousPeriod[day] || 0) + price.price;
          }
        });
      });

      const periodCosts = Object.entries(daysInCurrentPeriod).map(
        ([day, cost]) => ({
          day,
          cost,
        }),
      );

      const totalCurrentPeriodCost = periodCosts.reduce(
        (acc, { cost }) => acc + cost,
        0,
      );
      setCurrentPeriodData(periodCosts);
      setCurrentPeriodCost(totalCurrentPeriodCost);

      const totalPreviousPeriodCost = Object.values(
        daysInPreviousPeriod,
      ).reduce((acc, cost) => acc + cost, 0);

      setPreviousPeriodCost(totalPreviousPeriodCost);
      setDifference(totalCurrentPeriodCost - totalPreviousPeriodCost);
      setDifferenceSign(
        totalCurrentPeriodCost - totalPreviousPeriodCost >= 0 ? "+" : "-",
      );
    }
  }, [leadData, startDate, endDate]);

  const changeColor = difference >= 0 ? "text-green-500" : "text-red-500";

  function formatNumber(num: number): string {
    const decimalPart = num - Math.floor(num);
    return decimalPart === 0 ? num.toString() : num.toFixed(2);
  }

  return (
    <Card className="mx-auto flex max-w-lg items-center justify-around">
      <div className="flex items-center space-x-2.5">
        <div className="flex flex-col">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            Leads Closed
          </p>
          <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-3xl font-semibold my-2">
            ${formatNumber(currentPeriodCost)}
          </span>
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span className={`${changeColor} font-semibold`}>
              {differenceSign}
              {formatNumber(Math.abs(difference))}
            </span>
            &nbsp;from last month
          </span>
        </div>
      </div>
      <SparkAreaChart
        data={currentPeriodData}
        categories={["cost"]}
        index={"day"}
        colors={["blue"]}
        className="h-8 w-20 sm:h-10 sm:w-36 mx-4"
      />
    </Card>
  );
}
