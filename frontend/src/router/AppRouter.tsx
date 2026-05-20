import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Home } from "../pages/Home";

// 2. RUTAS CORREGIDAS: Apuntan a la carpeta física real "pages" en minúsculas
const Recorridos = lazy(() => import("../pages/Recorridos").then(m => ({ default: m.Recorridos })));
const BiodiversidadFauna = lazy(() => import("../pages/BiodiversidadFauna").then(m => ({ default: m.BiodiversidadFauna })));
const BiodiversidadFlora = lazy(() => import("../pages/BiodiversidadFlora").then(m => ({ default: m.BiodiversidadFlora })));
const EspecieDetalle = lazy(() => import("../pages/EspecieDetalle").then(m => ({ default: m.EspecieDetalle })));
const Galeria = lazy(() => import("../pages/Galeria").then(m => ({ default: m.Galeria })));
const ManualDidactico = lazy(() => import("../pages/ManualDidactico").then(m => ({ default: m.ManualDidactico })));
const AcercaDe = lazy(() => import("../pages/AcercaDe").then(m => ({ default: m.AcercaDe })));
const Creditos = lazy(() => import("../pages/Creditos").then(m => ({ default: m.Creditos })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-verde-900 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-verde-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Página principal */}
              <Route path="/" element={<Home />} />

              {/* Recorridos */}
              <Route path="/recorridos" element={<Navigate to="/recorridos/seca" replace />} />
              <Route path="/recorridos/:temporada" element={<Recorridos />} />

              {/* Biodiversidad */}
              <Route path="/biodiversidad/fauna" element={<BiodiversidadFauna />} />
              <Route path="/biodiversidad/flora" element={<BiodiversidadFlora />} />
              <Route path="/biodiversidad/fauna/:slug" element={<EspecieDetalle />} />
              <Route path="/biodiversidad/flora/:slug" element={<EspecieDetalle />} />

              {/* Otras secciones */}
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/manuales" element={<ManualDidactico />} />
              <Route path="/acerca-de" element={<AcercaDe />} />
              <Route path="/creditos" element={<Creditos />} />

              {/* 404 → home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}