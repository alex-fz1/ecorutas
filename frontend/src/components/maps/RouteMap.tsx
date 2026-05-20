import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function RouteMap() {
  // Referencia al contenedor HTML div
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Referencia mutable para guardar la instancia real del mapa de Leaflet
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Si no encuentra el elemento del DOM, no hace nada
    if (!mapContainerRef.current) return;

    // 1. SOLUCIÓN AL PARPADEO: Si ya existía una instancia activa del mapa, la destruimos por completo
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // 2. Inicialización segura del mapa
    // Ajusta las coordenadas [latitud, longitud] y el zoom (15) según tu proyecto de la REPSA
    mapInstanceRef.current = L.map(mapContainerRef.current).setView([19.3189, -99.1843], 15);

    // 3. Agregamos la capa de diseño de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    // 4. LIMPIEZA OBLIGATORIA DE REACT:
    // Esta función se ejecuta automáticamente cuando el usuario cambia de página o la app se refresca
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // El array vacío asegura que esto corra solo al montar el componente

  // Retornamos el contenedor con una altura fija para que Leaflet pueda pintarse
  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-[400px] rounded-xl shadow-md border border-verde-700 z-10" 
    />
  );
}