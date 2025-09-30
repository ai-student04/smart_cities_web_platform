import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SearchFilter } from '../components/SearchFilter';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useProjects } from '../hooks/useProjects';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

export function DigitalServicesPage() {
  const { projectTypes } = useProjectTypes();
  const digitalType = projectTypes.find(t => t.name.toLowerCase().includes('digital') || t.name.toLowerCase().includes('service'));

  const [filters, setFilters] = useState<FilterOptions>({
    projectType: '',
    location: '',
    impactLevel: '',
    searchQuery: '',
  });

  const { projects, loading } = useProjects({
    ...filters,
    projectType: digitalType?.id || filters.projectType,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-pink-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Digital Citizen Services' }]} />
          <div className="flex items-center space-x-4 mt-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Smartphone className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Digital Citizen Services</h1>
              <p className="text-xl text-red-100 mt-2">
                Empowering citizens with accessible e-government and mobile applications
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Digital Services</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jordan's digital transformation initiative puts government services at citizens' fingertips, making it easier than ever to access information, complete transactions, and engage with public institutions. Our comprehensive e-government platform offers over 200 services online, eliminating the need for physical visits and reducing processing times.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These services include online permit applications, tax filing, civil registration, healthcare appointments, and education portals. Our mobile-first approach ensures that all citizens, regardless of location or technical expertise, can benefit from digital government services.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">E-Government</h3>
              <p className="text-sm text-gray-600">Online permits and documentation</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Healthcare Apps</h3>
              <p className="text-sm text-gray-600">Appointments and medical records</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Education Portals</h3>
              <p className="text-sm text-gray-600">Online learning and enrollment</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Systems</h3>
              <p className="text-sm text-gray-600">Secure digital transactions</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact on Citizens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Time Savings</h4>
              <p className="text-sm">Average of 3 hours saved per transaction by avoiding physical visits to government offices</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">24/7 Availability</h4>
              <p className="text-sm">Access services anytime, anywhere, removing barriers for working professionals</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Transparency</h4>
              <p className="text-sm">Real-time tracking of application status and automated notifications</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Accessibility</h4>
              <p className="text-sm">Services designed for all citizens including those with disabilities</p>
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
