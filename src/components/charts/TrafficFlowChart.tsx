import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStatistics } from '../../hooks/useStatistics';
import { LoadingSpinner } from '../LoadingSpinner';

export function TrafficFlowChart() {
  const { statistics, loading, error } = useStatistics('traffic_flow');

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600" role="alert">
        <p>Error loading chart data: {error}</p>
      </div>
    );
  }

  const chartData = statistics[0]?.data || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Traffic Flow Improvements</h3>
        <p className="text-sm text-gray-600 mt-1">Average commute time reduction (minutes) over the years</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: 'Time Saved (min)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="timeSaved"
            stroke="#CE1126"
            strokeWidth={2}
            name="Avg. Time Saved (min)"
          />
          <Line
            type="monotone"
            dataKey="congestionReduction"
            stroke="#007A3D"
            strokeWidth={2}
            name="Congestion Reduction (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
