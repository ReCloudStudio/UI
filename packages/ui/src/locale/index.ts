import { computed, inject, provide, type InjectionKey, type Ref, shallowRef } from "vue";
import { enUS, zhCN, type DeepPartial, type LocaleMessages } from "./messages";

export interface LocaleContext {
  locale: Ref<string>;
  messages: Ref<LocaleMessages>;
  setLocale: (name: string, customMessages?: DeepPartial<LocaleMessages>) => void;
}

export const LOCALE_INJECTION_KEY: InjectionKey<LocaleContext> = Symbol("recloud:locale");

const builtInLocales: Record<string, LocaleMessages> = {
  "zh-CN": zhCN,
  zh: zhCN,
  "en-US": enUS,
  en: enUS,
};

function mergeDeep<T extends Record<string, unknown>>(
  target: T,
  source?: Record<string, unknown>,
): T {
  if (!source) return target;
  const output: Record<string, unknown> = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = output[key];
    if (
      sourceVal !== null &&
      sourceVal !== undefined &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      targetVal !== undefined &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      output[key] = mergeDeep(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else if (sourceVal !== undefined) {
      output[key] = sourceVal;
    }
  }
  return output as T;
}

export function provideLocale(
  initialLocale: string = "zh-CN",
  customMessages?: DeepPartial<LocaleMessages>,
): LocaleContext {
  const currentLocale = shallowRef(initialLocale);
  const base = builtInLocales[initialLocale] ?? zhCN;
  const currentMessages = shallowRef<LocaleMessages>(
    customMessages ? mergeDeep({ ...base }, customMessages as Record<string, unknown>) : base,
  );

  const context: LocaleContext = {
    locale: currentLocale,
    messages: currentMessages,
    setLocale(name: string, override?: DeepPartial<LocaleMessages>) {
      currentLocale.value = name;
      const fallback = builtInLocales[name] ?? zhCN;
      currentMessages.value = override
        ? mergeDeep({ ...fallback }, override as Record<string, unknown>)
        : fallback;
    },
  };

  provide(LOCALE_INJECTION_KEY, context);
  return context;
}

export function useLocale() {
  const injected = inject(LOCALE_INJECTION_KEY, null);
  if (injected) return injected;

  const defaultLocale = shallowRef("zh-CN");
  const defaultMessages = shallowRef(zhCN);
  return {
    locale: defaultLocale,
    messages: defaultMessages,
    setLocale(name: string, override?: DeepPartial<LocaleMessages>) {
      defaultLocale.value = name;
      const fallback = builtInLocales[name] ?? zhCN;
      defaultMessages.value = override
        ? mergeDeep({ ...fallback }, override as Record<string, unknown>)
        : fallback;
    },
  };
}

export function useComponentLocale<K extends keyof LocaleMessages>(componentKey: K) {
  const { messages } = useLocale();
  return computed(() => messages.value[componentKey]);
}
