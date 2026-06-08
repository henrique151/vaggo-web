"use client";
import BlurOverlay from "@/component/blur_overlay";
// import Message from "@/classes/Message";
import PanelContainer from "@/component/container/PanelContainer";
import GenericWindow from "@/component/GenericWindow";
import PanelLayout from "@/component/layout/PanelLayout";
import FormItem from "@/component/ui/form/FormItem";
import { useGetChat } from "@/hooks/api/chat/useGetChat";
import { getChat, sendMessage } from "@/services/chat.service";
import { sendReport } from "@/services/report.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

export default function Page() {
  const params = useParams() as unknown as { id: number };
  const [chat] = useGetChat(params.id);
  const [chatHistory, setChatHistory] = useState([]);
  const [reportWindow, setReportWindow] = useState(false);

  const send = async (e: any) => {
    e.preventDefault();
    const textMessageForm = e.currentTarget;
    const formData = new FormData(textMessageForm);

    // console.log(formData.get("message"));
    // if (document.getElementById("text-box").value == null) return null
    if (formData.get("content")) {
      const element = document.getElementById("text-box") as HTMLInputElement;
      console.log(formData.get("content"));
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

  useEffect(() => {
    let intervalObj;
    const load = async () => {
      const interval = setInterval(async () => {
        const history = await getChat(params.id);
        console.log("refreshing chat history");
        setChatHistory(history.messages);
      }, 60000);
    };

    load().then((interval) => {
      intervalObj = interval;
    });

    return () => {
      clearInterval(intervalObj);
    };
  }, []);

  function ReportWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const handleReport = async (e) => {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      const formData = new FormData(currentTarget);

      formData.set("targetId", String(params.id));

      // TODO get owner's user.id
      const res = await sendReport("CHAT", 2, formData);
      setMessageState(res);
    };
    const messages = {
      true: (
        <p>
          Sua denúncia foi enviada e será analisada por um de nossos
          administradores.
        </p>
      ),
      false: (
        <p>
          Houve um erro durante o envio da denúncia, tente novamente dentro de
          alguns minutos. Pedimos desculpas pelo transtorno.
        </p>
      ),
      undefined: (
        <form onSubmit={handleReport}>
          <FormItem
            type="text"
            label="Qual motivo para a denúncia?"
            name={"reason"}
          />

          <div className="h-4" />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-60"
          >
            Enviar
          </button>
        </form>
      ),
    };

    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />
        <GenericWindow title={"Denúncia"} exitButton={true} onExit={onExit}>
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  // console.log(chat);

  return (
    <main className="p-8">
      <PanelContainer
        title={`Conversa sobre ${chat?.property.name || "Propriedade"}`}
      >
        <button
          className="cursor-pointer text-sm text-red-300 mb-3"
          onClick={() => setReportWindow(true)}
        >
          Denunciar Conversa
        </button>
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

      {reportWindow && (
        <ReportWindow
          onExit={() => {
            setReportWindow(false);
          }}
        />
      )}
    </main>
  );
}

function MessageContainer({ message }: { message?: any }) {
  // console.log(message);
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
