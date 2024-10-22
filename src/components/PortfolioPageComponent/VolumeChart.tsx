import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data - you can replace this with your actual data
const data = Array.from({ length: 20 }, (_, i) => ({
  time: i + 1,
  volume: Math.random() * 35000000 + 5000000,
}));

const VolumeChart = () => {
  const formatYAxis = (value:any) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return value;
  };

  return (
    <div className="w-full h-96 bg-[#0B0B20] p-6 rounded-lg m-4">
      <div className="text-slate-200 text-sm mb-4">$0.00</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="time"
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#e2e8f0',
            }}
            itemStyle={{ color: '#e2e8f0' }}
            formatter={(value) => [formatYAxis(value), 'Volume']}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            fill="url(#colorGradient)"
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;