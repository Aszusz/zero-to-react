export type Effects = {
  log: (message: string, ...args: unknown[]) => void;
  random: (min: number, max: number) => number;
  delay: (ms: number) => Promise<void>;
};

export const appEffects: Effects = {
  log: (message: string, ...args: unknown[]): void => {
    console.log(message, ...args);
  },

  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  delay: async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
