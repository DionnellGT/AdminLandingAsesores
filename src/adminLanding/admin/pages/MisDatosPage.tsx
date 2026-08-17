import { useEffect, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLandingBundle } from "../../landing/hook/useLandingBundle";
import { ImageUploadField } from "../../landing/components/ImageUploadField";
import { useSaveMisDatos } from "../misDatos/hook/useSaveMisDatos";

export const MisDatosPage = () => {
  const { data: bundle, isLoading } = useLandingBundle();
  const { mutate: saveMisDatos, isPending, isSuccess, error } = useSaveMisDatos();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [logo, setLogo] = useState<File | undefined>();

  useEffect(() => {
    if (!bundle?.misDatos) return;
    setNombre(bundle.misDatos.nombre ?? "");
    setApellido(bundle.misDatos.apellido ?? "");
    setCorreo(bundle.misDatos.correo ?? "");
    setTelefono(bundle.misDatos.telefono ?? "");
    setFacebook(bundle.misDatos.facebook ?? "");
    setInstagram(bundle.misDatos.instagram ?? "");
  }, [bundle?.misDatos]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveMisDatos({
      nombre,
      apellido,
      correo,
      telefono,
      facebook,
      instagram,
      logo,
      exists: !!bundle?.misDatos,
    });
  };

  const errorMessage = (error as any)?.response?.data?.message;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Cargando...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Mis Datos</CardTitle>
          <CardDescription>
            Tu información de contacto, como se mostrará en el pie de tu landing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ImageUploadField
              label="Logo"
              currentUrl={bundle?.misDatos?.logo}
              onChange={setLogo}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="correo">Correo de contacto</Label>
                <Input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="conecta@ejemplo.cl"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+56 9 ..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}
            {isSuccess && !isPending && (
              <p className="flex items-center gap-1.5 text-sm text-emerald-600">
                <CheckCircle2 className="size-4" />
                Guardado correctamente.
              </p>
            )}

            <Button type="submit" disabled={isPending} className="w-fit">
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
