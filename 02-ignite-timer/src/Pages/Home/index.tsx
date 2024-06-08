import { zodResolver } from "@hookform/resolvers/zod";
// import { differenceInSeconds } from "date-fns";
import { HandPalm, Play } from "phosphor-react";
import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O valor mínimo é 5 minutos")
    .max(60, "O valor máximo é 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle extends NewCycleFormData {
  id: string;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
}
export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { watch, handleSubmit, reset } = newCycleForm;

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

  function handleCreateNewCycle(data: NewCycleFormData) {
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

    reset();
  }

  const minutesAmountValue = watch("minutesAmount");
  const isSubmitDisabled = !minutesAmountValue;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function handleResetCycle() {
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
    document.title = "Ignite Timer | Home";
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            setSecondsPassed,
            markCurrentCycleAsFinished,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleResetCycle}>
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
