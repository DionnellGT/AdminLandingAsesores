export interface LandingBanner {
  id: string;
  imagen: string | null;
  titulo: string;
  subtitulo: string | null;
  descripcion: string | null;
}

export interface LandingSobreMi {
  id: string;
  titulo: string;
  paragraph: string | null;
  imagen: string | null;
}

export interface LandingMisDatos {
  id: string;
  logo: string | null;
  nombre: string;
  apellido: string | null;
  correo: string | null;
  telefono: string | null;
  facebook: string | null;
  instagram: string | null;
}

export interface LandingProyecto {
  id: string;
  imagenCaratula: string | null;
  nombre: string;
  ubicacion: string | null;
  precio: string | null;
  badgeLabel: string | null;
  badgeColor: string | null;
  lotesDisponibles: number;
  descripcion: string | null;
  caracteristicas: string[];
  linkGoogleMaps: string | null;
  link360Maps: string | null;
  imagenesPopup: string[];
  createdAt: string;
}

export type TestimonioTipoMedia = "video" | "foto";

export interface LandingTestimonio {
  id: string;
  media: string | null;
  tipoMedia: TestimonioTipoMedia | null;
  nombreTestimonio: string;
  descripcion: string | null;
  createdAt: string;
}

/** Lo que retorna GET /landing-asesores/:email (y cada item de GET /landing-asesores) */
export interface LandingBundle {
  email: string;
  fullName: string;
  banner: LandingBanner | null;
  sobreMi: LandingSobreMi | null;
  misDatos: LandingMisDatos | null;
  proyectos: LandingProyecto[];
  testimonios: LandingTestimonio[];
}
