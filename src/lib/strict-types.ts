export type StrictValue = string | number | boolean | null;

export type StrictArray = StrictData[];

export type StrictRecord = { [key: string]: StrictData };

export type StrictData = StrictValue | StrictArray | StrictRecord;
