import { useEffect, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLandingBundle } from "../../landing/hook/useLandingBundle";
import { ImageUploadField } from "../../landing/components/ImageUploadField";
import { useSaveBanner } from "../banner/hook/useSaveBanner";

export const BannerPage = () => {
  const { data: bundle, isLoading } = useLandingBundle();
  const { mutate: saveBanner, isPending, isSuccess, error } = useSaveBanner();

  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<File | undefined>();

  useEffect(() => {
    if (!bundle?.banner) return;
    setTitulo(bundle.banner.titulo ?? "");
    setSubtitulo(bundle.banner.subtitulo ?? "");
    setDescripcion(bundle.banner.descripcion ?? "");
  }, [bundle?.banner]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveBanner({
      titulo,
      subtitulo,
      descripcion,
      imagen,
      exists: !!bundle?.banner,
    });
  };

  const errorMessage = (error as any)?.response?.data?.message;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Cargando banner...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Banner</CardTitle>
          <CardDescription>
            Es lo primero que ven tus visitantes al entrar a tu landing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ImageUploadField
              label="Imagen de fondo"
              currentUrl={bundle?.banner?.imagen}
              onChange={setImagen}
            />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Es tiempo de cumplir un sueño"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subtitulo">Subtítulo</Label>
              <Input
                id="subtitulo"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                placeholder="Parcelas de 5.000 m2 en el Sur de Chile"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
              />
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
