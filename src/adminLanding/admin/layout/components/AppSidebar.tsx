import { NavLink, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Image as ImageIcon,
  User,
  Building2,
  MessageSquareQuote,
  IdCard,
  Users,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

import { useAuthStore, isAdmin } from "../../../auth/hook/useAuthStore";
import { useAsesores } from "../../../landing/hook/useAsesores";
import { useAsesorSeleccionadoStore } from "../../../landing/hook/useAsesorSeleccionadoStore";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

const LANDING_LINKS = [
  { to: "/dashboard/banner", label: "Banner", icon: ImageIcon },
  { to: "/dashboard/sobre-mi", label: "Sobre Mí", icon: User },
  { to: "/dashboard/proyectos", label: "Proyectos", icon: Building2 },
  { to: "/dashboard/testimonios", label: "Testimonios", icon: MessageSquareQuote },
  { to: "/dashboard/mis-datos", label: "Mis Datos", icon: IdCard },
];

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground"
      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  );

interface AppSidebarProps {
  onNavigate?: () => void;
}

export const AppSidebar = ({ onNavigate }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.setNotAuthenticated);

  const admin = isAdmin(user);
  const { data: asesores } = useAsesores();
  const seleccionar = useAsesorSeleccionadoStore((state) => state.seleccionar);
  const limpiarSeleccion = useAsesorSeleccionadoStore((state) => state.limpiar);
  const { email: contextoActivo, editandoOtro } = useTargetAsesor();

  const initials = (user?.fullName ?? user?.email ?? "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Un link de landing se ve "activo" solo si coincide la ruta Y el
  // contexto (a quién se está editando): así "Banner" de Mi Landing y
  // "Banner" de un asesor no quedan los dos resaltados a la vez, aunque
  // compartan la misma URL.
  const landingLinkClasses = (to: string, contextEmail: string) =>
    cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
      location.pathname === to && contextoActivo === contextEmail
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    );

  const irASeccionPropia = (to: string) => {
    limpiarSeleccion();
    navigate(to);
    onNavigate?.();
  };

  const irASeccionDeAsesor = (email: string, to: string) => {
    seleccionar(email);
    navigate(to);
    onNavigate?.();
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <LayoutDashboard className="size-4" />
        </div>
        <span className="text-sm font-semibold">Admin Landing</span>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <NavLink to="/dashboard" end className={navLinkClasses} onClick={onNavigate}>
          <LayoutDashboard className="size-4" />
          Inicio
        </NavLink>

        {/* Mi Landing */}
        <Collapsible defaultOpen className="mt-2">
          <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Avatar className="size-6">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-[10px]">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col items-start overflow-hidden text-left">
              <span className="text-xs font-medium">Mi Landing</span>
              <span className="w-full truncate text-[11px] text-sidebar-foreground/60">
                {user?.email}
              </span>
            </div>
            <ChevronDown className="size-4 shrink-0 transition-transform group-data-[panel-open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1 flex flex-col gap-0.5 pl-4">
              {LANDING_LINKS.map(({ to, label, icon: Icon }) => (
                <button
                  key={to}
                  type="button"
                  onClick={() => irASeccionPropia(to)}
                  className={cn(landingLinkClasses(to, user?.email ?? ""), "text-left")}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Asesores (solo admin): cada asesor tiene su propio desplegable
            con las 5 secciones del landing, igual que "Mi Landing". */}
        {admin && (
          <Collapsible defaultOpen className="mt-2">
            <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Users className="size-4" />
              <span className="flex-1 text-left text-xs font-medium">Asesores</span>
              <ChevronRight className="size-4 shrink-0 transition-transform group-data-[panel-open]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-1 flex flex-col gap-0.5 pl-4">
                {asesores?.map((asesor) => (
                  <Collapsible key={asesor.email}>
                    <CollapsibleTrigger
                      className={cn(
                        "group/asesor flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        contextoActivo === asesor.email
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <span className="flex-1 truncate text-xs">{asesor.email}</span>
                      <ChevronDown className="size-3.5 shrink-0 transition-transform group-data-[panel-open]/asesor:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-0.5 flex flex-col gap-0.5 pl-3">
                        {LANDING_LINKS.map(({ to, label, icon: Icon }) => (
                          <button
                            key={to}
                            type="button"
                            onClick={() => irASeccionDeAsesor(asesor.email, to)}
                            className={cn(
                              landingLinkClasses(to, asesor.email),
                              "text-left text-xs",
                            )}
                          >
                            <Icon className="size-3.5" />
                            {label}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                {!asesores?.length && (
                  <p className="px-3 py-1 text-xs text-sidebar-foreground/50">
                    No hay asesores todavía.
                  </p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Usuarios (solo admin) */}
        {admin && (
          <NavLink
            to="/dashboard/usuarios"
            className={cn(navLinkClasses({ isActive: false }), "mt-2")}
            onClick={onNavigate}
          >
            <IdCard className="size-4" />
            Usuarios
          </NavLink>
        )}
      </nav>

      {editandoOtro && (
        <div className="mx-2 mb-2 rounded-md bg-sidebar-accent px-3 py-2 text-xs text-sidebar-accent-foreground">
          Editando el landing de otro asesor.{" "}
          <button
            type="button"
            onClick={() => irASeccionPropia("/dashboard/banner")}
            className="font-medium underline underline-offset-2"
          >
            Volver al mío
          </button>
        </div>
      )}

      <Separator className="bg-sidebar-border" />

      <div className="p-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
