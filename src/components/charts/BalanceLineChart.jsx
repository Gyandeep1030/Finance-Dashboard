import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getBalanceTrendData } from '../../utils/chartData';
import '../../styles/charts.css';

export default function BalanceLineChart() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const chartData = getBalanceTrendData(transactions);

  if (chartData.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="chart-title">Balance Trend</h3>
        <p className="chart-empty">No data available</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Balance Trend Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="var(--text)"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="var(--text)"
            label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg)',
              border: `1px solid var(--border)`,
              borderRadius: '6px',
            }}
            formatter={(value) => `$${value.toFixed(2)}`}
            labelStyle={{ color: 'var(--text)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ fill: 'var(--accent)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
