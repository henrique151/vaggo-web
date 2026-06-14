"use client";
import BlurOverlay from "@/component/blur_overlay";
import PanelContainer from "@/component/container/PanelContainer";
import GenericWindow from "@/component/GenericWindow";
import PanelLayout from "@/component/layout/PanelLayout";
import FormItem from "@/component/ui/form/FormItem";
import { useGetChat } from "@/hooks/api/chat/useGetChat";
import { getChat, sendMessage } from "@/services/chat.service";
import { sendReport } from "@/services/report.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

export default function Page() {
  const params = useParams() as unknown as { id: number };
  const [chat] = useGetChat(params.id);
  const [chatHistory, setChatHistory] = useState([]);
  const [reportWindow, setReportWindow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async (e: any) => {
    e.preventDefault();
    const textMessageForm = e.currentTarget;
    const formData = new FormData(textMessageForm);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

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
        <p className="text-sm text-muted">
          Sua denúncia foi enviada e será analisada por um de nossos
          administradores.
        </p>
      ),
      false: (
        <p className="text-sm text-muted">
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
            className="w-full py-3 rounded-lg font-medium text-white btn-primary btn-hover transition disabled:opacity-60"
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

  return (
    <main className="p-8">
      <PanelContainer
        title={`Conversa sobre ${chat?.property.name || "Propriedade"}`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted">
            {chatHistory?.length || 0}{" "}
            {chatHistory?.length === 1 ? "mensagem" : "mensagens"}
          </span>
          <button
            className="cursor-pointer text-sm text-rose-400 hover:text-rose-500 transition-colors"
            onClick={() => setReportWindow(true)}
          >
            Denunciar conversa
          </button>
        </div>

        <PanelLayout className="px-6 py-4 flex flex-col">
          <div
            ref={scrollRef}
            className="overflow-y-auto h-120 mb-3 scroll-smooth pr-2"
          >
            <div className="flex flex-col gap-3">
              {chatHistory?.length ? (
                [...chatHistory].sort((a, b) => a.id - b.id).map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              ) : (
                <p className="text-sm text-muted text-center py-8">
                  Nenhuma mensagem ainda. Diga olá!
                </p>
              )}
            </div>
          </div>

          <form onSubmit={send} className="flex flex-row gap-2 pt-3 border-t border-soft">
            <input
              type="text"
              name="content"
              id="text-box"
              placeholder="Escreva uma mensagem..."
              className="app-input w-full"
            />
            <input
              type="submit"
              value="Enviar"
              className="px-5 py-2 rounded-full text-sm font-medium text-white btn-primary btn-hover transition cursor-pointer"
            />
          </form>
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

function MessageBubble({ message }: { message?: any }) {
  return (
    <div className="flex items-start gap-2.5">
      <Image
        src={message.user.avatar.url || "/decoy/profile_picture.jpg"}
        width={32}
        height={32}
        alt={message.user.name}
        className="rounded-full shrink-0 mt-0.5"
      />
      <div className="flex flex-col max-w-[80%]">
        <p className="text-xs text-muted mb-0.5">{message.user.name}</p>
        <div className="rounded-2xl rounded-tl-sm surface-elevated px-3.5 py-2 text-sm text-primary">
          {message.content}
        </div>
      </div>
    </div>
  );
}