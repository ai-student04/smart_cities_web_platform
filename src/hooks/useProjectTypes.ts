import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectType } from '../types';

export function useProjectTypes() {
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjectTypes() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('project_types')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;

        setProjectTypes((data as ProjectType[]) || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project types');
      } finally {
        setLoading(false);
      }
    }

    fetchProjectTypes();
  }, []);

  return { projectTypes, loading, error };
}
