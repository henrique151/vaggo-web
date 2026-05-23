import { useState, useEffect } from "react";
import Chat from "@/classes/chat/Chat";
import { getChat } from "@/services/chat.service";

export function useGetChat(id: number): [any | undefined, boolean] {
  const [chat, setChat] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setChat(await getChat(id));
      setLoading(false);
    };
    load();
  }, [id]);

  return [chat, loading];
}
