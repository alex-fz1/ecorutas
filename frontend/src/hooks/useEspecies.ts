import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Especie, TaxonGroup } from "../types";

export function useEspecies(grupo?: TaxonGroup) {
  const [data,    setData]    = useState<Especie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);

      let query = supabase
        .from("especies")
        .select("*")
        .order("nombre_comun");

      if (grupo) query = query.eq("grupo", grupo);

      const { data: rows, error: err } = await query;

      if (!cancelled) {
        if (err) setError(err.message);
        else setData((rows ?? []) as Especie[]);
        setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [grupo]);

  return { data, loading, error };
}