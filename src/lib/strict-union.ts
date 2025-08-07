import type { StrictData } from './strict-types';
import type { PrettifyRecord } from './utils';

export function ofType<T extends StrictData>(): T {
  return {} as T;
}

export function union<
  DiscriminantKey extends string,
  PayloadField extends string,
  Variants extends Record<string, StrictData>,
>(
  discriminant: DiscriminantKey,
  payloadField: PayloadField,
  variants: Variants,
) {
  type VariantOf<K extends keyof Variants> = PrettifyRecord<
    { [D in DiscriminantKey]: K & string } & Record<PayloadField, Variants[K]>
  >;

  type VariantCreators = {
    [K in keyof Variants]: (props: Variants[K]) => VariantOf<K>;
  };

  type VariantPredicates = {
    [K in keyof Variants]: (u: unknown) => u is VariantOf<K>;
  };

  type DiscriminantValues = {
    [K in keyof Variants]: K & string;
  };

  type VariantsMap = { [K in keyof Variants]: VariantOf<K> };
  type UnionType = VariantsMap[keyof VariantsMap];

  const creators = {} as VariantCreators;
  const predicates = {} as VariantPredicates;
  const types = {} as DiscriminantValues;

  for (const key of Object.keys(variants) as Array<keyof Variants>) {
    const creatorFn = (props: Variants[typeof key]): VariantOf<typeof key> =>
      ({
        [discriminant]: key,
        [payloadField]: props,
      }) as VariantOf<typeof key>;
    creators[key] = creatorFn as VariantCreators[typeof key];

    const predicateFn = (u: unknown): u is VariantOf<typeof key> =>
      typeof u === 'object' &&
      u !== null &&
      (u as Record<string, unknown>)[discriminant] === key &&
      payloadField in (u as object);
    predicates[key] = predicateFn as VariantPredicates[typeof key];

    types[key] = key as DiscriminantValues[typeof key];
  }

  return {
    create: creators,
    is: predicates,
    type: types,
    Union: null as unknown as UnionType,
  };
}
