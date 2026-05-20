import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
}

export const useGaleria = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);

        // Listar archivos desde la raíz del bucket ecorutas-media
        const { data, error: storageError } = await supabase
          .storage
          .from('ecorutas-media')
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'desc' }
          });

        if (storageError) throw storageError;

        if (data && !cancelled) {
          // Filtrar subcarpetas vacías o el archivo placeholder .empty si existiera
          const validFiles = data.filter(file => file.name !== '.empty' && file.id);

          const formattedItems: MediaItem[] = validFiles.map(file => {
            // Obtener la URL pública del recurso de forma síncrona
            const { data: { publicUrl } } = supabase
              .storage
              .from('ecorutas-media')
              .getPublicUrl(file.name);

            const isVideo = file.name.toLowerCase().endsWith('.mp4');

            return {
              id: file.id,
              name: file.name,
              url: publicUrl,
              type: isVideo ? 'video' : 'image'
            };
          });

          setItems(formattedItems);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Error al conectar con la galería multimedia');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMedia();

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
};