import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Image as ImageIcon } from "lucide-react";

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

import { ImageUploadField } from "../../../landing/components/ImageUploadField";
import { useSaveProyecto } from "../hook/useSaveProyecto";
import type { LandingProyecto } from "../../../interfaces/landing.interfaces";

interface ProyectoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proyecto?: LandingProyecto | null;
}

export const ProyectoFormDialog = ({
  open,
  onOpenChange,
  proyecto,
}: ProyectoFormDialogProps) => {
  const { mutate: saveProyecto, isPending, error, reset } = useSaveProyecto();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [precio, setPrecio] = useState("");
  const [badgeLabel, setBadgeLabel] = useState("");
  const [badgeColor, setBadgeColor] = useState("");
  const [lotesDisponibles, setLotesDisponibles] = useState("0");
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [linkGoogleMaps, setLinkGoogleMaps] = useState("");
  const [link360Maps, setLink360Maps] = useState("");
  const [imagenCaratula, setImagenCaratula] = useState<File | undefined>();
  const [imagenesPopup, setImagenesPopup] = useState<File[]>([]);

  useEffect(() => {
    if (!open) return;
    reset();
    setNombre(proyecto?.nombre ?? "");
    setUbicacion(proyecto?.ubicacion ?? "");
    setPrecio(proyecto?.precio ?? "");
    setBadgeLabel(proyecto?.badgeLabel ?? "");
    setBadgeColor(proyecto?.badgeColor ?? "");
    setLotesDisponibles(String(proyecto?.lotesDisponibles ?? 0));
    setDescripcion(proyecto?.descripcion ?? "");
    setCaracteristicas((proyecto?.caracteristicas ?? []).join(", "));
    setLinkGoogleMaps(proyecto?.linkGoogleMaps ?? "");
    setLink360Maps(proyecto?.link360Maps ?? "");
    setImagenCaratula(undefined);
    setImagenesPopup([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, proyecto]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveProyecto(
      {
        id: proyecto?.id,
        nombre,
        ubicacion,
        precio,
        badgeLabel,
        badgeColor,
        lotesDisponibles: Number(lotesDisponibles) || 0,
        descripcion,
        caracteristicas: caracteristicas
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
          .slice(0, 8),
        linkGoogleMaps,
        link360Maps,
        imagenCaratula,
        imagenesPopup,
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const errorMessage = (error as any)?.response?.data?.message;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{proyecto ? "Editar proyecto" : "Nuevo proyecto"}</DialogTitle>
          <DialogDescription>
            Los datos de la parcela, campo o propiedad que estás publicando.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ImageUploadField
            label="Imagen de carátula"
            currentUrl={proyecto?.imagenCaratula}
            onChange={setImagenCaratula}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Input id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="precio">Precio</Label>
              <Input id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Desde $14.900.000" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lotesDisponibles">Lotes disponibles</Label>
              <Input
                id="lotesDisponibles"
                type="number"
                min={0}
                value={lotesDisponibles}
                onChange={(e) => setLotesDisponibles(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="badgeLabel">Badge (ej: Lanzamiento)</Label>
              <Input id="badgeLabel" value={badgeLabel} onChange={(e) => setBadgeLabel(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="badgeColor">Color del badge</Label>
            <Input id="badgeColor" value={badgeColor} onChange={(e) => setBadgeColor(e.target.value)} placeholder="#B09E80" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="caracteristicas">Características (separadas por coma, máx. 8)</Label>
            <Textarea
              id="caracteristicas"
              value={caracteristicas}
              onChange={(e) => setCaracteristicas(e.target.value)}
              rows={2}
              placeholder="Rol propio, Factibilidad de luz, Factibilidad de agua"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="linkGoogleMaps">Link Google Maps</Label>
              <Input id="linkGoogleMaps" value={linkGoogleMaps} onChange={(e) => setLinkGoogleMaps(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="link360Maps">Link recorrido 360°</Label>
              <Input id="link360Maps" value={link360Maps} onChange={(e) => setLink360Maps(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="imagenesPopup">Imágenes de detalle (una o más)</Label>
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-muted-foreground" />
              <Input
                id="imagenesPopup"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImagenesPopup(Array.from(e.target.files ?? []))}
              />
            </div>
            {imagenesPopup.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {imagenesPopup.length} imagen(es) seleccionada(s).
              </p>
            )}
            {!imagenesPopup.length && !!proyecto?.imagenesPopup?.length && (
              <p className="text-xs text-muted-foreground">
                Ya tiene {proyecto.imagenesPopup.length} imagen(es). Selecciona archivos nuevos para reemplazarlas.
              </p>
            )}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Guardando..." : proyecto ? "Guardar cambios" : "Crear proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
