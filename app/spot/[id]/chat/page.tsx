import Message from "@/classes/Message";
import PanelContainer from "@/component/container/PanelContainer";
import PanelLayout from "@/component/layout/PanelLayout";
import Image from "next/image";

export default function Page() {
  return (
    <main className="p-8">
      <PanelContainer title="Conversa com [Usuário da Vaga/Propriedade]">
        <PanelLayout className="px-10 py-2 pb-5 flex flex-col">
          {/* Message tree */}
          <div className="p-2">
            <div className="overflow-y-auto h-120 mb-3 scroll-smooth">
              <div className="border-b border-gray-300 flex flex-col">
                {/* TODO convert into mapper */}
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
                <MessageContainer />
              </div>
            </div>
          </div>

          {/* Message ChatBox */}
          <PanelLayout className="px-5 py-2 flex flex-row">
            <input
              type="text"
              name="chatMessage"
              // with border on input
              // className="w-full mr-4 bg-gray-200 rounded-2xl border border-gray-300 focus:border-gray-400 px-3 py-1"
              className="w-full mr-4 px-3 py-1"
            />
            <input type="submit" value="Enviar" />
          </PanelLayout>
        </PanelLayout>
      </PanelContainer>
    </main>
  );
}

function MessageContainer({ message }: { message?: any }) {
  return (
    <section>
      <div className="flex flex-row mb-1.5 items-center">
        <Image
          src={"/decoy/profile_picture.jpg"}
          width={32}
          height={32}
          alt={"wawa"}
          className="mr-1 rounded-full"
        />
        <p className="text-black">Nome do Usuário</p>
      </div>
      <div className="ml-9">Conteúdo da Mensagem</div>
    </section>
  );
}

function MessageDivider() {
  return <div className="border-b border-gray-300 flex flex-col my-3" />;
}
