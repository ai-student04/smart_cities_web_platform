import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SearchFilter } from '../components/SearchFilter';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useProjects } from '../hooks/useProjects';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

export function SustainabilityPage() {
  const { projectTypes } = useProjectTypes();
  const sustainabilityType = projectTypes.find(t => t.name.toLowerCase().includes('sustain') || t.name.toLowerCase().includes('green') || t.name.toLowerCase().includes('environment'));

  const [filters, setFilters] = useState<FilterOptions>({
    projectType: '',
    location: '',
    impactLevel: '',
    searchQuery: '',
  });

  const { projects, loading } = useProjects({
    ...filters,
    projectType: sustainabilityType?.id || filters.projectType,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-green-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Sustainability & Green Projects' }]} />
          <div className="flex items-center space-x-4 mt-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Leaf className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Sustainability & Green Projects</h1>
              <p className="text-xl text-teal-100 mt-2">
                Protecting our environment through conservation, waste management, and green initiatives
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Sustainability Initiatives</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jordan's commitment to environmental sustainability is reflected in comprehensive programs addressing water conservation, waste management, air quality, and ecosystem preservation. Our green initiatives leverage smart technologies to monitor environmental conditions, optimize resource usage, and reduce pollution across urban and rural areas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These projects include advanced wastewater treatment and reuse systems, smart waste collection with route optimization, urban tree planting programs, rainwater harvesting infrastructure, and real-time environmental monitoring networks that protect public health and natural resources.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Priority Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Water Conservation</h3>
              <p className="text-sm text-gray-600">Smart irrigation and leak detection</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Waste Management</h3>
              <p className="text-sm text-gray-600">Recycling and smart collection</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Air Quality</h3>
              <p className="text-sm text-gray-600">Monitoring and emission reduction</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Green Spaces</h3>
              <p className="text-sm text-gray-600">Urban forests and parks</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">40%</div>
              <div className="text-sm text-gray-700">Water waste reduction through smart systems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">60%</div>
              <div className="text-sm text-gray-700">Increase in recycling rates citywide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">25%</div>
              <div className="text-sm text-gray-700">Improvement in urban air quality index</div>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Partnerships</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">World Bank:</span> Funding for water infrastructure modernization
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">UNDP:</span> Sustainable development goal alignment
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Private Sector:</span> Technology and operational expertise
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Universities:</span> Research and innovation support
              </div>
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
