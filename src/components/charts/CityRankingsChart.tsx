import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStatistics } from '../../hooks/useStatistics';
import { LoadingSpinner } from '../LoadingSpinner';

export function CityRankingsChart() {
  const { statistics, loading, error } = useStatistics('city_rankings');

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
        <h3 className="text-lg font-semibold text-gray-900">City Innovation Rankings</h3>
        <p className="text-sm text-gray-600 mt-1">Innovation score comparison across major Jordanian cities (out of 100)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="city" />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#007A3D" name="Innovation Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
