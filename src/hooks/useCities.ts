import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { City } from '../types';

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('cities')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;

        setCities((data as City[]) || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cities');
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  return { cities, loading, error };
}
