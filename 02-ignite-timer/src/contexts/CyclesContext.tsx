import { createContext, useReducer, useState } from "react";

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

interface CyclesContextProviderProps {
  children: React.ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      console.log(state, action);

      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            activeCycleId: action.payload.id,
            cycles: [...state.cycles, action.payload],
          };
        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptedDate: new Date(),
                };
              }
              return cycle;
            }),
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              }
              return cycle;
            }),
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({ type: "MARK_CURRENT_CYCLE_AS_FINISHED", payload: activeCycle });

    document.title = "Ignite Timer | Home";
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

    dispatch({ type: "ADD_NEW_CYCLE", payload: newCycle });

    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch({ type: "INTERRUPT_CURRENT_CYCLE", payload: activeCycleId });

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
