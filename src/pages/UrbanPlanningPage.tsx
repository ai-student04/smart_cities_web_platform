import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SearchFilter } from '../components/SearchFilter';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useProjects } from '../hooks/useProjects';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

export function UrbanPlanningPage() {
  const { projectTypes } = useProjectTypes();
  const urbanPlanningType = projectTypes.find(t => t.name.toLowerCase().includes('urban') || t.name.toLowerCase().includes('planning'));

  const [filters, setFilters] = useState<FilterOptions>({
    projectType: '',
    location: '',
    impactLevel: '',
    searchQuery: '',
  });

  const { projects, loading } = useProjects({
    ...filters,
    projectType: urbanPlanningType?.id || filters.projectType,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Urban Planning & Development' }]} />
          <div className="flex items-center space-x-4 mt-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Building2 className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Urban Planning & Development</h1>
              <p className="text-xl text-blue-100 mt-2">
                Creating sustainable, livable cities through innovative planning and smart zoning
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Urban Planning Initiatives</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jordan's urban planning initiatives focus on creating sustainable, efficient, and livable cities that accommodate population growth while preserving cultural heritage and environmental resources. Our comprehensive approach integrates smart technologies with traditional planning principles to develop resilient urban spaces.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These projects encompass master planning, mixed-use developments, green spaces, and infrastructure modernization. By leveraging data-driven decision-making and community engagement, we ensure that development meets the needs of current and future generations.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Master Planning</h3>
              <p className="text-sm text-gray-600">Comprehensive city development strategies</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Zoning Innovation</h3>
              <p className="text-sm text-gray-600">Smart land use and mixed-use developments</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Public Spaces</h3>
              <p className="text-sm text-gray-600">Parks, plazas, and community areas</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Heritage Preservation</h3>
              <p className="text-sm text-gray-600">Protecting historical and cultural sites</p>
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
