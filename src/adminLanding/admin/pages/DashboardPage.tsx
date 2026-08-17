import {
  Image as ImageIcon,
  User,
  Building2,
  MessageSquareQuote,
  IdCard,
  Users,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthStore, isAdmin } from "../../auth/hook/useAuthStore";

const SECCIONES = [
  {
    icon: ImageIcon,
    titulo: "Banner",
    descripcion:
      "La primera imagen que ven tus clientes. Edita el título, subtítulo, descripción y la foto principal de tu landing.",
  },
  {
    icon: User,
    titulo: "Sobre Mí",
    descripcion:
      "Cuenta quién eres y por qué confiar en ti: un título, un párrafo de presentación y una foto tuya.",
  },
  {
    icon: Building2,
    titulo: "Proyectos",
    descripcion:
      "Agrega los proyectos o propiedades que estás vendiendo: imagen de portada, precio, ubicación, características y hasta más imágenes para el detalle.",
  },
  {
    icon: MessageSquareQuote,
    titulo: "Testimonios",
    descripcion:
      "Sube fotos o videos de clientes satisfechos, con su nombre y una breve reseña.",
  },
  {
    icon: IdCard,
    titulo: "Mis Datos",
    descripcion:
      "Tu información de contacto: logo, nombre, teléfono, correo y tus redes sociales.",
  },
];

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const admin = isAdmin(user);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Bienvenido{user?.fullName ? `, ${user.fullName}` : ""}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Cómo editar tu landing
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Desde acá administras toda la información que se muestra en tu página
          de aterrizaje. En el menú de la izquierda, abre{" "}
          <span className="font-medium text-foreground">"Mi Landing"</span> para
          ver las secciones disponibles. Cada una se edita por separado y los
          cambios se guardan al instante.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SECCIONES.map(({ icon: Icon, titulo, descripcion }) => (
          <Card key={titulo}>
            <CardHeader>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <CardTitle className="mt-2">{titulo}</CardTitle>
              <CardDescription>{descripcion}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {admin && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="size-4" />
            </div>
            <CardTitle className="mt-2">Herramientas de Admin</CardTitle>
            <CardDescription>
              Como administrador, en{" "}
              <span className="font-medium text-foreground">"Asesores"</span>{" "}
              puedes elegir el correo de cualquier asesor para ver y editar su
              landing. En{" "}
              <span className="font-medium text-foreground">"Usuarios"</span>{" "}
              puedes administrar los datos de cuenta de todos los usuarios
              (menos su correo, que no se puede modificar).
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};
