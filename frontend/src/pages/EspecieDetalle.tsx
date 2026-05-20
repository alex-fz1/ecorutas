import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { Especie } from "../types";

const PLACEHOLDER = "https://placehold.co/800x600/166534/4ade80?text=Sin+imagen";

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-3 border-b border-verde-700 last:border-0">
      <span className="font-body text-sm font-semibold text-verde-400 w-36 flex-shrink-0">
        {label}
      </span>
      <span className="font-body text-sm text-verde-100">{value}</span>
    </div>
  );
}

export function EspecieDetalle() {
  const { grupo, slug } = useParams<{ grupo: string; slug: string }>();
  const [especie, setEspecie] = useState<Especie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("especies")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!cancelled) {
        if (err) setError(err.message);
        else setEspecie(data);
        setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-verde-900 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-verde-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !especie) return (
    <div className="min-h-screen bg-verde-900 flex flex-col items-center justify-center gap-4">
      <p className="font-body text-red-400">No se encontró la especie.</p>
      <Link to={`/biodiversidad/${grupo}`} className="font-body text-verde-400 underline">
        ← Volver
      </Link>
    </div>
  );

  const backLabel = especie.grupo === "fauna" ? "Fauna" : "Flora";
  const backUrl = `/biodiversidad/${especie.grupo}`;

  return (
    <main className="min-h-screen bg-verde-900">
      {/* ── Breadcrumb ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <nav className="font-body text-sm text-verde-400">
          <Link to="/" className="hover:text-verde-300">Inicio</Link>
          <span className="mx-2">›</span>
          <Link to={backUrl} className="hover:text-verde-300">{backLabel}</Link>
          <span className="mx-2">›</span>
          <span className="text-white">{especie.nombre_comun}</span>
        </nav>
      </div>

      <div> className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12" </div>
        {/* ── Columna izquierda: imagen + modelo 3D ── */}
        <div className="space-y-6">
          {/* Imagen principal */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-verde-800">
            <img
              src={especie.imagen_url ?? PLACEHOLDER}
              alt={especie.nombre_comun}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Modelo 3D Sketchfab */}
          {especie.sketchfab_id && (
            <div className="rounded-2xl overflow-hidden bg-verde-800 border border-verde-700">
              <p className="font-body text-xs text-verde-400 px-4 pt-3 pb-1">
                🎲 Modelo 3D interactivo
              </p>
              <div className="aspect-video">
                <iframe
                  title={`Modelo 3D de ${especie.nombre_comun}`}
                  src={`https://sketchfab.com/models/${especie.sketchfab_id}/embed?autostart=1&autospin=0.3&ui_infos=0&ui_controls=1&preload=1`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3">
            {especie.url_ra && (
              <a
                href={especie.url_ra}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-verde-600 hover:bg-verde-500 text-white font-body font-semibold rounded-full transition-colors"
              >
                📱 Visualizar en Realidad Aumentada
              </a>
            )}
            {especie.url_marcador_pdf && (
              <a
                href={especie.url_marcador_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-verde-500 text-verde-300 hover:bg-verde-800 font-body font-semibold rounded-full transition-colors"
              >
                📄 Descargar Marcador RA
              </a>
            )}
          </div>

          {/* ── Columna derecha: información taxonómica ── */}
          <div className="space-y-8">
            {/* Encabezado */}
            <div>
              <p className="font-body text-sm italic text-verde-400 mb-1">
                {especie.nombre_cientifico}
              </p>
              <h1 className="font-display text-4xl font-bold text-white mb-3">
                {especie.nombre_comun}
              </h1>
              <p className="font-body text-verde-200 leading-relaxed">
                {especie.descripcion}
              </p>
            </div>

            {/* Información General */}
            <div className="bg-verde-800/50 border border-verde-700 rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-white mb-4">
                Información General
              </h2>
              <InfoRow label="Nombre común" value={especie.nombre_comun} />
              <InfoRow label="Nombre científico" value={especie.nombre_cientifico} />
              <InfoRow label="Clase" value={especie.clase} />
              <InfoRow label="Orden" value={especie.orden_taxonomico} />
              <InfoRow label="Familia" value={especie.familia} />
              <InfoRow label="Vida media" value={especie.vida_media} />
              <InfoRow label="Tamaño" value={especie.tamano} />
            </div>

            {/* Descripción física */}
            {especie.descripcion_fisica && (
              <div className="bg-verde-800/50 border border-verde-700 rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold text-white mb-3">
                  Descripción Física
                </h2>
                <p className="font-body text-sm text-verde-200 leading-relaxed whitespace-pre-line">
                  {especie.descripcion_fisica}
                </p>
              </div>
            )}

            {/* Hábitat y distribución */}
            {(especie.habitat_detalle || especie.distribucion) && (
              <div className="bg-verde-800/50 border border-verde-700 rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4">
                  Hábitat y Distribución
                </h2>
                {especie.distribucion && (
                  <div className="mb-3">
                    <p className="font-body text-xs font-semibold text-verde-400 uppercase tracking-wider mb-1">
                      Distribución
                    </p>
                    <p className="font-body text-sm text-verde-200 leading-relaxed">
                      {especie.distribucion}
                    </p>
                  </div>
                )}
                {especie.habitat_detalle && (
                  <div>
                    <p className="font-body text-xs font-semibold text-verde-400 uppercase tracking-wider mb-1">
                      Hábitat
                    </p>
                    <p className="font-body text-sm text-verde-200 leading-relaxed">
                      {especie.habitat_detalle}
                    </p>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </main>
  );
}