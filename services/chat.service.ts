/* eslint-disable @typescript-eslint/no-explicit-any */
import Chat from "@/classes/chat/Chat";
import request from "./api.service";
import { map } from "@/mappers/chat.mapper";
import { Image } from "@/classes/data/Image";

export async function listMyChats(): Promise<Chat[]> {
  const res = await request({
    url: `chats`,
    useToken: true,
    req: {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.data.map(map);
  }

  return [];
}

export async function getChat(id: number): Promise<any> {
  const res = await request({
    url: `chats/${id}`,
    useToken: true,
    req: {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  });

  if (res.ok) {
    const data = await res.json();
    const result = {
      property: {
        id: data.conversation.property.id,
        name: data.conversation.property.name,
      },
      messages: data.messages.map((message: any) => {
        const sender = data.users[message.senderId];
        return {
          id: message.id,
          user: {
            id: sender.id,
            name: sender.name,
            email: sender.email,
            avatar: new Image(sender.avatarUrl),
            role: sender.role,
            lastOnline: sender.lastOnline,
          },
          content: message.content,
          image: message.imageUrl ? new Image(message.imageUrl) : null,
          edited: message.isEdited,
          deleted: message.isDeleted,
          createdAt: new Date(message.createdAt),
        };
      }),
    };

    return result;
  }
}

export async function sendMessage(
  chatId: number,
  message: { content: string; image?: File },
) {}
