import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});
type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      toast.success("Restaurante cadastrado com sucesso", {
        action: {
          label: "Login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastrar Restaurante
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e começe suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Input
                type="text"
                id="restaurantName"
                placeholder="Nome do restaurante"
                {...register("restaurantName")}
              />

              <Input
                type="text"
                id="managerName"
                placeholder="Digite seu nome"
                {...register("managerName")}
              />

              <Input
                type="tel"
                id="phone"
                placeholder="Telefone do restaurante"
                {...register("phone")}
              />

              <Input
                type="email"
                id="email"
                placeholder="Digite o e-mail do restaurante"
                {...register("email")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                "Finalizar cadastro"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Ao cadastrar um restaurante, você concorda com os{" "}
              <Link
                to="/terms"
                className="whitespace-nowrap text-primary hover:underline"
              >
                Termos de uso
              </Link>{" "}
              e{" "}
              <Link
                to="/privacy"
                className="whitespace-nowrap text-primary hover:underline"
              >
                Política de privacidade
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
