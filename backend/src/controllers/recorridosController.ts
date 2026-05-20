import type { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { temporada } = req.query;

    let query = supabase
      .from("recorridos")
      .select("id, nombre, descripcion, temporada, duracion_min, dificultad, distancia_km, imagen_url")
      .order("nombre");

    if (temporada) query = query.eq("temporada", temporada as string);

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { data, error } = await supabase
      .from("recorridos")
      .select("*, paradas(*)")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;
    if (!data)  return res.status(404).json({ message: "Recorrido no encontrado" });

    res.json(data);
  } catch (err) {
    next(err);
  }
}