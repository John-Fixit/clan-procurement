import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { LuTrendingUp } from "react-icons/lu";
import { useGetProcOverview } from "../../../service/api/dashboard";

const ProcurementPiechart = () => {
  // Sample data for last 6 months - replace with your actual data

  const { data: procOverview } = useGetProcOverview();
  console.log(procOverview);
  const totalJobOrder = procOverview?.[0]?.total_job_type;
  const totalLocalPurchase = procOverview?.[0]?.total_local_purchase_order;

  const data = [
    { name: "Job Order", value: totalJobOrder },
    { name: "Local Purchase Order", value: totalLocalPurchase },
  ];

  const COLORS = ["#fb923c", "#60a5fa"]; // Orange and Blue

  const totalProcurements = totalJobOrder + totalLocalPurchase;
  const jobOrderPercentage = (
    (totalJobOrder / totalProcurements) *
    100
  ).toFixed(1);
  const localPurchasePercentage = (
    (totalLocalPurchase / totalProcurements) *
    100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <LuTrendingUp className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Procurement Overview - Last 6 Months
        </h2>
      </div>

      <div className="flex flex-col items-center py-4 relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
              formatter={(value) => [`${value} procurements`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold text-gray-800">
            {totalProcurements}
          </div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>

      <div className="space-y-3 mt6">
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-400"></div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                Job Order
              </span>
              <div className="text-xs text-gray-500">
                {jobOrderPercentage}% of total
              </div>
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-800">
            {totalJobOrder}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                Local Purchase Order
              </span>
              <div className="text-xs text-gray-500">
                {localPurchasePercentage}% of total
              </div>
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-800">
            {totalLocalPurchase}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcurementPiechart;
