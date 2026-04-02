import { useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCategoryBreakdownData } from '../../utils/chartData';
import '../../styles/charts.css';

export default function CategoryPieChart() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const chartData = getCategoryBreakdownData(transactions);

  if (chartData.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="chart-title">Expense Breakdown</h3>
        <p className="chart-empty">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Expense Breakdown by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
