import { useState } from 'react';
import { Bus } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SearchFilter } from '../components/SearchFilter';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { TrafficFlowChart } from '../components/charts/TrafficFlowChart';
import { useProjects } from '../hooks/useProjects';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

export function TransportationPage() {
  const { projectTypes } = useProjectTypes();
  const transportationType = projectTypes.find(t => t.name.toLowerCase().includes('transport'));

  const [filters, setFilters] = useState<FilterOptions>({
    projectType: '',
    location: '',
    impactLevel: '',
    searchQuery: '',
  });

  const { projects, loading } = useProjects({
    ...filters,
    projectType: transportationType?.id || filters.projectType,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Smart Transportation Systems' }]} />
          <div className="flex items-center space-x-4 mt-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Bus className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Smart Transportation Systems</h1>
              <p className="text-xl text-green-100 mt-2">
                Revolutionizing mobility with intelligent traffic management and public transit
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Transportation Initiatives</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jordan's smart transportation systems leverage cutting-edge technology to reduce congestion, improve air quality, and enhance the commuting experience for millions of citizens. Our integrated approach combines intelligent traffic signals, real-time public transit tracking, and data analytics to optimize urban mobility.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These initiatives include the deployment of adaptive traffic control systems, bus rapid transit (BRT) corridors, bike-sharing programs, and electric vehicle infrastructure. By prioritizing sustainable transportation modes, we're creating cleaner, more efficient cities.
          </p>
        </div>

        <div className="mb-8">
          <TrafficFlowChart />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Smart Traffic Control</h3>
              <p className="text-sm text-gray-600">AI-powered signal optimization</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Public Transit</h3>
              <p className="text-sm text-gray-600">Real-time tracking and scheduling</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">EV Infrastructure</h3>
              <p className="text-sm text-gray-600">Charging stations and incentives</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Mobility Apps</h3>
              <p className="text-sm text-gray-600">Integrated journey planning</p>
            </div>
          </div>
        </div>

        <SearchFilter onFilterChange={setFilters} />

        <div className="mt-8">
          {loading ? (
            <LoadingSpinner fullScreen />
          ) : projects.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Projects ({projects.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
