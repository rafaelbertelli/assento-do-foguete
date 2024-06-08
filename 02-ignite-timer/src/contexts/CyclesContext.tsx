import { createContext, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((state) => {
        if (state.id === activeCycleId) {
          return {
            ...state,
            interruptedDate: new Date(),
          };
        }

        return state;
      })
    );

    document.title = "Ignite Timer | Home";
    setActiveCycleId(null);
  }

  function createNewCycle(data: CreateCycleData) {
    const date = new Date();

    const id = String(date.getTime());
    const newCycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: date,
    };

    setActiveCycleId(id);
    setCycles((state) => [...state, newCycle]);
    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    setCycles((state) =>
      state.map((state) => {
        if (state.id === activeCycleId) {
          return {
            ...state,
            interruptedDate: new Date(),
          };
        }

        return state;
      })
    );

    setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        markCurrentCycleAsFinished,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
