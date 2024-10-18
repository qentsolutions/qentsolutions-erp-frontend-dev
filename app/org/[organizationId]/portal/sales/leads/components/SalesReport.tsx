"use client";

import { useState } from "react";
import { Card, Title, BarChart, LineChart, Subtitle, Button } from "@tremor/react";
import { BarChart2, LineChart as LineChartIcon } from "lucide-react";  // Importing icons

const data = [
  { month: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

export function SalesReport() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  return (
    <Card>
      {/* Flex container for title and buttons */}
      <div className="flex justify-between items-center">
        <div>
          <Title>Sales Overview</Title>
          <Subtitle>Monthly sales for the current year</Subtitle>
        </div>

        {/* Button group for chart type selection */}
        <div className="flex space-x-2">
          {/* Button for Bar Chart */}
          <Button
            onClick={() => setChartType("bar")}
            className={`${
              chartType === "bar" ? "bg-blue-600 text-white" : "bg-gray-200 text-black border-none hover:bg-gray-200"
            } flex items-center space-x-2 px-4 py-2 rounded`}
          >
            <BarChart2 className="w-5 h-5" />
          </Button>

          {/* Button for Line Chart */}
          <Button
            onClick={() => setChartType("line")}
            className={`${
              chartType === "line" ? "bg-blue-600 text-white" : "bg-gray-200 text-black border-none hover:bg-gray-200"
            } flex items-center space-x-2 px-4 py-2 rounded`}
          >
            <LineChartIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {chartType === "bar" ? (
          <BarChart
            data={data}
            index="month"
            categories={["total"]}
            colors={["blue"]}
            valueFormatter={(number) => `${number.toLocaleString("en-US")}€`}
            yAxisWidth={48}
          />
        ) : (
          <LineChart
            data={data}
            index="month"
            categories={["total"]}
            colors={["blue"]}
            valueFormatter={(number) => `${number.toLocaleString("en-US")}€`}
            yAxisWidth={48}
          />
        )}
      </div>
    </Card>
  );
}
