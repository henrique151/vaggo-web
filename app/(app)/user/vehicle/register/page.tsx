"use client";

import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";
import useForm from "@/hooks/useForm";
import { VehicleController } from "@controllers";
import { ControllerStatusStructureInterface } from "@interfaces";
import { BrowserService } from "@services";
import { FormUtils } from "@utils";
import { redirect } from "next/navigation";

export default function Page() {
  const [state, dispatchAction, pending] = useForm(action);

  async function action(form: FormData) {
    console.log(FormUtils.toObject(form));
    const res: ControllerStatusStructureInterface =
      await VehicleController.register(BrowserService.getToken(), form);
    if (res.success) {
      redirect(`/user/account`);
    } else {
      return res;
    }
    return res;
  }

  return (
    <main>
      <InfoLayout
        title={"Registrar novo Veículo"}
        description={
          "Insira as informações de seu veículo para usar com a plataforma"
        }
      >
        <FormContainer action={dispatchAction}>
          <FormItem
            label={"Marca"}
            name={"brand"}
            type="text"
            className="mb-5"
            placeholder="CarroX"
            // required
          />

          <FormItem
            type="text"
            label={"Modelo"}
            name={"model"}
            className="mb-5"
            // required
          />

          <FormItem
            type="text"
            label={"Cor"}
            name={"color"}
            className="mb-5"
            // required
          />

          <FormItem
            label={"Placa do Veículo"}
            name={"licensePlate"}
            type="text"
            className="mb-5"
            // required
          />

          <FormItem
            type="number"
            label="Ano de Fabricação"
            name="manufactureYear"
            className="mb-5"
            placeholder="2000"
            // required
          />

          <FormItem
            type="select"
            label="Tipo do Veículo"
            name="type"
            className="mb-5"
            items={[
              { value: "CARRO", label: "Carro" },
              { value: "MOTO", label: "Moto" },
            ]}
            // required
          />

          <FormItem
            type="select"
            label="Porte"
            name="size"
            className="mb-5"
            items={[
              { value: "PEQUENO", label: "Pequeno" },
              { value: "MEDIO", label: "Médio" },
              { value: "GRANDE", label: "Grande" },
            ]}
            // required]
            controller={state}
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
