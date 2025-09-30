import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Statistics } from '../types';

export function useStatistics(category?: string) {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        setLoading(true);
        let query = supabase.from('statistics').select('*');

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setStatistics((data as Statistics[]) || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, [category]);

  return { statistics, loading, error };
}
