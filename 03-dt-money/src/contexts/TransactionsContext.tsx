import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType,
)

export function TransactionsProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function createTransaction(t: Omit<Transaction, 'id'>) {
    const response = await api.post('/transactions', {
      description: t.description,
      price: t.price,
      category: t.category,
      type: t.type,
      createdAt: t.createdAt,
    })

    setTransactions((prevTransactions) => [...prevTransactions, response.data])
  }

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      },
    })
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
