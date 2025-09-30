import { useState } from 'react';
import { Zap } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SearchFilter } from '../components/SearchFilter';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EnergySavingsChart } from '../components/charts/EnergySavingsChart';
import { useProjects } from '../hooks/useProjects';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

export function EnergyPage() {
  const { projectTypes } = useProjectTypes();
  const energyType = projectTypes.find(t => t.name.toLowerCase().includes('energy'));

  const [filters, setFilters] = useState<FilterOptions>({
    projectType: '',
    location: '',
    impactLevel: '',
    searchQuery: '',
  });

  const { projects, loading } = useProjects({
    ...filters,
    projectType: energyType?.id || filters.projectType,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Energy-Efficient Buildings' }]} />
          <div className="flex items-center space-x-4 mt-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Zap className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Energy-Efficient Buildings</h1>
              <p className="text-xl text-yellow-100 mt-2">
                Reducing carbon footprint through smart energy systems and renewable power
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Energy Initiatives</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jordan is committed to achieving energy efficiency and sustainability through innovative building technologies and renewable energy integration. Our smart building initiatives incorporate advanced automation systems, solar power generation, and intelligent HVAC controls to minimize energy consumption while maximizing comfort.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These projects include retrofitting existing buildings with energy management systems, constructing net-zero energy buildings, deploying solar panels on public and private structures, and implementing district cooling systems. The result is significant cost savings and reduced environmental impact.
          </p>
        </div>

        <div className="mb-8">
          <EnergySavingsChart />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Solar Energy</h3>
              <p className="text-sm text-gray-600">Rooftop and ground-mounted installations</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Smart HVAC</h3>
              <p className="text-sm text-gray-600">AI-optimized heating and cooling</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">LED Lighting</h3>
              <p className="text-sm text-gray-600">Motion-sensor enabled systems</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Energy Storage</h3>
              <p className="text-sm text-gray-600">Battery systems for peak management</p>
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
