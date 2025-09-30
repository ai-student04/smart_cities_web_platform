import { useState } from 'react';
import { Wifi } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SearchFilter } from '../components/SearchFilter';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useProjects } from '../hooks/useProjects';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

export function IoTPage() {
  const { projectTypes } = useProjectTypes();
  const iotType = projectTypes.find(t => t.name.toLowerCase().includes('iot') || t.name.toLowerCase().includes('connectivity'));

  const [filters, setFilters] = useState<FilterOptions>({
    projectType: '',
    location: '',
    impactLevel: '',
    searchQuery: '',
  });

  const { projects, loading } = useProjects({
    ...filters,
    projectType: iotType?.id || filters.projectType,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'IoT Infrastructure & Connectivity' }]} />
          <div className="flex items-center space-x-4 mt-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Wifi className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">IoT Infrastructure & Connectivity</h1>
              <p className="text-xl text-cyan-100 mt-2">
                Building the digital backbone with sensors, networks, and data platforms
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About IoT & Connectivity</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jordan's IoT infrastructure forms the foundation of our smart cities, connecting thousands of sensors, devices, and systems to gather real-time data for informed decision-making. Our comprehensive network includes environmental sensors, smart meters, traffic cameras, and public Wi-Fi hotspots that work together to create a responsive urban ecosystem.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Key initiatives include the nationwide 5G rollout, deployment of LoRaWAN networks for low-power IoT devices, establishment of citywide fiber optic backbones, and creation of open data platforms that enable government agencies and private developers to build innovative applications.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">5G Networks</h3>
              <p className="text-sm text-gray-600">Ultra-fast wireless connectivity</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Sensor Networks</h3>
              <p className="text-sm text-gray-600">Environmental and infrastructure monitoring</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Data Platforms</h3>
              <p className="text-sm text-gray-600">Cloud-based analytics and storage</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Public Wi-Fi</h3>
              <p className="text-sm text-gray-600">Free internet in public spaces</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Citizen Benefits</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Real-time air quality monitoring protecting public health</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Smart parking systems reducing time spent searching for spots</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Early warning systems for emergencies and natural disasters</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Free public Wi-Fi enabling digital inclusion</span>
            </li>
          </ul>
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
