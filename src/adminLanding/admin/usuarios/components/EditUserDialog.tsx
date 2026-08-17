import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdateUser } from "../hook/useUpdateUser";
import { ROLES_DISPONIBLES } from "../constants";
import type { AdminUser } from "../../../interfaces/user.interfaces";


interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUser | null;
}

export const EditUserDialog = ({ open, onOpenChange, user }: EditUserDialogProps) => {
  const { mutate: updateUser, isPending, error, reset } = useUpdateUser();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [roles, setRoles] = useState<string[]>([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open || !user) return;
    reset();
    setFullName(user.fullName ?? "");
    setPhone(user.phone ?? "");
    setAddress(user.address ?? "");
    setIsActive(user.isActive);
    setRoles(user.roles ?? []);
    setPassword("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user]);

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    updateUser(
      {
        id: user.id,
        payload: {
          fullName,
          phone,
          address,
          isActive,
          roles,
          ...(password ? { password } : {}),
        },
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const errorMessage = (error as any)?.response?.data?.message;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
          <DialogDescription>
            El correo no se puede modificar desde acá.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Correo</Label>
            <Input value={user?.email ?? ""} disabled />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Nueva contraseña (opcional)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dejar en blanco para no cambiarla"
            />
          </div>

          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <Label htmlFor="isActive" className="cursor-pointer">
              Usuario activo
            </Label>
            <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Roles</Label>
            <div className="flex flex-wrap gap-2">
              {ROLES_DISPONIBLES.map(({ value, label }) => {
                const checked = roles.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleRole(value)}
                    className={
                      checked
                        ? "rounded-full border border-primary bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                        : "rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-foreground/30"
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
