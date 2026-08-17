import { useState } from "react";
import { Loader2, Plus, MessageSquareQuote, Film } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLandingBundle } from "../../landing/hook/useLandingBundle";
import { TestimonioFormDialog } from "../testimonios/components/TestimonioFormDialog";
import type { LandingTestimonio } from "../../interfaces/landing.interfaces";

export const TestimoniosPage = () => {
  const { data: bundle, isLoading } = useLandingBundle();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<LandingTestimonio | null>(null);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (testimonio: LandingTestimonio) => {
    setEditing(testimonio);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Cargando testimonios...
      </div>
    );
  }

  const testimonios = bundle?.testimonios ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Testimonios</h1>
          <p className="text-sm text-muted-foreground">
            Fotos o videos de clientes satisfechos.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Nuevo testimonio
        </Button>
      </div>

      {testimonios.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <MessageSquareQuote className="size-8" />
            <p className="text-sm">Todavía no tienes testimonios publicados.</p>
            <Button variant="outline" size="sm" onClick={openCreate} className="mt-2">
              Crear el primero
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonios.map((testimonio) => (
            <Card key={testimonio.id} className="overflow-hidden py-0">
              <div className="relative aspect-square bg-muted">
                {testimonio.media ? (
                  testimonio.tipoMedia === "video" ? (
                    <video src={testimonio.media} className="size-full object-cover" muted />
                  ) : (
                    <img
                      src={testimonio.media}
                      alt={testimonio.nombreTestimonio}
                      className="size-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <Film className="size-8" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-base">{testimonio.nombreTestimonio}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {testimonio.descripcion}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => openEdit(testimonio)}>
                  Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <TestimonioFormDialog open={dialogOpen} onOpenChange={setDialogOpen} testimonio={editing} />
    </div>
  );
};
