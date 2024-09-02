import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

const newTransactionSchema = z.object({
  description: z.string(),
  value: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionSchema = z.infer<typeof newTransactionSchema>;

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionSchema>({
    resolver: zodResolver(newTransactionSchema),
  });

  async function handleCreateTransaction(data: NewTransactionSchema) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <input
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            placeholder="Valor"
            type="number"
            required
            {...register("value", { valueAsNumber: true })}
          />
          <input placeholder="Categoria" required {...register("category")} />

          <Controller
            control={control}
            name="type"
            render={(props) => {
              return (
                <TransactionType
                  value={props.field.value}
                  onValueChange={props.field.onChange}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
