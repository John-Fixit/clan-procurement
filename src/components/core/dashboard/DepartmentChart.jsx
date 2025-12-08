import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useGetAnnualDepartment } from "../../../service/api/dashboard";

const COLORS = [
  "#FFE5B4", // Peach/Light Orange
  "#FFB6C1", // Light Pink
  // "#FFEFD5", // Papaya Whip
  "#B4E7CE", // Mint Green
  "#E6B8AF", // Light Coral
  "#FFD700", // Gold
  "#98D8C8", // Teal
  "#F7CAC9", // Rose
  "#DEB887", // Burlywood
  "#AFEEEE", // Pale Turquoise
  "#C5E1A5", // Light Green
  "#F6A5C0", // Pink
  "#FFF59D", // Light Yellow
  "#A5D6A7", // Green
  "#EF9A9A", // Light Red
  "#FFE082", // Amber
  "#80CBC4", // Cyan
  "#FFAB91", // Deep Orange
  "#CE93D8", // Purple
  "#90CAF9", // Blue
  "#FFCC80", // Orange
  "#B39DDB", // Deep Purple
  "#81C784", // Green
  "#E57373", // Red
];
const RADIAN = Math.PI / 180;
const DepartmentChart = () => {
  const { data: get_department } = useGetAnnualDepartment();
  const chartData =
    get_department?.map((item) => ({
      name: item.department,
      value: parseFloat(item.total_amount),
      frequency: item.frequency,
    })) || [];

  // Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom label to show department names
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    const percentageValue = Math.max((percent ?? 0) * 100, 0.01);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={"center"}
        dominantBaseline="central"
      >
        {`${percentageValue.toFixed(2)}%`}
      </text>
    );
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-2 gap-2 mt-4 max-h-60 overflow-y-auto px-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm shrink-0 text-gray-700"
              style={{ backgroundColor: entry.color }}
            />
            <span
              className="text-xs text-gray-700 truncate"
              title={entry.value}
            >
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg p-6">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            innerRadius="30%"
            // outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip total={total} />} />
          <Legend
            content={renderLegend}
            verticalAlign="bottom"
            className="min-h-[180px]"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="text-center text-sm text-gray-600">
        <p>
          Total Spending: ₦
          {total.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>Total Departments: {chartData.length}</p>
      </div>
    </div>
  );
};

export default DepartmentChart;

// Custom tooltip
const CustomTooltip = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800 mb-1">{data.name}</p>
        <p className="text-sm text-gray-600">
          Amount: ₦
          {data.value.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-sm text-gray-600">Frequency: {data.frequency}</p>
        <p className="text-sm text-gray-600">
          Percentage: {((data.value / total) * 100).toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};
