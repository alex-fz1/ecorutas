import { Link } from "react-router-dom";
import type { Especie } from "../../types";

interface Props {
  especie: Especie;
  baseUrl: string; // "/biodiversidad/fauna" | "/biodiversidad/flora"
}

const PLACEHOLDER =
  "https://placehold.co/400x300/166534/4ade80?text=Sin+imagen";

export function SpeciesCard({ especie, baseUrl }: Props) {
  return (
    <Link
      to={`${baseUrl}/${especie.slug}`}
      className="group block bg-verde-800/50 border border-verde-700 rounded-2xl overflow-hidden hover:border-verde-400 hover:shadow-lg hover:shadow-verde-900/50 transition-all duration-300"
    >
      {/* Imagen */}
      <div className="aspect-[4/3] overflow-hidden bg-verde-900">
        <img
          src={especie.imagen_url ?? PLACEHOLDER}
          alt={especie.nombre_comun}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-body text-xs text-verde-400 italic mb-1">
          {especie.nombre_cientifico}
        </p>
        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-verde-300 transition-colors">
          {especie.nombre_comun}
        </h3>
        <p className="font-body text-sm text-verde-200 line-clamp-2 leading-relaxed">
          {especie.descripcion}
        </p>

        {/* Badges */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {especie.sketchfab_id && (
            <span className="text-xs font-body bg-verde-700/60 text-verde-300 px-2 py-1 rounded-full">
              🎲 Modelo 3D
            </span>
          )}
          {especie.url_ra && (
            <span className="text-xs font-body bg-tierra-700/60 text-tierra-300 px-2 py-1 rounded-full">
              📱 Realidad Aumentada
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}