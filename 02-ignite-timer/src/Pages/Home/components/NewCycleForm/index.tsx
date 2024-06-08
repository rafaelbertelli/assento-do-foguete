import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../../../contexts/CyclesContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
  );
}
