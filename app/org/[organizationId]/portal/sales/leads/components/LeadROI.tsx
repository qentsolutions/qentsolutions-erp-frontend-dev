"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@tremor/react";

interface Lead {
  createdAt: string;
  cost: number;
  proposedprice: { price: number; closed: boolean; createdAt: string }[];
}

interface LeadROIProps {
  startDate: string;
  endDate: string;
}

export default function LeadROI({ startDate, endDate }: LeadROIProps) {
  const [leadData, setLeadData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadCostTotal, setLeadCostTotal] = useState<number>(0);
  const [leadRevenueTotal, setLeadRevenueTotal] = useState<number>(0);
  const [leadROI, setLeadROI] = useState<number>(0);

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

      let totalCost = 0;
      let totalRevenue = 0;

      leadData.forEach((lead) => {
        const leadDate = new Date(lead.createdAt);
        if (leadDate >= start && leadDate <= end) {
          totalCost += lead.cost;
        }

        lead.proposedprice.forEach((price) => {
          const priceDate = new Date(price.createdAt);
          if (price.closed && priceDate >= start && priceDate <= end) {
            totalRevenue += price.price;
          }
        });
      });

      setLeadCostTotal(totalCost);
      setLeadRevenueTotal(totalRevenue);

      // Calcul du ROI
      const roi =
        totalCost !== 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;
      setLeadROI(roi);
    }
  }, [leadData, startDate, endDate]);

  return (
    <Card className="mx-auto flex max-w-lg items-center">
      <div className="flex items-center space-x-2.5">
        <div className="flex flex-col">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            ROI
          </p>
          <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-3xl font-semibold my-2">
            {leadROI.toFixed(2)}%
          </span>
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Lead Cost: ${leadCostTotal.toFixed(2)}
          </span>
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Leads Closed: ${leadRevenueTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
}
