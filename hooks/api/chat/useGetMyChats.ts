import { useState, useEffect } from "react";
import Chat from "@/classes/chat/Chat";
import { listMyChats } from "@/services/chat.service";

export function useGetMyChats(): [Chat[], boolean] {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setChats(await listMyChats());
      setLoading(false);
    };
    load();
  }, []);

  return [chats, loading];
}
