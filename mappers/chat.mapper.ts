import Chat from "@/classes/chat/Chat";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function map(d: any) {
  return new Chat(d);
}
