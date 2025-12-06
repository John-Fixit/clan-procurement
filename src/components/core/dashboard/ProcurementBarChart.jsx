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
import { useGetAnnualProcurement } from "../../../service/api/dashboard";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const buildMonthlyData = (annualProcurement) => {
  // Step 1: create empty 12 months
  const base = MONTHS.map((m, i) => ({
    month: m,
    jobOrderAmount: 0,
    localPurchaseAmount: 0,
    jobOrderCount: 0,
    localPurchaseCount: 0,
    total_procurements: 0,
    month_number: i + 1,
  }));

  // Step 2: fill in values from API response
  annualProcurement?.forEach((item) => {
    const index = item.month_number - 1;
    base[index] = {
      ...base[index],
      jobOrderAmount: Number(item.total_job_orders_amount || 0),
      localPurchaseAmount: Number(item.total_local_purchase_amount || 0),
      total_procurements: Number(item.total_procurements || 0),
    };
  });

  return base;
};

const ProcurementBarChart = () => {
  const { data: annualProcurement } = useGetAnnualProcurement();

  const monthlyData = buildMonthlyData(annualProcurement);

  const formatAmount = (value) => {
    return `₦${value / 1000}k`;
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
              formatter={(value, n) => [`₦${value.toLocaleString()}`, `:${n}`]}
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
    </div>
  );
};

export default ProcurementBarChart;
