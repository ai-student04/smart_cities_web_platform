import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useCities } from '../hooks/useCities';
import { useProjectTypes } from '../hooks/useProjectTypes';
import { FilterOptions } from '../types';

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const { cities } = useCities();
  const { projectTypes } = useProjectTypes();

  const [searchQuery, setSearchQuery] = useState('');
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [impactLevel, setImpactLevel] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        searchQuery,
        projectType,
        location,
        impactLevel,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, projectType, location, impactLevel, onFilterChange]);

  const clearFilters = () => {
    setSearchQuery('');
    setProjectType('');
    setLocation('');
    setImpactLevel('');
  };

  const hasActiveFilters = searchQuery || projectType || location || impactLevel;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Projects
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search projects by keywords"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
              Project Type
            </label>
            <select
              id="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Filter by project type"
            >
              <option value="">All Types</option>
              {projectTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Filter by location"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="impactLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Impact Level
            </label>
            <select
              id="impactLevel"
              value={impactLevel}
              onChange={(e) => setImpactLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Filter by impact level"
            >
              <option value="">All Levels</option>
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-3 py-1"
              aria-label="Clear all filters"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>Clear Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
