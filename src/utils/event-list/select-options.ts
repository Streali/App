import { EventType, EventTypeDict } from '@streali/common';

export const selectOptions = Array.from(EventTypeDict.values(), (item) => ({
  label: item.label,
  value: item.value.toString(),
})).filter((item) => item.value !== EventType.HypeTrainProgress.toString());
