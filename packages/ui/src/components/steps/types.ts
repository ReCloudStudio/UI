import type { InjectionKey } from "vue";

export interface StepsProps {
  startIndex?: number;
  class?: string;
}

export interface StepItemProps {
  title?: string;
  description?: string;
  step?: number | string;
  class?: string;
}

export interface StepsContext {
  registerStep: () => number;
}

export const stepsInjectionKey: InjectionKey<StepsContext> = Symbol("re-steps");
