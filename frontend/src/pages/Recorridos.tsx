import { useParams, Link } from "react-router-dom";
import { useRecorridos } from "../hooks/useRecorridos";
import type { Recorrido, Temporada } from "../types";
import { clsx } from "clsx";
import { Sun, CloudRain, Moon, Clock, MapPin, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TemporadaConfig {
  label: string;
  Icono: LucideIcon; 
  descripcion: string;
  color: string;
}

const TEMPORADA_META: Record<Temporada, TemporadaConfig> = {
  seca: {
    label: "Época de Secas",
    Icono: Sun,
    descripcion:
      "Recorre la Senda Ecológica durante la época de secas y descubre la flora y fauna que se adapta a las condiciones áridas del Pedregal.",
    color: "from-amber-900/60 to-verde-900",
  },
  lluvias: {
    label: "Época de Lluvias",
    Icono: CloudRain,
    descripcion:
      "Las lluvias transforman la Reserva: los arroyos cobran vida, el verde explota y la biodiversidad alcanza su punto máximo de actividad.",
    color: "from-blue-900/60 to-verde-900",
  },
  especial: {
    label: "Recorridos Especiales",
    Icono: Moon,
    descripcion:
      "Experiencias únicas diseñadas para grupos especiales: recorridos nocturnos, astronómicos y temáticos en la REPSA-UNAM.",
    color: "from-purple-900/60 to-verde-900",
  },
};

const DIFICULTAD_COLOR = {
  facil: "bg-green-700/50  text-green-300",
  moderado: "bg-yellow-700/50 text-yellow-300",
  dificil: "bg-red-700/50    text-red-300",
};

function RecorridoCard({ recorrido }: { recorrido: Recorrido }) {
  const PLACEHOLDER =
    "https://placehold.co/600x400/166534/4ade80?text=Sin+imagen";

  return (
    <article className="bg-verde-800/50 border border-verde-700 rounded-2xl overflow-hidden hover:border-verde-400 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Imagen */}
      <div className="aspect-video overflow-hidden bg-verde-900">
        <img
          src={recorrido.imagen_url ?? PLACEHOLDER}
          alt={recorrido.nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span
            className={clsx(
              "text-xs font-body px-2 py-1 rounded-full capitalize",
              DIFICULTAD_COLOR[recorrido.dificultad]
            )}
          >
            {recorrido.dificultad}
          </span>
          <span className="text-xs font-body text-verde-400 flex items-center gap-1">
            <Clock size={14} /> {recorrido.duracion_min} min
          </span>
          <span className="text-xs font-body text-verde-400 flex items-center gap-1">
            <MapPin size={14} /> {recorrido.distancia_km} km
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-2">
          {recorrido.nombre}
        </h3>
        <p className="font-body text-sm text-verde-200 leading-relaxed flex-1">
          {recorrido.descripcion}
        </p>

        {/* CTA */}
        {recorrido.tour_virtual_url && (
          <a
            href={recorrido.tour_virtual_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-verde-600 hover:bg-verde-500 text-white font-body font-semibold text-sm rounded-full transition-colors"
          >
            <Compass size={16} /> Tour Virtual 360°
          </a>
        )}
      </div>
    </article>
  );
}

export function Recorridos() {
  const { temporada: paramRaw } = useParams<{ temporada: string }>();

  const temporada: Temporada = 
    paramRaw === "lluvias" || paramRaw === "lluvia" 
      ? "lluvias" 
      : paramRaw === "especial" || paramRaw === "especiales"
      ? "especial"
      : "seca";

  const meta = TEMPORADA_META[temporada] ?? TEMPORADA_META.seca;
  const { data: recorridos = [], loading, error } = useRecorridos(temporada);

  const HeroIcon = meta.Icono;

  return (
    <main className="min-h-screen bg-verde-900">
      {/* ── Hero de sección ────────────────────────── */}
      <section className={clsx("bg-gradient-to-b py-20 px-6 text-center", meta.color)}>
        <div className="flex justify-center mb-4">
          <HeroIcon className="text-white animate-pulse" size={48} />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          {meta.label}
        </h1>
        <p className="font-body text-verde-200 max-w-2xl mx-auto leading-relaxed">
          {meta.descripcion}
        </p>
      </section>

      {/* ── Tabs de temporada ──────────────────────── */}
      <nav className="bg-verde-950/80 backdrop-blur-sm sticky top-16 z-40 border-b border-verde-800">
        <div className="max-w-5xl mx-auto px-6 flex gap-2 py-2 overflow-x-auto">
          {(Object.keys(TEMPORADA_META) as Temporada[]).map(t => {
            const TabIcon = TEMPORADA_META[t].Icono;
            return (
              <Link
                key={t}
                to={`/recorridos/${t}`}
                className={clsx(
                  "flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-full text-sm font-body font-medium transition-colors whitespace-nowrap",
                  temporada === t
                    ? "bg-verde-600 text-white"
                    : "text-verde-300 hover:bg-verde-800 hover:text-white"
                )}
              >
                <TabIcon size={16} />
                {TEMPORADA_META[t].label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Descripción larga de la sección ───────── */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          La Senda Ecológica
        </h2>
        <p className="font-body text-verde-200 leading-relaxed">
          Dentro de la REPSA se cuenta con la Senda Ecológica, un espacio ideal
          para la educación ambiental y la recreación. A lo largo de sus
          senderos, el visitante encuentra una gran variedad de flora y fauna,
          desde imponentes árboles centenarios hasta diminutas criaturas que
          habitan en el suelo del ecosistema.
        </p>
      </section>

      {/* ── Grid de recorridos ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-verde-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="font-body text-red-400">
              Error al cargar los recorridos: {error}
            </p>
          </div>
        )}

        {!loading && !error && recorridos.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-verde-400 text-lg">
              No hay recorridos disponibles para esta temporada aún.
            </p>
            <p className="font-body text-verde-500 text-sm mt-2">
              Pronto agregaremos más contenido.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recorridos.map(r => (
            <RecorridoCard key={r.id} recorrido={r} />
          ))}
        </div>
      </section>
    </main>
  );
}