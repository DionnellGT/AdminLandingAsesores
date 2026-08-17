import { useState } from "react";
import { Loader2, Plus, Users as UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useUsers } from "../usuarios/hook/useUsers";
import { EditUserDialog } from "../usuarios/components/EditUserDialog";
import { CreateUserDialog } from "../usuarios/components/CreateUserDialog";
import type { AdminUser } from "../../interfaces/user.interfaces";

export const UsersPage = () => {
  const { data, isLoading } = useUsers();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const openEdit = (user: AdminUser) => {
    setEditing(user);
    setEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Cargando usuarios...
      </div>
    );
  }

  const users = data?.users ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Administra los datos de cuenta de todos los usuarios. El correo no
            se puede modificar.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="size-4" />
          Nuevo usuario
        </Button>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <UsersIcon className="size-8" />
            <p className="text-sm">No hay usuarios registrados.</p>
            <Button variant="outline" size="sm" onClick={() => setCreateDialogOpen(true)} className="mt-2">
              Crear el primero
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="py-0">
          <div className="divide-y">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{user.fullName}</p>
                    {!user.isActive && (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => openEdit(user)}
                >
                  Editar
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <EditUserDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} user={editing} />
      <CreateUserDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};
