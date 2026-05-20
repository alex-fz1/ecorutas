import { useState } from "react";
import { useEspecies } from "../hooks/useEspecies";
import { SpeciesCard } from "../components/ui/SpeciesCard";

export function BiodiversidadFlora() {
  const { data: especies, loading, error } = useEspecies("flora");
  const [busqueda, setBusqueda] = useState("");

  const filtradas = especies.filter(e =>
    e.nombre_comun.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.nombre_cientifico.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-verde-900">
      <section className="bg-gradient-to-b from-green-900/60 to-verde-900 py-20 px-6 text-center">
        <span className="text-5xl mb-4 block">🌵</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          Flora de la REPSA
        </h1>
        <p className="font-body text-verde-200 max-w-2xl mx-auto leading-relaxed">
          Descubre las plantas que conforman el ecosistema único del Pedregal de
          San Ángel, adaptadas a crecer en suelos volcánicos.
        </p>
      </section>

      <div className="max-w-xl mx-auto px-6 -mt-6 relative z-10">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-verde-400">🔍</span>
          <input
            type="search"
            placeholder="Buscar por nombre común o científico…"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-verde-800 border border-verde-600 rounded-full font-body text-white placeholder-verde-400 focus:outline-none focus:border-verde-400 transition-colors"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-4">
        <p className="font-body text-sm text-verde-400">
          {loading ? "Cargando…" : `${filtradas.length} especies encontradas`}
        </p>
      </div>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-verde-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <p className="text-center py-20 font-body text-red-400">Error: {error}</p>
        )}
        {!loading && filtradas.length === 0 && (
          <p className="text-center py-20 font-body text-verde-400 text-lg">
            No se encontraron especies con "{busqueda}"
          </p>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtradas.map(e => (
            <SpeciesCard key={e.id} especie={e} baseUrl="/biodiversidad/flora" />
          ))}
        </div>
      </section>
    </main>
  );
}