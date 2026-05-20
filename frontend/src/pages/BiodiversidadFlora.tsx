import { useState, useMemo } from "react";
import { useEspecies } from "../hooks/useEspecies";
import { SpeciesCard } from "../components/ui/SpeciesCard";
import { MagnifyingGlassIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function PlantIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3a9 9 0 0 0-9 9m9-9a9 9 0 0 1 9 9M3 12h18M3 12a9 9 0 0 0 9 9m-9-9a9 9 0 0 1 9 9" />
    </svg>
  );
}

export function BiodiversidadFlora() {
  const { data: especies = [], loading, error } = useEspecies("flora");
  const [busqueda, setBusqueda] = useState("");

  const filtradas = useMemo(() => {
    if (!busqueda.trim()) return especies;
    const termino = busqueda.toLowerCase();
    return especies.filter(e =>
      e.nombre_comun?.toLowerCase().includes(termino) ||
      e.nombre_cientifico?.toLowerCase().includes(termino)
    );
  }, [especies, busqueda]);

  return (
    <main className="min-h-screen bg-verde-900 text-white">
      {/* ── Encabezado de Flora ─────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-verde-800/40 to-verde-900 py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="inline-flex p-3 bg-verde-800/80 rounded-2xl text-verde-400 mb-4 border border-verde-700 shadow-md">
          <PlantIcon className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Flora de la REPSA
        </h1>
        <p className="font-body text-sm md:text-base text-verde-200 max-w-2xl mx-auto leading-relaxed px-2">
          Explora la diversidad vegetal endémica del Pedregal de San Ángel. 
          Consulta la colección botánica disponible y adaptada a la roca volcánica.
        </p>
      </section>

      {/* ── Buscador Responsivo ─────────────────────────────────────── */}
      <div className="max-w-xl mx-auto px-6 -mt-6 relative z-10">
        <div className="relative shadow-2xl rounded-full">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-verde-400" />
          <input
            type="search"
            placeholder="Buscar vegetación por nombre común o científico…"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-verde-800 border border-verde-700 rounded-full font-body text-sm md:text-base text-white placeholder-verde-400 focus:outline-none focus:border-verde-400 transition-colors"
          />
        </div>
      </div>

      {/* ── Barra de Estado Superior ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="font-body text-xs md:text-sm text-verde-300">
          {loading ? "Accediendo al herbario digital..." : `${filtradas.length} ejemplares botánicos listos`}
        </p>
      </div>

      {/* ── Grid Dinámico y Optimizado ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {loading && (
          <div className="flex flex-col justify-center items-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-verde-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-body text-verde-400">Analizando flora...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 justify-center py-16 px-4 max-w-md mx-auto text-center font-body text-red-400 bg-red-950/20 border border-red-900/40 rounded-xl">
            <ExclamationTriangleIcon className="w-6 h-6 shrink-0" />
            <p className="text-sm">Error en la base de datos de flora: {error}</p>
          </div>
        )}

        {!loading && filtradas.length === 0 && (
          <div className="text-center py-20 border border-dashed border-verde-800 rounded-2xl bg-verde-850/10">
            <p className="font-body text-verde-300 text-sm md:text-base">
              No se encontraron registros botánicos con la palabra "{busqueda}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtradas.map(planta => (
            <SpeciesCard 
              key={planta.id} 
              especie={planta} 
              baseUrl="/biodiversidad/flora" 
            />
          ))}
        </div>
      </section>
    </main>
  );
}