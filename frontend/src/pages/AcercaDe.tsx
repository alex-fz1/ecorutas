import { ShieldCheckIcon, MapIcon, BeakerIcon } from "@heroicons/react/24/outline";

export function AcercaDe() {
  return (
    <main className="min-h-screen bg-verde-900 text-white">
      {/* Sección Titular */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
          Sobre el Proyecto <span className="text-verde-400">Ecorut@s</span>
        </h1>
        <p className="font-body text-lg text-verde-200 mt-4 max-w-3xl mx-auto leading-relaxed">
          Ecorut@s es una plataforma interactiva diseñada para la divulgación científica y educación ambiental dentro de la **REPSA** (Reserva Ecológica del Pedregal de San Ángel de la UNAM).
        </p>
      </section>

      {/* Tarjetas de Objetivos Específicos */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-8">
        <div className="bg-verde-400/10 border border-verde-700 p-6 rounded-2xl text-center">
          <div className="mx-auto w-12 h-12 bg-white-500/10 text-white-400 rounded-xl flex items-center justify-center mb-4 border border-white-500/20">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Preservación</h3>
          <p className="font-body text-sm text-verde-200 mt-2">
            Fomentar el respeto al ecosistema nativo reduciendo el impacto antropogénico (daño causado por humanos) en las zonas de reserva.
          </p>
        </div>

        <div className="bg-verde-400/10 border border-verde-700 p-6 rounded-2xl text-center">
          <div className="mx-auto w-12 h-12 bg-verde-400/10 text-white-400 rounded-xl flex items-center justify-center mb-4 border border-white-400/20">
            <MapIcon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Guiado Inteligente</h3>
          <p className="font-body text-sm text-verde-200 mt-2">
            Proporcionar senderos digitales auto-guiados adaptados a las condiciones de las temporadas de secas y lluvias.
          </p>
        </div>

        <div className="bg-verde-400/10 border border-verde-700 p-6 rounded-2xl text-center">
          <div className="mx-auto w-12 h-12 bg-white-500/10 text-white-400 rounded-xl flex items-center justify-center mb-4 border border-white-500/20">
            <BeakerIcon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Ciencia Abierta</h3>
          <p className="font-body text-sm text-verde-200 mt-2">
            Acercar la base de datos taxonómica de la flora y fauna universitaria a los estudiantes mediante tecnologías inmersivas.
          </p>
        </div>
      </section>

      {/* Grid de Datos del Ecosistema de la REPSA */}
      <section className="bg-verde-950/60 border-t border-b border-verde-800 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 text-center">
          <div>
            <p className="font-display text-5xl font-black text-white-400">237.3</p>
            <p className="font-body text-sm uppercase tracking-widest text-verde-300 mt-1">Hectáreas Protegidas</p>
          </div>
          <div className="w-px h-12 bg-verde-800 hidden md:block" />
          <div>
            <p className="font-display text-5xl font-black text-white-400">+1,500</p>
            <p className="font-body text-sm uppercase tracking-widest text-verde-300 mt-1">Especies Nativas</p>
          </div>
          <div className="w-px h-12 bg-verde-800 hidden md:block" />
          <div>
            <p className="font-display text-5xl font-black text-white-400">1983</p>
            <p className="font-body text-sm uppercase tracking-widest text-verde-300 mt-1">Año de Fundación</p>
          </div>
        </div>
      </section>
    </main>
  );
}