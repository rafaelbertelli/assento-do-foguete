import {
  getManagedRestaurantApi,
  GetManagedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { updateProfileApi } from "@/api/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog({ onEdited }: { onEdited: () => void }) {
  const queryClient = useQueryClient();

  function updateManagedRestaurantCached(variables: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name: variables.name,
          description: variables.description,
        },
      );
    }

    return { cached };
  }

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: updateProfileApi,
    onMutate: ({ name, description }) => {
      const { cached } = updateManagedRestaurantCached({ name, description });
      return { previousProfile: cached };
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        updateManagedRestaurantCached(context.previousProfile);
      }
    },
  });

  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurantApi,
  });

  const { register, handleSubmit } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfile({
        name: data.name,
        description: data.description,
      });

      onEdited();
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      toast.error(
        "Erro ao atualizar o perfil do estabelecimento, tente novamente mais tarde",
      );
    }
  }

  return (
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          {" "}
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              type="text"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
