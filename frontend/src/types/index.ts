export type Temporada   = "seca" | "lluvias" | "especial";
export type TaxonGroup  = "fauna" | "flora";

export interface Recorrido {
  id:                string;
  nombre:            string;
  descripcion:       string;
  descripcion_larga: string | null;
  temporada:         Temporada;
  duracion_min:      number;
  dificultad:        "facil" | "moderado" | "dificil";
  distancia_km:      number;
  imagen_url:        string | null;
  tour_virtual_url:  string | null;
  created_at:        string;
}

export interface Parada {
  id:           string;
  recorrido_id: string;
  nombre:       string;
  descripcion:  string;
  lat:          number;
  lng:          number;
  imagen_url:   string | null;
  orden:        number;
}

export interface Especie {
  id:                  string;
  nombre_comun:        string;
  nombre_cientifico:   string;
  grupo:               TaxonGroup;
  descripcion:         string;
  descripcion_fisica:  string | null;
  habitat:             string | null;
  habitat_detalle:     string | null;
  distribucion:        string | null;
  clase:               string | null;
  orden_taxonomico:    string | null;
  familia:             string | null;
  vida_media:          string | null;
  tamano:              string | null;
  imagen_url:          string | null;
  modelo_ra_url:       string | null;
  sketchfab_id:        string | null;
  url_ra:              string | null;
  url_marcador_pdf:    string | null;
  slug:                string;
}

export interface ManualDidactico {
  id:              string;
  titulo:          string;
  descripcion:     string;
  archivo_url:     string;
  portada_url:     string | null;
  nivel_educativo: string | null;
}

export interface GeoJSONFeature {
  lat: number;
  lng: number;
}