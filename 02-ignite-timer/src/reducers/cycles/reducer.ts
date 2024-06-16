import { produce } from "immer";

import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesRreducer(state: CyclesState, action: any) {
  console.log(state, action);

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft: CyclesState) => {
        draft.activeCycleId = action.payload.newCycle.id;
        draft.cycles.push(action.payload.newCycle);
      });

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft: CyclesState) => {
        draft.activeCycleId = null;
        draft.cycles = draft.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            cycle.interruptedDate = new Date();
          }
          return cycle;
        });
      });

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return produce(state, (draft: CyclesState) => {
        draft.activeCycleId = null;
        draft.cycles = draft.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            cycle.finishedDate = new Date();
          }
          return cycle;
        });
      });
    default:
      return state;
  }
}
