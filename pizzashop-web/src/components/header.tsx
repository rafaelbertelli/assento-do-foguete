import { Home, Pizza, UtensilsCrossed } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme/theme-toggle";
import { NavLink } from "./ui/nav-link";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza size={24} />
        <Separator orientation="vertical" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home size={16} />
            Início
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed size={16} />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
