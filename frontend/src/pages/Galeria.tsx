import React, { useState, useEffect, useCallback } from 'react';
import { useGaleria } from '../hooks/useGaleria';
import type { MediaItem } from '../hooks/useGaleria';
import { Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, AlertTriangle, Eye } from 'lucide-react';

export const GaleriaPage: React.FC = () => {
  const { items, loading, error } = useGaleria();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [filtro, setFiltro] = useState<'todos' | 'imagenes' | 'videos'>('todos');

  // Filtrado local de elementos
  const itemsFiltrados = items.filter(item => {
    if (filtro === 'imagenes') return item.type === 'image';
    if (filtro === 'videos') return item.type === 'video';
    return true;
  });

  // Navegación del Lightbox
  const handlePrev = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx(prev => (prev !== null && prev > 0 ? prev - 1 : itemsFiltrados.length - 1));
  }, [activeIdx, itemsFiltrados.length]);

  const handleNext = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx(prev => (prev !== null && prev < itemsFiltrados.length - 1 ? prev + 1 : 0));
  }, [activeIdx, itemsFiltrados.length]);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  // Captura de eventos del teclado para el Lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, handleClose, handlePrev, handleNext]);

  const activeItem: MediaItem | null = activeIdx !== null ? itemsFiltrados[activeIdx] : null;

  return (
    // CAMBIO: Fondo principal con la paleta idéntica a Flora/Fauna (bg-verde-900)
    <div className="min-h-screen bg-verde-900 text-white px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <header className="max-w-7xl mx-auto text-center mb-12 mt-6">
        {/* CAMBIO: Caja contenedora adaptada a verde translúcido y borde orgánico */}
        <div className="inline-flex items-center justify-center p-3 bg-verde-800/40 rounded-2xl border border-verde-700/50 mb-4 shadow-inner">
          <ImageIcon className="w-8 h-8 text-verde-400" />
        </div>
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-5xl">
          Galería Multimedia REPSA
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-verde-200 font-body leading-relaxed">
          Explora la riqueza ecosistémica de la Reserva del Pedregal de San Ángel a través del registro fotográfico y audiovisual del proyecto EcoRutas UNAM.
        </p>
      </header>

      {/* Filtros de Tipo */}
      <nav className="max-w-7xl mx-auto mb-10" aria-label="Filtros de galería">
        {/* CAMBIO: Línea divisoria en verde suave */}
        <div className="flex flex-wrap justify-center gap-3 border-b border-verde-800/40 pb-6">
          {(['todos', 'imagenes', 'videos'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => {
                handleClose();
                setFiltro(tipo);
              }}
              className={`px-5 py-2.5 rounded-xl font-body text-xs sm:text-sm font-semibold transition-all duration-300 uppercase tracking-wider active:scale-[0.98] ${
                filtro === tipo
                  ? 'bg-verde-600 text-white shadow-md shadow-verde-950/40 border border-verde-500/30'
                  : 'bg-verde-800/40 text-verde-300 hover:text-white hover:bg-verde-800/80 border border-verde-700/50'
              }`}
            >
              {tipo === 'todos' ? 'Todo' : tipo === 'imagenes' ? 'Imágenes' : 'Videos'}
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto">
        {/* Estado: Error */}
        {error && (
          <div className="flex flex-col items-center justify-center p-8 bg-red-950/20 border border-red-900/40 rounded-xl max-w-xl mx-auto text-center backdrop-blur-sm animate-fadeIn">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
            <p className="font-body text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Estado: Cargando (Skeletons en armonía verde) */}
        {loading && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div 
                key={n} 
                className="bg-verde-800/30 rounded-xl border border-verde-700/40 animate-pulse w-full inline-block"
                style={{ height: `${[240, 320, 180, 280, 220][n % 5]}px` }}
              />
            ))}
          </div>
        )}

        {/* Estado: Vacío */}
        {!loading && !error && itemsFiltrados.length === 0 && (
          <div className="text-center py-16 bg-verde-800/20 rounded-2xl border border-verde-700/40 max-w-md mx-auto backdrop-blur-sm animate-fadeIn">
            <ImageIcon className="w-12 h-12 text-verde-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-verde-300 font-display">No se encontraron archivos</h3>
            <p className="text-sm text-verde-400 mt-1.5 font-body px-4">El bucket multimedia se encuentra vacío o no tiene coincidencias para este filtro.</p>
          </div>
        )}

        {/* Grid Masonry */}
        {!loading && !error && itemsFiltrados.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 [column-fill:_balance]">
            {itemsFiltrados.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveIdx(index)}
                className="relative break-inside-avoid bg-verde-800/40 rounded-xl overflow-hidden border border-verde-700/50 group cursor-pointer shadow-lg hover:border-verde-500/60 transition-all duration-300 inline-block w-full"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="relative aspect-video bg-verde-950 w-full h-full flex items-center justify-center overflow-hidden">
                    <video
                      src={item.url}
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-verde-950/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-verde-950/10">
                      <div className="p-3 bg-verde-900/90 rounded-full border border-verde-700/50 text-verde-400 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                        <Video className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay Hover Efecto */}
                <div className="absolute inset-0 bg-gradient-to-t from-verde-950/95 via-verde-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between text-white gap-2">
                    <span className="text-xs font-body font-medium truncate text-verde-100">
                      {item.name}
                    </span>
                    <div className="p-1.5 bg-verde-600/20 border border-verde-500/40 rounded-lg shrink-0">
                      <Eye className="w-3.5 h-3.5 text-verde-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {activeIdx !== null && activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-verde-950/95 backdrop-blur-md select-none animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Botón Cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-50 p-2.5 bg-verde-900/80 text-verde-300 hover:text-white rounded-full border border-verde-800 transition-colors active:scale-95"
            aria-label="Cerrar vista"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Botón Anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-6 p-2.5 sm:p-3 bg-verde-900/60 text-verde-300 hover:text-white rounded-full border border-verde-800/40 hover:bg-verde-800 transition-all z-40 active:scale-95"
            aria-label="Elemento anterior"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Botón Siguiente */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-6 p-2.5 sm:p-3 bg-verde-900/60 text-verde-300 hover:text-white rounded-full border border-verde-800/40 hover:bg-verde-800 transition-all z-40 active:scale-95"
            aria-label="Siguiente elemento"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Contenedor del Recurso */}
          <div className="w-full max-w-5xl max-h-[85vh] px-4 flex flex-col items-center justify-center">
            <div className="relative max-w-full max-h-[75vh] flex items-center justify-center">
              {activeItem.type === 'image' ? (
                <img
                  src={activeItem.url}
                  alt={activeItem.name}
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-verde-800/30 animate-scaleUp"
                />
              ) : (
                <video
                  src={activeItem.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[75vh] rounded-xl shadow-2xl outline-none border border-verde-950"
                />
              )}
            </div>
            {/* Pie de foto en Lightbox */}
            <p className="mt-4 text-xs sm:text-sm text-verde-300 font-body text-center truncate max-w-2xl px-4">
              {activeItem.name} <span className="text-verde-700 mx-1.5">•</span> ({activeIdx + 1} de {itemsFiltrados.length})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};