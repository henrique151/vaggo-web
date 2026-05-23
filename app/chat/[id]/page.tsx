"use client";
// import Message from "@/classes/Message";
import PanelContainer from "@/component/container/PanelContainer";
import PanelLayout from "@/component/layout/PanelLayout";
import { useGetChat } from "@/hooks/api/chat/useGetChat";
import { getChat, sendMessage } from "@/services/chat.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams() as unknown as { id: number };
  const [chat] = useGetChat(params.id);
  const [chatHistory, setChatHistory] = useState([]);

  const send = async (e: any) => {
    e.preventDefault();
    const textMessageForm = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    // console.log(formData.get("message"));
    // if (document.getElementById("text-box").value == null) return null
    if (formData.get("content")) {
      const element = document.getElementById("text-box") as HTMLInputElement;
      console.log(formData.get("message"));
      element.value = "";

      const res = await sendMessage(params.id, formData);

      if (res) {
        console.log("sent!");
        const updatedChat = await getChat(params.id);
        setChatHistory(updatedChat.messages);
      }
    }
  };

  useEffect(() => {
    if (chat) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChatHistory(chat.messages);
    }
  }, [chat]);

  console.log(chat);

  return (
    <main className="p-8">
      <PanelContainer
        title={`Conversa sobre ${chat?.property.name || "Propriedade"}`}
      >
        <PanelLayout className="px-10 py-2 pb-5 flex flex-col">
          {/* Message tree */}
          <div className="p-2">
            <div className="overflow-y-auto h-120 mb-3 scroll-smooth">
              <div className="flex flex-col">
                {/* TODO convert into mapper */}
                {chatHistory?.map((message) => {
                  return (
                    <>
                      <MessageContainer key={message.id} message={message} />
                      <MessageDivider />
                    </>
                  );
                }) || "Vazio"}
                {/*
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />
                <MessageDivider />
                <MessageContainer />*/}
              </div>
            </div>
          </div>

          {/* Message ChatBox */}
          <PanelLayout className="px-5 py-2 flex flex-row">
            <form onSubmit={send} className="flex flex-row w-full">
              <input
                type="text"
                name="content"
                id="text-box"
                // with border on input
                // className="w-full mr-4 bg-gray-200 rounded-2xl border border-gray-300 focus:border-gray-400 px-3 py-1"
                className="w-full mr-4 px-3 py-1"
              />
              <input type="submit" value="Enviar" />
            </form>
          </PanelLayout>
        </PanelLayout>
      </PanelContainer>
    </main>
  );
}

function MessageContainer({ message }: { message?: any }) {
  console.log(message);
  return (
    <section>
      <div className="flex flex-row mb-1.5 items-center">
        <Image
          src={message.user.avatar.url || "/decoy/profile_picture.jpg"}
          width={32}
          height={32}
          alt={"wawa"}
          className="mr-1 rounded-full"
        />
        <p className="text-black">{message.user.name}</p>
      </div>
      <div className="ml-9">{message.content}</div>
    </section>
  );
}

function MessageDivider() {
  return <div className="border-b border-gray-300 flex flex-col my-3" />;
}
