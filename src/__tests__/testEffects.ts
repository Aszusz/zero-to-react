import { Effects } from '@/shell/effects';

export const testEffects: Effects = {
  log: () => {},
  random: () => 5,
  delay: () => Promise.resolve(),
};
