"use client";
import BlurOverlay from "@/component/blur_overlay";
import PanelContainer from "@/component/container/PanelContainer";
import GenericWindow from "@/component/GenericWindow";
import PanelLayout from "@/component/layout/PanelLayout";
import FormItem from "@/component/ui/form/FormItem";
import { useGetChat } from "@/hooks/api/chat/useGetChat";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";
import { getChat, sendMessage } from "@/services/chat.service";
import { ReportController } from "@controllers";
import { BrowserService } from "@services";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

export default function Page() {
  const params = useParams() as unknown as { id: number };
  const [chat] = useGetChat(params.id);
  const [chatHistory, setChatHistory] = useState([]);
  const [reportWindow, setReportWindow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mantido caso você ainda precise usar dados da propriedade em outras áreas dessa página
  const [property, loaded, refreshSpots] = useGetPropertyDetails(
    params.id,
    true,
  );

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
    let intervalObj: any;
    const load = async () => {
      const interval = setInterval(async () => {
        const history = await getChat(params.id);
        console.log("refreshing chat history");
        setChatHistory(history.messages);
      }, 60000);
      return interval;
    };

    load().then((interval) => {
      intervalObj = interval;
    });

    return () => {
      clearInterval(intervalObj);
    };
  }, [params.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    console.log("CHAT COMPLETO:", chat);
  }, [chat]);

  function ReportWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const reason = (formData.get("reason") as string)?.trim() ?? "";

      if (!reason || reason.length < 5) {
        alert("Por favor, selecione um motivo válido para a denúncia.");
        return;
      }

      // 1. Pega os dados da sessão (retorna o objeto completo)
      const tokenData = BrowserService.getToken();
      let myUserId = null;

      // 2. Extrai o SEU ID dinamicamente de forma segura
      if (tokenData) {
        if (typeof tokenData === "object" && tokenData.user?.id) {
          // Se for um objeto (como nos logs), pegamos direto do .user.id
          myUserId = tokenData.user.id;
        } else if (typeof tokenData === "string") {
          // Fallback caso mude para string no futuro
          try {
            const payload = JSON.parse(atob(tokenData.split(".")[1]));
            myUserId = payload.id;
          } catch (error) {
            console.error("Erro ao decodificar string do token:", error);
          }
        }
      }

      if (!myUserId) {
        alert("Sua sessão expirou ou não foi possível identificar seu usuário.");
        return;
      }

      // 3. Procura nas mensagens o primeiro usuário que tenha um ID DIFERENTE do seu
      const reportedUserId = chat?.messages?.find(
        (msg: any) => msg?.user?.id && msg?.user?.id !== myUserId
      )?.user?.id;

      if (!reportedUserId) {
        alert("Erro: Não foi possível identificar a outra pessoa nesta conversa.");
        return;
      }

      try {
        // 4. Passamos o tokenData original exigido pelo seu ReportController
        const res = await ReportController.register(
          tokenData,
          "CHAT",
          Number(reportedUserId),
          formData,
        );

        if (res && res.success !== false) {
          setMessageState(true);
        } else {
          setMessageState(false);
        }
      } catch (err: any) {
        setMessageState(false);
      }
    };
    const messages: Record<string, React.ReactNode> = {
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
          <input
            type="hidden"
            name="targetId"
            value={String(params.id)}
          />

          <FormItem
            type="select"
            label="Qual motivo para a denúncia?"
            name="reason"
            items={[
              { value: "", label: "Selecione um motivo" },
              { value: "Comportamento Ofensivo", label: "O usuário foi muito grosseiro e usou palavrões no chat." },
              { value: "Fraude/Golpe", label: "Fraude/Golpe" },
              { value: "Conteúdo Inadequado", label: "Enviando links de propaganda e mensagens que não têm a ver com o imóvel." },
              { value: "Outro", label: "Outro" },
            ]}
          />

          <div className="h-4" />

          <FormItem
            type="text"
            label="Descrição (opcional)"
            name="description"
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
        <BlurOverlay show={true} onClick={() => { }} />
        <GenericWindow title={"Denúncia"} exitButton={true} onExit={onExit}>
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  return (
    <main className="p-8">
      <PanelContainer
        title={`Conversa sobre ${chat?.property?.name || "Propriedade"}`}
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
                [...chatHistory].sort((a: any, b: any) => a.id - b.id).map((message: any) => (
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
        src={message?.user?.avatar?.url || "/decoy/profile_picture.jpg"}
        width={32}
        height={32}
        alt={message?.user?.name || "User"}
        className="rounded-full shrink-0 mt-0.5"
      />
      <div className="flex flex-col max-w-[80%]">
        <p className="text-xs text-muted mb-0.5">{message?.user?.name}</p>
        <div className="rounded-2xl rounded-tl-sm surface-elevated px-3.5 py-2 text-sm text-primary">
          {message?.content}
        </div>
      </div>
    </div>
  );
}