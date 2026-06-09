import { DeepPartial } from "../types";
import ImageInterface from "./data/image.interface";
import { PropertyClassInterface } from "./property";
import { UserClassInterface } from "./user.interface";

export type ChatClassInterface = Chat;
export type ChatStructureInterface = DeepPartial<Chat>;

export type ChatMessageClassInterface = Message;
export type ChatMessageStructureInterface = DeepPartial<Message>;

interface Chat {
  conversation: {
    id: number;
    identifier: string;
    property: PropertyClassInterface;
  };
  users: Record<number, UserClassInterface & { role: string }>;
  messages: Message[];
}

interface Message {
  id: number;
  sender: UserClassInterface;
  content: {
    text: string;
    image: ImageInterface;
  };
  status: {
    edited: boolean;
    deleted: boolean;
  };
  date: {
    creation: Date;
  };
}
