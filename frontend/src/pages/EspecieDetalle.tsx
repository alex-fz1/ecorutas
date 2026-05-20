import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { Especie } from "../types";
import { 
  CubeIcon, 
  ArrowLeftIcon, 
  QrCodeIcon, 
  DocumentArrowDownIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

const PLACEHOLDER = "https://placehold.co/800x600/166534/4ade80?text=Sin+imagen";

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 py-3 border-b border-verde-700 last:border-0">
      <span className="font-body text-xs md:text-sm font-semibold text-verde-400 w-full sm:w-36 shrink-0">
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
        setEspecie(data);
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
    <div className="min-h-screen bg-verde-900 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-body text-red-400">No se encontró la especie especificada.</p>
      <Link to={`/biodiversidad/${grupo || "fauna"}`} className="font-body text-sm text-verde-400 inline-flex items-center gap-2 hover:underline">
        <ArrowLeftIcon className="w-4 h-4" /> Volver al catálogo
      </Link>
    </div>
  );

  const backLabel = especie.grupo === "fauna" ? "Fauna" : "Flora";
  const backUrl = `/biodiversidad/${especie.grupo}`;

  return (
    <main className="min-h-screen bg-verde-900 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        <Link 
          to={backUrl} 
          className="inline-flex items-center gap-2 text-sm font-body font-medium text-verde-400 hover:text-white transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Volver a {backLabel}</span>
        </Link>
      </div>

      {/* ── Contenedor Principal en Grid de 2 Columnas ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* ── COLUMNA IZQUIERDA: Multimedia ── */}
        <div className="space-y-6">
          {/* Imagen principal */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-verde-800 shadow-xl border border-verde-700/50">
            <img
              src={especie.imagen_url ?? PLACEHOLDER}
              alt={especie.nombre_comun}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Modelo 3D Sketchfab */}
          {especie.sketchfab_id && (
            <div className="rounded-2xl overflow-hidden bg-verde-800 border border-verde-700 shadow-lg">
              <div className="font-body text-xs text-verde-300 px-4 pt-3 pb-2 flex items-center gap-1.5 border-b border-verde-700/50">
                <CubeIcon className="w-4 h-4 text-verde-400 animate-pulse" />
                <span>Modelo 3D interactivo</span>
              </div>
              <div className="aspect-video w-full bg-verde-950">
                <iframe
                  title={`Modelo 3D de ${especie.nombre_comun}`}
                  src={`https://sketchfab.com/models/${especie.sketchfab_id}/embed?autostart=0&autospin=0.2&ui_infos=0&ui_controls=1&preload=1`}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Botones de acción Interactivos */}
          <div className="flex flex-col sm:flex-row gap-3">
            {especie.url_ra && (
              <a
                href={especie.url_ra}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-verde-600 hover:bg-verde-500 text-white font-body font-bold text-sm rounded-full transition-all shadow-md active:scale-[0.98]"
              >
                <QrCodeIcon className="w-5 h-5" />
                Realidad Aumentada
              </a>
            )}
            {especie.url_marcador_pdf && (
              <a
                href={especie.url_marcador_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-verde-600 text-verde-300 hover:bg-verde-800 hover:text-white font-body font-semibold text-sm rounded-full transition-all active:scale-[0.98]"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Descargar Marcador
              </a>
            )}
          </div>
        </div>

        {/* ── COLUMNA DERECHA: Taxonomía e Información ── */}
        <div className="space-y-8">
          {/* Títulos Principales (Manteniendo estricto color blanco) */}
          <div>
            <p className="font-body text-sm italic text-verde-400 mb-1 font-medium tracking-wide">
              {especie.nombre_cientifico}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
              {especie.nombre_comun}
            </h1>
            <p className="font-body text-sm md:text-base text-verde-200 leading-relaxed bg-verde-800/20 p-4 rounded-xl border border-verde-800/40">
              {especie.descripcion}
            </p>
          </div>

          {/* Ficha General */}
          <div className="bg-verde-800/40 border border-verde-700/70 rounded-2xl p-5 md:p-6 shadow-md">
            <h2 className="font-display text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-verde-700/50 pb-2">
              <InformationCircleIcon className="w-5 h-5 text-verde-400" />
              Información General
            </h2>
            <div className="divide-y divide-verde-700/50">
              <InfoRow label="Nombre común" value={especie.nombre_comun} />
              <InfoRow label="Nombre científico" value={especie.nombre_cientifico} />
              <InfoRow label="Clase" value={especie.clase} />
              <InfoRow label="Orden" value={especie.orden_taxonomico} />
              <InfoRow label="Familia" value={especie.familia} />
              <InfoRow label="Vida media" value={especie.vida_media} />
              <InfoRow label="Tamaño" value={especie.tamano} />
            </div>
          </div>

          {/* Descripción física */}
          {especie.descripcion_fisica && (
            <div className="bg-verde-800/40 border border-verde-700/70 rounded-2xl p-5 md:p-6 shadow-md">
              <h2 className="font-display text-base md:text-lg font-bold text-white mb-3">
                Descripción Física
              </h2>
              <p className="font-body text-sm text-verde-200 leading-relaxed whitespace-pre-line">
                {especie.descripcion_fisica}
              </p>
            </div>
          )}

          {/* Hábitat y distribución */}
          {(especie.habitat_detalle || especie.distribucion) && (
            <div className="bg-verde-800/40 border border-verde-700/70 rounded-2xl p-5 md:p-6 shadow-md space-y-4">
              <h2 className="font-display text-base md:text-lg font-bold text-white border-b border-verde-700/50 pb-2">
                Hábitat y Distribución
              </h2>
              {especie.distribucion && (
                <div>
                  <p className="font-body text-xs font-bold text-verde-400 uppercase tracking-wider mb-1">
                    Distribución
                  </p>
                  <p className="font-body text-sm text-verde-200 leading-relaxed">
                    {especie.distribucion}
                  </p>
                </div>
              )}
              {especie.habitat_detalle && (
                <div>
                  <p className="font-body text-xs font-bold text-verde-400 uppercase tracking-wider mb-1">
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