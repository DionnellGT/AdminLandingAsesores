import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2, Film, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSaveTestimonio } from "../hook/useSaveTestimonio";
import type { LandingTestimonio } from "../../../interfaces/landing.interfaces";

interface TestimonioFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonio?: LandingTestimonio | null;
}

export const TestimonioFormDialog = ({
  open,
  onOpenChange,
  testimonio,
}: TestimonioFormDialogProps) => {
  const { mutate: saveTestimonio, isPending, error, reset } = useSaveTestimonio();

  const [nombreTestimonio, setNombreTestimonio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [media, setMedia] = useState<File | undefined>();
  const [preview, setPreview] = useState<{ url: string; isVideo: boolean } | null>(null);

  useEffect(() => {
    if (!open) return;
    reset();
    setNombreTestimonio(testimonio?.nombreTestimonio ?? "");
    setDescripcion(testimonio?.descripcion ?? "");
    setMedia(undefined);
    setPreview(
      testimonio?.media
        ? { url: testimonio.media, isVideo: testimonio.tipoMedia === "video" }
        : null,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, testimonio]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setMedia(file);
    if (file) {
      setPreview({ url: URL.createObjectURL(file), isVideo: file.type.startsWith("video/") });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveTestimonio(
      { id: testimonio?.id, nombreTestimonio, descripcion, media },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const errorMessage = (error as any)?.response?.data?.message;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{testimonio ? "Editar testimonio" : "Nuevo testimonio"}</DialogTitle>
          <DialogDescription>Una foto o video de un cliente satisfecho.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="media">Foto o video</Label>
            <div className="flex items-center gap-3">
              {preview ? (
                preview.isVideo ? (
                  <video src={preview.url} className="size-16 rounded-md border object-cover" muted />
                ) : (
                  <img src={preview.url} alt="preview" className="size-16 rounded-md border object-cover" />
                )
              ) : (
                <div className="flex size-16 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                  <ImageIcon className="size-5" />
                </div>
              )}
              <Input id="media" type="file" accept="image/*,video/*" onChange={handleFileChange} className="max-w-xs" />
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Film className="size-3" />
              Acepta imágenes o videos.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombreTestimonio">Nombre</Label>
            <Input
              id="nombreTestimonio"
              value={nombreTestimonio}
              onChange={(e) => setNombreTestimonio(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descripcion">Descripción / reseña</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
            />
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Guardando..." : testimonio ? "Guardar cambios" : "Crear testimonio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
