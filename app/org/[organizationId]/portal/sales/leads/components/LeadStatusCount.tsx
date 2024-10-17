import React, { useState, useEffect } from "react";
import { BarList, Card } from "@tremor/react";

interface Lead {
  id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

const LeadStatusCount: React.FC = () => {
  const [leadData, setLeadData] = useState<{ name: string; value: number }[]>(
    [],
  );

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads");
        if (!response.ok) {
          throw new Error("Error fetching leads");
        }
        const data: Lead[] = await response.json();

        const allStatus = [
          "New",
          "Contacted",
          "Awaiting Response",
          "Interest Expressed",
          "Qualification In Progress",
          "Qualified",
          "Proposal Sent",
          "Negotiation In Progress",
          "Ready to Close",
          "Closed",
        ];

        const leadCountMap: { [status: string]: number } = {};
        allStatus.forEach((status) => {
          leadCountMap[status] = 0;
        });

        data.forEach((lead) => {
          leadCountMap[lead.status] = (leadCountMap[lead.status] || 0) + 1;
        });

        const leadCounts = allStatus.map((status) => ({
          name: status,
          value: leadCountMap[status],
        }));

        setLeadData(leadCounts);
      } catch (error) {
        console.error("Error fetching leads :", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="flex justify-center mt-16 md:mr-16 ">
      <Card className="max-w-2xl max-h-[75vh]">
        <h3 className="text-tremor-title font-semibold text-gray-700 text-center">
          Status Analytics
        </h3>
        <p className="mt-4 text-tremor-default flex justify-between ">
          <span className="font-medium ">Status</span>
          <span className="font-medium">Leads</span>
        </p>
        <BarList data={leadData} className="mt-2" />
      </Card>
    </div>
  );
};

export default LeadStatusCount;
