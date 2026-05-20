import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Recorrido, Temporada } from "../types";

export function useRecorridos(temporada?: Temporada) {
  const [data,    setData]    = useState<Recorrido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("recorridos")
        .select("id, nombre, descripcion, temporada, duracion_min, dificultad, distancia_km, imagen_url, coordenadas, created_at")
        .order("nombre");

      if (temporada) query = query.eq("temporada", temporada);

      const { data: rows, error: err } = await query;

      if (!cancelled) {
        if (err) setError(err.message);
        else {
          const list = Array.isArray(rows) ? rows : [];
          setData(
            list.map((r: any) => ({
              id: r.id,
              nombre: r.nombre,
              descripcion: r.descripcion,
              temporada: r.temporada,
              duracion_min: r.duracion_min,
              dificultad: r.dificultad,
              distancia_km: r.distancia_km,
              imagen_url: r.imagen_url,
              coordenadas: r.coordenadas,
              created_at: r.created_at,
              // Fill missing optional fields expected by Recorrido
              descripcion_larga: r.descripcion_larga ?? "",
              tour_virtual_url: r.tour_virtual_url ?? null,
            }))
          );
        }
        setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [temporada]);

  return { data, loading, error };
}