import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProcurementBarChart = () => {
  // Sample data - replace with your actual data
  const monthlyData = [
    {
      month: "Jan",
      jobOrderAmount: 125000,
      localPurchaseAmount: 98000,
      jobOrderCount: 45,
      localPurchaseCount: 32,
    },
    {
      month: "Feb",
      jobOrderAmount: 148000,
      localPurchaseAmount: 112000,
      jobOrderCount: 52,
      localPurchaseCount: 38,
    },
    {
      month: "Mar",
      jobOrderAmount: 110000,
      localPurchaseAmount: 95000,
      jobOrderCount: 38,
      localPurchaseCount: 28,
    },
    {
      month: "Apr",
      jobOrderAmount: 175000,
      localPurchaseAmount: 128000,
      jobOrderCount: 61,
      localPurchaseCount: 42,
    },
    {
      month: "May",
      jobOrderAmount: 162000,
      localPurchaseAmount: 105000,
      jobOrderCount: 55,
      localPurchaseCount: 35,
    },
    {
      month: "Jun",
      jobOrderAmount: 138000,
      localPurchaseAmount: 118000,
      jobOrderCount: 48,
      localPurchaseCount: 40,
    },
    {
      month: "Jul",
      jobOrderAmount: 195000,
      localPurchaseAmount: 142000,
      jobOrderCount: 70,
      localPurchaseCount: 48,
    },
    {
      month: "Aug",
      jobOrderAmount: 180000,
      localPurchaseAmount: 135000,
      jobOrderCount: 63,
      localPurchaseCount: 45,
    },
    {
      month: "Sep",
      jobOrderAmount: 167000,
      localPurchaseAmount: 122000,
      jobOrderCount: 58,
      localPurchaseCount: 41,
    },
    {
      month: "Oct",
      jobOrderAmount: 188000,
      localPurchaseAmount: 145000,
      jobOrderCount: 66,
      localPurchaseCount: 49,
    },
    {
      month: "Nov",
      jobOrderAmount: 205000,
      localPurchaseAmount: 158000,
      jobOrderCount: 72,
      localPurchaseCount: 52,
    },
    {
      month: "Dec",
      jobOrderAmount: 192000,
      localPurchaseAmount: 148000,
      jobOrderCount: 68,
      localPurchaseCount: 50,
    },
  ];

  const formatAmount = (value) => {
    return `N${value / 1000}k`;
  };

  return (
    <div className="">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Total Amount by Procurement Type
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={formatAmount} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
              }}
              isAnimationActive={true}
              formatter={(value, n) => [`N${value.toLocaleString()}`, `:${n}`]}
            />
            <Legend />
            <Bar
              dataKey="jobOrderAmount"
              fill="#fb923c"
              name="Job Order"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="localPurchaseAmount"
              fill="#60a5fa"
              name="Local Purchase Order"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Total Number by Procurement Type */}
      {/* <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Total Number of Procurements by Type
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Bar
              dataKey="jobOrderCount"
              fill="#4ade80"
              name="Job Order"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="localPurchaseCount"
              fill="#c084fc"
              name="Local Purchase Order"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default ProcurementBarChart;
