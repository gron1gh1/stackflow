import type { BaseDomainEvent } from "./_base";

export interface PushedEventParams {
  [key: string]: string | undefined;
}

export type PushedEvent = BaseDomainEvent<
  "Pushed",
  {
    activityId: string;
    activityName: string;
    activityParams: PushedEventParams;
    skipEnterActiveState?: boolean;
    activityContext?: {};
  }
>;
