"use client";
import React, { useState, useEffect } from "react";
import { List, ListItem } from "@tremor/react";
import { DonutChart } from "@tremor/react"; // Import DonutChart from tremor

interface Lead {
  id: string;
  createdAt: string;
  source: string;
}

interface ChartData {
  name: string;
  amount: number;
  percentage: number;
}

interface LeadLineChartProps {
  startDate: string;
  endDate: string;
}

// Function to generate mock lead data
const generateMockLeads = (numLeads: number): Lead[] => {
  const sources = ["Facebook", "Google", "Email", "Referral"];
  const leads: Lead[] = [];

  for (let i = 0; i < numLeads; i++) {
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomDate = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30); // Random date in the last 30 days

    leads.push({
      id: `lead-${i}`,
      createdAt: randomDate.toISOString(),
      source: randomSource,
    });
  }

  return leads;
};

export default function LeadLineChart({
  startDate,
  endDate,
}: LeadLineChartProps) {
  const [leadData, setLeadData] = useState<Lead[]>([]);
  const [filteredData, setFilteredData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState<number>(0);

  useEffect(() => {
    // Generate mock lead data
    const mockLeads = generateMockLeads(100); // Generate 100 leads
    setLeadData(mockLeads);
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = leadData.filter((lead) => {
      const leadDate = new Date(lead.createdAt).toISOString().split("T")[0];
      return leadDate >= startDate && leadDate <= endDate;
    });
    setFilteredData(filtered);
    setTotalLeads(filtered.reduce((total, lead) => total + 1, 0));
  }, [startDate, endDate, leadData]);

  function generateDataForChart(leads: Lead[]): ChartData[] {
    const groupedLeads = leads.reduce(
      (acc, lead) => {
        acc[lead.source] ??= 0;
        acc[lead.source]++;
        return acc;
      },
      {} as { [source: string]: number },
    );

    const total = Object.values(groupedLeads).reduce(
      (acc, count) => acc + count,
      0,
    );

    return Object.entries(groupedLeads).map(([source, count]) => ({
      name: source,
      amount: count,
      percentage: (count / total) * 100,
    }));
  }

  const chartData = generateDataForChart(filteredData);

  return (
    <div className=" w-full ">
      <div className="flex items-center justify-around">
        <List className="mt-2 overflow-y-auto" style={{ maxHeight: "200px" }}>
          {chartData.map((item, index) => (
            <ListItem key={index}>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>{item.name} :</span>
                <span>{item.amount}</span>
                <p>leads</p>
                <span className="text-gray-700 font-semibold text-lg">
                  ({item.percentage.toFixed(2)}%)
                </span>
              </div>
            </ListItem>
          ))}
        </List>
        <DonutChart
          className="h-48 text-4xl"
          data={chartData}
          category="amount"
          index="name"
          valueFormatter={(value: number) => value.toString()}
        />
      </div>
    </div>
  );
}
