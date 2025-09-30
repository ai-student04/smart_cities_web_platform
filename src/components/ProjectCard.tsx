import { MapPin, Calendar, TrendingUp, Users } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const impactColors = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const statusColors = {
    completed: 'bg-green-50 text-green-700',
    active: 'bg-blue-50 text-blue-700',
    planning: 'bg-gray-50 text-gray-700',
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {project.image_url && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
            {project.project_type && (
              <p className="text-sm text-gray-600">{project.project_type.name}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              impactColors[project.impact_level]
            }`}
            aria-label={`Impact level: ${project.impact_level}`}
          >
            {project.impact_level.charAt(0).toUpperCase() + project.impact_level.slice(1)}
          </span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{project.short_description}</p>

        <div className="space-y-2 mb-4">
          {project.city && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
              <span>{project.city.name}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
            <span>
              Started: {new Date(project.start_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
              })}
            </span>
          </div>
          {project.partners.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
              <span>{project.partners.length} Partners</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${statusColors[project.status]}`}
            aria-label={`Status: ${project.status}`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          {Object.keys(project.outcomes).length > 0 && (
            <button
              className="text-sm text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
              aria-label={`View outcomes for ${project.title}`}
            >
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                <span>View Outcomes</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
