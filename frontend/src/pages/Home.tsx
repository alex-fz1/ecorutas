import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Map, TreePine, Smartphone, ArrowRight, FlaskConical } from "lucide-react";

const RouteMap = lazy(() =>
  import("../components/maps/RouteMap").then(m => ({ default: m.RouteMap }))
);

const FEATURES = [
  {
    icon: Map,
    title: "Recorridos Virtuales Interactivos",
    desc: "Explora la Senda Ecológica con imágenes panorámicas, videos e información sobre los seres vivos y el ambiente en donde viven.",
  },
  {
    icon: TreePine,
    title: "Conexión con el Ecosistema",
    desc: "Establece una relación profunda con la naturaleza y comprende la importancia de conocer para proteger y conservar nuestros recursos naturales.",
  },
  {
    icon: Smartphone,
    title: "Realidad Aumentada",
    desc: "Visualiza fauna y flora en 3D directamente desde tu dispositivo móvil con nuestros marcadores de Realidad Aumentada.",
  },
];

export function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-verde-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-verde-950 via-verde-900 to-verde-800" />
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #4ade80 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 mb-6 text-xs font-body uppercase tracking-widest text-verde-400 border border-verde-600 rounded-full px-4 py-1.5">
            <FlaskConical size={12} />
            REPSA · UNAM · PAPIME PE400524
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            ¡Descubre la{" "}
            <span className="text-verde-400">Biodiversidad</span>{" "}
            de México!
          </h1>
          <p className="font-body text-lg text-verde-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sumérgete en la Senda Ecológica de la Reserva Ecológica del Pedregal
            de San Ángel y descubre la fascinante fauna y flora que alberga.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/recorridos/seca"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-verde-600 hover:bg-verde-500 text-white font-body font-semibold rounded-full transition-colors shadow-lg"
            >
              Explorar Recorridos
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/acerca-de"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-verde-400 text-verde-300 hover:bg-verde-800 font-body font-semibold rounded-full transition-colors"
            >
              Leer Más
            </Link>
          </div>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────── */}
      <section className="bg-verde-950 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-8">
            Qué Encontrarás en Este Espacio
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video bg-verde-900">
            <video
              className="w-full h-full object-cover"
              controls
              preload="none"
              poster="/media/video-poster.webp"
            >
              <source src="/media/video_prueba.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────── */}
      <section className="bg-verde-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Una Experiencia Híbrida Única
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="bg-verde-800/60 border border-verde-700 rounded-2xl p-8 hover:border-verde-500 hover:bg-verde-800/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-verde-700/60 flex items-center justify-center mb-5">
                  <Icon className="text-verde-400" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <p className="font-body text-verde-200 leading-relaxed text-sm">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mapa Lazy ─────────────────────────────────── */}
      <section className="bg-verde-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-4">
            Ubicación de la REPSA
          </h2>
          <p className="font-body text-verde-300 text-center mb-8 text-sm">
            Reserva Ecológica del Pedregal de San Ángel · Ciudad Universitaria, CDMX
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl h-96 border border-verde-800">
            <Suspense fallback={
              <div className="w-full h-full bg-verde-800 flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-verde-400 border-t-transparent rounded-full animate-spin" />
                <p className="font-body text-verde-300 text-sm">Cargando mapa…</p>
              </div>
            }>
              <RouteMap />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── CTA Biodiversidad ─────────────────────────── */}
      <section className="bg-verde-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Explora la Biodiversidad
          </h2>
          <p className="font-body text-verde-200 mb-8 leading-relaxed">
            Conoce las especies de fauna y flora que habitan en la REPSA,
            con modelos 3D y experiencias de Realidad Aumentada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/biodiversidad/fauna"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-verde-600 hover:bg-verde-500 text-white font-body font-semibold rounded-full transition-colors"
            >
              <Map size={16} />
              Ver Fauna
            </Link>
            <Link
              to="/biodiversidad/flora"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-verde-500 text-verde-300 hover:bg-verde-800 font-body font-semibold rounded-full transition-colors"
            >
              <TreePine size={16} />
              Ver Flora
            </Link>
          </div>
        </div>
      </section>

      {/* ── Banner institucional ──────────────────────── */}
      <section className="bg-verde-950 border-t border-verde-800 py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <FlaskConical size={14} className="text-verde-500" />
          <p className="font-body text-sm text-verde-400 uppercase tracking-widest">
            Proyecto financiado por la DGAPA-UNAM · PAPIME PE400524
          </p>
        </div>
      </section>
    </main>
  );
}