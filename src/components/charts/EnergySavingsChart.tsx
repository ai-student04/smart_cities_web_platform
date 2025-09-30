import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStatistics } from '../../hooks/useStatistics';
import { LoadingSpinner } from '../LoadingSpinner';

export function EnergySavingsChart() {
  const { statistics, loading, error } = useStatistics('energy_savings');

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
        <h3 className="text-lg font-semibold text-gray-900">Energy Savings from Smart Buildings</h3>
        <p className="text-sm text-gray-600 mt-1">Annual energy consumption reduction in megawatt-hours (MWh)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: 'Energy Saved (MWh)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="energySaved" stroke="#007A3D" strokeWidth={2} name="Energy Saved (MWh)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
