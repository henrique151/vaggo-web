import State from "@/classes/address/state";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function map(d: any) {
  return new State(d);
}
