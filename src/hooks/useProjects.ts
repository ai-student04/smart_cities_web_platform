import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Project, FilterOptions } from '../types';

export function useProjects(filters?: Partial<FilterOptions>) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        let query = supabase
          .from('projects')
          .select(`
            *,
            project_type:project_types(*),
            city:cities(*)
          `);

        if (filters?.projectType) {
          query = query.eq('project_type_id', filters.projectType);
        }

        if (filters?.location) {
          query = query.eq('city_id', filters.location);
        }

        if (filters?.impactLevel) {
          query = query.eq('impact_level', filters.impactLevel);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        let filteredData = data || [];

        if (filters?.searchQuery) {
          const searchLower = filters.searchQuery.toLowerCase();
          filteredData = filteredData.filter(
            (project) =>
              project.title.toLowerCase().includes(searchLower) ||
              project.description.toLowerCase().includes(searchLower) ||
              project.short_description.toLowerCase().includes(searchLower)
          );
        }

        setProjects(filteredData as Project[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [filters?.projectType, filters?.location, filters?.impactLevel, filters?.searchQuery]);

  return { projects, loading, error };
}
