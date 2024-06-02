import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { watch, register, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleFormSubmit(data: NewCycleFormData) {
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

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

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

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const calculatedDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (calculatedDiff >= totalSeconds) {
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

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(calculatedDiff);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, activeCycleId, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={Boolean(activeCycle)}
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Atividade 1" />
            <option value="Atividade 2" />
            <option value="Atividade 3" />
            <option value="Atividade 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            placeholder="00"
            type="number"
            // step={5}
            // min={5}
            max={60}
            disabled={Boolean(activeCycle)}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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
