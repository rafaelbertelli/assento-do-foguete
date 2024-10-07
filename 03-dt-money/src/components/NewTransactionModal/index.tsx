import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
  createdAt: z.string(),
})

type NewTransactionSchema = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionSchema>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      createdAt: new Date().toISOString(),
    },
  })

  const { createTransaction } = useContextSelector(
    TransactionsContext,
    (ctx) => ({
      createTransaction: ctx.createTransaction,
    }),
  )

  async function handleCreateTransaction(data: NewTransactionSchema) {
    const { description, price, category, type, createdAt } = data

    try {
      await createTransaction({
        description,
        price,
        category,
        type,
        createdAt,
      })

      reset()
    } catch (error) {
      console.error(error)
    }
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
            {...register('description')}
          />
          <input
            placeholder="Valor"
            type="number"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input placeholder="Categoria" required {...register('category')} />

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
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
