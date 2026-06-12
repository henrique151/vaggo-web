"use client";
import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";
import { PropertyController } from "@controllers";
import {
  ControllerStatusClassInterface,
  ControllerStatusStructureInterface,
} from "@interfaces";
import { BrowserService } from "@services";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <main>
      <InfoLayout
        title={"Registrar nova Propriedade"}
        description={
          "Preencha os dados a seguir para registrar uma nova propriedade"
        }
      >
        <FormContainer
          action={async (form: FormData) => {
            const res: ControllerStatusStructureInterface =
              await PropertyController.register(
                BrowserService.getToken(),
                form,
              );
            if (res.success) {
              redirect(`/user/property/${res.data.id}`);
            }
          }}
        >
          <FormItem
            label={"Nome da Propriedade"}
            name={"name"}
            placeholder="Propriedade Fulano de Tal"
            className="mb-5"
            required
          />

          <FormItem
            type="select"
            items={[
              { label: "Residencial", value: "Residencial" },
              { label: "Comercial", value: "Comercial" },
            ]}
            label={"Tipo de Propriedade"}
            name={"type"}
            className="mb-5"
            required
          />

          <FormItem
            label={"Descrição"}
            name={"description"}
            placeholder="Casa com boa cobertura e perto de diversos lugares"
            className="mb-5"
            required
          />

          <FormItem
            type="number"
            label="Capacidade"
            name="totalCapacity"
            className="mb-5"
            placeholder="10 Vagas"
            required
          />

          <FormItem
            type="number"
            label="Número"
            name="number"
            className="mb-5"
            placeholder="3001"
            required
          />

          <FormItem
            type="number"
            label="CEP"
            name="zipCode"
            className="mb-5"
            placeholder="0100100-000"
            required
          />

          <FormItem
            type="text"
            label="Complemento (Opcional)"
            name="complement"
            className="mb-5"
            placeholder="Bloco #XX"
          />

          <FormItem
            type="file"
            label="Imagem"
            name="images"
            className="mb-5"
            multiple
          />

          <button
            type="submit"
            disabled={false}
            className="
              mt-8
              py-3
              rounded-lg
              font-medium
              text-white
              btn-primary
              btn-hover
              transition
              disabled:opacity-60
              w-full
            "
          >
            Criar
          </button>
        </FormContainer>
      </InfoLayout>
    </main>
  );
}
