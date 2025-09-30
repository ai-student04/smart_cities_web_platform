import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStatistics } from '../../hooks/useStatistics';
import { LoadingSpinner } from '../LoadingSpinner';

export function AdoptionRatesChart() {
  const { statistics, loading, error } = useStatistics('adoption_rates');

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
        <h3 className="text-lg font-semibold text-gray-900">Smart Project Adoption Rates</h3>
        <p className="text-sm text-gray-600 mt-1">Percentage of smart projects adopted across major Jordanian cities</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis label={{ value: 'Adoption Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="adoptionRate" fill="#007A3D" name="Adoption Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
