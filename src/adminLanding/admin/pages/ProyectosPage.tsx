import { useState } from "react";
import { Loader2, Plus, MapPin, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLandingBundle } from "../../landing/hook/useLandingBundle";
import { ProyectoFormDialog } from "../proyectos/components/ProyectoFormDialog";
import type { LandingProyecto } from "../../interfaces/landing.interfaces";

export const ProyectosPage = () => {
  const { data: bundle, isLoading } = useLandingBundle();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<LandingProyecto | null>(null);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (proyecto: LandingProyecto) => {
    setEditing(proyecto);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Cargando proyectos...
      </div>
    );
  }

  const proyectos = bundle?.proyectos ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Proyectos</h1>
          <p className="text-sm text-muted-foreground">
            Las parcelas, campos o propiedades que estás vendiendo.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Nuevo proyecto
        </Button>
      </div>

      {proyectos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <Building2 className="size-8" />
            <p className="text-sm">Todavía no tienes proyectos publicados.</p>
            <Button variant="outline" size="sm" onClick={openCreate} className="mt-2">
              Crear el primero
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {proyectos.map((proyecto) => (
            <Card key={proyecto.id} className="overflow-hidden py-0">
              <div className="relative aspect-video bg-muted">
                {proyecto.imagenCaratula ? (
                  <img
                    src={proyecto.imagenCaratula}
                    alt={proyecto.nombre}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <Building2 className="size-8" />
                  </div>
                )}
                {proyecto.badgeLabel && (
                  <Badge className="absolute top-2 right-2">{proyecto.badgeLabel}</Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-base">{proyecto.nombre}</CardTitle>
                {proyecto.ubicacion && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {proyecto.ubicacion}
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex items-center justify-between pb-4">
                <span className="text-sm font-medium">{proyecto.precio}</span>
                <span className="text-xs text-muted-foreground">
                  {proyecto.lotesDisponibles} lote(s)
                </span>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => openEdit(proyecto)}>
                  Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ProyectoFormDialog open={dialogOpen} onOpenChange={setDialogOpen} proyecto={editing} />
    </div>
  );
};
