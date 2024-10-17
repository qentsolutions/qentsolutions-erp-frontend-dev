"use client";
import React, { useState, useEffect } from "react";
import { Card, SparkAreaChart } from "@tremor/react";

interface Lead {
  createdAt: string;
  cost: number;
}

interface LeadCostAnalyticsProps {
  startDate: string;
  endDate: string;
}

export default function LeadCostAnalytics({
  startDate,
  endDate,
}: LeadCostAnalyticsProps) {
  const [leadData, setLeadData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPeriodData, setCurrentPeriodData] = useState<
    { day: string; cost: number }[]
  >([]);
  const [currentPeriodCost, setCurrentPeriodCost] = useState<number>(0);
  const [previousPeriodCost, setPreviousPeriodCost] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
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
      const previousStart = new Date(startDate);
      previousStart.setMonth(start.getMonth() - 1);
      const previousEnd = new Date(endDate);
      previousEnd.setMonth(end.getMonth() - 1);

      const filteredCurrentPeriodData = leadData.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= start && leadDate <= end;
      });

      const filteredPreviousPeriodData = leadData.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= previousStart && leadDate <= previousEnd;
      });

      const currentPeriodCost = filteredCurrentPeriodData.reduce(
        (acc, lead) => acc + lead.cost,
        0,
      );
      const previousPeriodCost = filteredPreviousPeriodData.reduce(
        (acc, lead) => acc + lead.cost,
        0,
      );

      const cumulativePeriodData: { day: string; cost: number }[] = [];
      let cumulativeCost = previousPeriodCost;

      for (let i = 1; i <= end.getDate(); i++) {
        const dayData = filteredCurrentPeriodData.filter((lead) => {
          const leadDate = new Date(lead.createdAt);
          return leadDate.getDate() === i;
        });

        const dayCost = dayData.reduce((acc, lead) => acc + lead.cost, 0);
        cumulativeCost += dayCost;

        cumulativePeriodData.push({ day: i.toString(), cost: cumulativeCost });
      }

      setCurrentPeriodData(cumulativePeriodData);
      setCurrentPeriodCost(currentPeriodCost);
      setPreviousPeriodCost(previousPeriodCost);

      if (previousPeriodCost > 0) {
        const change =
          ((currentPeriodCost - previousPeriodCost) / previousPeriodCost) * 100;
        setPercentageChange(change);
        setDifferenceSign(change >= 0 ? "+" : "-");
      } else {
        setPercentageChange(currentPeriodCost > 0 ? 100 : 0);
        setDifferenceSign("+");
      }
    }
  }, [leadData, startDate, endDate]);

  const changeColor = percentageChange >= 0 ? "text-red-500" : "text-green-500";

  // Ajout de la valeur de la période précédente au début du tableau
  const chartData = [
    { day: "Previous Period", cost: previousPeriodCost },
    ...currentPeriodData,
  ];

  function formatNumber(num: number): string {
    const decimalPart = num - Math.floor(num);
    return decimalPart === 0 ? num.toString() : num.toFixed(2);
  }

  return (
    <Card className="mx-auto flex max-w-lg items-center justify-around">
      <div className="flex items-center space-x-2.5">
        <div className="flex flex-col">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            Lead Cost
          </p>
          <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-3xl font-semibold my-2">
            ${formatNumber(currentPeriodCost)}
          </span>
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span className={`${changeColor} font-semibold`}>
              {differenceSign}
              {formatNumber(
                Math.abs(
                  Number(currentPeriodCost.toFixed(2)) -
                    Number(previousPeriodCost.toFixed(2)),
                ),
              )}
            </span>
            &nbsp;from last period
          </span>
        </div>
      </div>

      <SparkAreaChart
        data={chartData}
        categories={["cost"]}
        index={"day"}
        colors={percentageChange >= 0 ? ["red"] : ["green"]}
        className="h-8 w-20 sm:h-10 sm:w-36 mx-4"
      />
    </Card>
  );
}
