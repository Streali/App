import { Enum, EventType } from '@streali/common';

export type EventTypeWithoutHypeTrainProgress = Exclude<
  Enum<typeof EventType>,
  typeof EventType.HypeTrainProgress
>;
