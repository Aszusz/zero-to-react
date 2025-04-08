import {
  msgDef,
  MakeMessageUnion,
  makeMessageTypes,
  makeMessageCreators,
} from '@/horizon';

export const events = {
  incrementClicked: msgDef(),
  decrementClicked: msgDef(),
  incrementAsyncClicked: msgDef(),
  incrementAsyncDone: msgDef<{ amount: number }>(),
};

const eventTypes = makeMessageTypes(events);
const eventCreators = makeMessageCreators(events);

export type Event = MakeMessageUnion<typeof eventCreators>;

export { eventTypes as et, eventCreators as ec };
