import { getManagedRestaurantApi } from "@/api/get-managed-restaurant";
import { getProfileApi } from "@/api/get-profile";
import { signOutApi } from "@/api/sign-out";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreProfileDialog } from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurantApi,
  });

  const { mutateAsync: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    },
  });

  function toggleDialog() {
    setOpen((prev) => !prev);
  }

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex select-none items-center gap-2">
            {isLoadingManagedRestaurant ? <Skeleton className="h-4 w-40" /> : managedRestaurant?.name}

            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-2.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-48" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-sm font-normal text-muted-foreground">{profile?.email}</span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building size={16} />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigningOut}>
            <button className="w-full" onClick={() => signOut()}>
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog onEdited={toggleDialog} />
    </Dialog>
  );
}
