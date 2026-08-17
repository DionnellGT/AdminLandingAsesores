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

import { useCreateUser } from "../hook/useCreateUser";
import { ROLES_DISPONIBLES } from "../constants";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialRoles = ["user"];

export const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
  const { mutate: createUser, isPending, error, reset } = useCreateUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [roles, setRoles] = useState<string[]>(initialRoles);

  useEffect(() => {
    if (!open) return;
    reset();
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setAddress("");
    setIsActive(true);
    setRoles(initialRoles);
  }, [open, reset]);

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser(
      {
        email: email.trim().toLowerCase(),
        password,
        fullName,
        phone,
        address,
        roles,
        isActive,
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const errorMessage = (error as any)?.response?.data?.message;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo usuario</DialogTitle>
          <DialogDescription>
            El correo no se podrá modificar después de creado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@correo.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
            <p className="text-xs text-muted-foreground">
              Debe incluir una mayúscula, una minúscula y un número (o símbolo).
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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

          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <Label htmlFor="isActive-create" className="cursor-pointer">
              Usuario activo
            </Label>
            <Switch id="isActive-create" checked={isActive} onCheckedChange={setIsActive} />
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
              {isPending ? "Creando..." : "Crear usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
