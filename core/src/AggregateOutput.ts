import type { PushedEvent, ReplacedEvent } from "./event-types";

export type ActivityTransitionState =
  | "enter-active"
  | "enter-done"
  | "exit-active"
  | "exit-done";

export type Activity = {
  id: string;
  name: string;
  transitionState: ActivityTransitionState;
  params: {
    [key: string]: string | undefined;
  };
  context?: {};
  pushedBy: PushedEvent | ReplacedEvent;
  isTop: boolean;
  isActive: boolean;
  zIndex: number;
};

export type AggregateOutput = {
  activities: Activity[];
  transitionDuration: number;
  globalTransitionState: "idle" | "loading";
};
