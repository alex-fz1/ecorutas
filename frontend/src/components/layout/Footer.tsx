import { Link } from "react-router-dom";
import { Leaf, ExternalLink, MapPin, FlaskConical } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-verde-950 border-t border-verde-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Marca */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="text-verde-400" size={22} />
            <span className="font-display text-xl font-bold text-white">Ecorut@s</span>
          </div>
          <p className="font-body text-sm text-verde-300 leading-relaxed max-w-xs">
            Portal dedicado a la biodiversidad de la Senda Ecológica de la
            Reserva Ecológica del Pedregal de San Ángel, UNAM.
          </p>
          <div className="flex items-center gap-1 mt-4 text-xs font-body text-verde-500">
            <MapPin size={12} />
            <span>Ciudad de México, México</span>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="font-body text-xs font-semibold text-verde-400 uppercase tracking-widest mb-4">
            Secciones
          </h3>
          <ul className="space-y-2">
            {[
              { to: "/recorridos/seca",      label: "Época de Secas"    },
              { to: "/recorridos/lluvias",   label: "Época de Lluvias"  },
              { to: "/recorridos/especiales",label: "Recorridos Especiales" },
              { to: "/biodiversidad/fauna",  label: "Fauna"             },
              { to: "/biodiversidad/flora",  label: "Flora"             },
              { to: "/galeria",              label: "Galería en RA"     },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="font-body text-sm text-verde-300 hover:text-verde-100 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info institucional */}
        <div>
          <h3 className="font-body text-xs font-semibold text-verde-400 uppercase tracking-widest mb-4">
            Institución
          </h3>
          <ul className="space-y-2">
            {[
              { to: "/manuales",  label: "Manuales Didácticos" },
              { to: "/acerca-de", label: "Acerca de"           },
              { to: "/creditos",  label: "Créditos"            },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="font-body text-sm text-verde-300 hover:text-verde-100 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.telematica.icat.unam.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-verde-300 hover:text-verde-100 transition-colors inline-flex items-center gap-1"
              >
                ICAT UNAM
                <ExternalLink size={11} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-verde-800 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FlaskConical size={14} className="text-verde-500" />
            <p className="font-body text-xs text-verde-500">
              Proyecto financiado por DGAPA-UNAM · PAPIME PE400524
            </p>
          </div>
          <p className="font-body text-xs text-verde-600">
            Instituto de Ciencias Aplicadas y Tecnología, UNAM · Derechos Reservados ©
          </p>
        </div>
      </div>
    </footer>
  );
}