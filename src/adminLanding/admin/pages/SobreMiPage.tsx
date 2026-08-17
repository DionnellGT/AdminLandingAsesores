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
import { useSaveSobreMi } from "../sobreMi/hook/useSaveSobreMi";

export const SobreMiPage = () => {
  const { data: bundle, isLoading } = useLandingBundle();
  const { mutate: saveSobreMi, isPending, isSuccess, error } = useSaveSobreMi();

  const [titulo, setTitulo] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [imagen, setImagen] = useState<File | undefined>();

  useEffect(() => {
    if (!bundle?.sobreMi) return;
    setTitulo(bundle.sobreMi.titulo ?? "");
    setParagraph(bundle.sobreMi.paragraph ?? "");
  }, [bundle?.sobreMi]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSobreMi({
      titulo,
      paragraph,
      imagen,
      exists: !!bundle?.sobreMi,
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
          <CardTitle>Sobre Mí</CardTitle>
          <CardDescription>
            Cuenta quién eres y por qué tus clientes deberían confiar en ti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ImageUploadField
              label="Foto"
              currentUrl={bundle?.sobreMi?.imagen}
              onChange={setImagen}
            />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Acerca de Nosotros"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="paragraph">Párrafo</Label>
              <Textarea
                id="paragraph"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                rows={6}
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
