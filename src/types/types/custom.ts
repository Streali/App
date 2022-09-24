export type NominalType<T extends string> = { __type: T };
export type Seconds = number & NominalType<'Seconds'>;
export type Milliseconds = number & NominalType<'Milliseconds'>;
export type Pixels = number & NominalType<'Pixels'>;
