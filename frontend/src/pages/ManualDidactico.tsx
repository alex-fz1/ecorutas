import { ArrowDownTrayIcon, BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const MANUALES = [
  {
    titulo: "Guía de Campo: Aves del Pedregal",
    descripcion: "Identifica las especies residentes y migratorias más comunes de la REPSA mediante ilustraciones y registros de canto.",
    paginas: 24,
    peso: "4.2 MB",
    categoria: "Guía Visual",
  },
  {
    titulo: "Cuaderno de Actividades Didácticas",
    descripcion: "Diseñado para profesores de bachillerato y licenciatura. Actividades prácticas de campo enfocadas en ecosistemas de lava.",
    paginas: 48,
    peso: "8.7 MB",
    categoria: "Docencia",
  },
  {
    titulo: "Manual de Reforestación Sostenible",
    descripcion: "Lineamientos técnicos para la conservación de la flora nativa y erradicación de especies exóticas invasoras.",
    paginas: 16,
    peso: "2.1 MB",
    categoria: "Técnico",
  },
];

export function ManualesDidacticos() {
  return (
    <main className="min-h-screen bg-verde-900 text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex p-3 bg-verde-800 rounded-2xl text-verde-400 mb-4 border border-verde-700">
          <BookOpenIcon className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl font-extrabold">Manuales Didácticos</h1>
        <p className="font-body text-verde-200 max-w-2xl mx-auto mt-3">
          Materiales educativos gratuitos desarrollados por especialistas para profundizar en el estudio ecológico de la zona protegida.
        </p>
      </section>

      {/* Grid de Descargas */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MANUALES.map((manual, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-b from-verde-800/80 to-verde-800/30 rounded-2xl border border-verde-700 p-6 flex flex-col justify-between hover:border-verde-500 transition-all group hover:shadow-xl"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold font-body px-2.5 py-1 bg-verde-950 text-white-300 rounded-md border border-verde-700">
                  {manual.categoria}
                </span>
                <span className="text-xs font-body text-verde-400">
                  {manual.paginas} pág. • {manual.peso}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-verde-300 transition-colors">
                {manual.titulo}
              </h3>
              <p className="font-body text-sm text-verde-200 mt-2 leading-relaxed">
                {manual.descripcion}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-verde-700/60 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-verde-300 font-body">
                <AcademicCapIcon className="w-4 h-4 text-verde-400" />
                Material UNAM
              </span>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-verde-400 hover:bg-verde-300 text-verde-950 font-bold font-body text-xs py-2 px-4 rounded-lg transition-colors shadow-md"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Descargar PDF
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}