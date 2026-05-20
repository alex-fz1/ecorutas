import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { ManualDidactico } from '../types';

export const useManuales = (nivelEducativo?: string) => {
  const [manuales, setManuales] = useState<ManualDidactico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchManuales = async () => {
      try {
        setLoading(true);
        setError(null);

        // Selección estricta de las columnas necesarias
        let query = supabase
          .from('manuales_didacticos')
          .select('id, titulo, descripcion, archivo_url, portada_url, nivel_educativo, created_at');

        if (nivelEducativo && nivelEducativo !== 'todos') {
          query = query.eq('nivel_educativo', nivelEducativo);
        }

        // Ordenar por fecha de creación más reciente
        const { data, error: supabaseError } = await query.order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;

        if (!cancelled) {
          setManuales(data as ManualDidactico[]);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Error al cargar los manuales didácticos');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchManuales();

    return () => {
      cancelled = true;
    };
  }, [nivelEducativo]);

  return { manuales, loading, error };
};