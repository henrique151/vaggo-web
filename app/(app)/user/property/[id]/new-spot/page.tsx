"use client";
import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";
import { BrowserService, PropertyService } from "@services";
import { FormUtils } from "@utils";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams() as unknown as { id: number };

  return (
    <main>
      <InfoLayout
        title={"Registrar novas Vagas"}
        description={
          "Preencha o formulário para criar novas vagas para sua propriedade"
        }
      >
        <FormContainer
          action={async (form: FormData) => {
            const res = await PropertyService.generateSpots(
              BrowserService.getToken(),
              params.id,
              form,
            );
            // console.log(FormUtils.toObject(form));
            // console.log(params.id);
          }}
        >
          <FormItem
            label={"Quantidade"}
            name={"count"}
            type="number"
            className="mb-5"
            value="1"
            required
          />

          <FormItem
            type="text"
            label={"Tamanho da(as) vaga(as)"}
            name={"size"}
            className="mb-5"
            required
          />

          <FormItem
            label={"Preço Geral"}
            name={"price"}
            type="number"
            className="mb-5"
            required
          />

          <FormItem
            type="checkbox"
            label="Vaga coberta?"
            name="isCovered"
            className="mb-5"
            placeholder="10 Vagas"
          />

          <FormItem
            type="text"
            label="Prefixo da(as) Vaga(as)"
            name="prefix"
            className="mb-5"
            placeholder="Vaga-A"
            required
          />

          <FormItem
            type="text"
            label="Veículos Permitidos"
            name="allowedVehicles"
            className="mb-5"
            placeholder="CARRO OU MOTO"
            required
          />

          <FormItem
            type="text"
            label="Complemento (Opcional)"
            name="complement"
            className="mb-5"
            placeholder="Bloco #XX"
            required
          />

          <FormItem
            type="date"
            label="startDate"
            name="startDate"
            className="mb-5"
            required
          />

          <FormItem
            type="date"
            label="endDate"
            name="endDate"
            className="mb-5"
            required
          />

          <FormItem
            type="time"
            label="startTime"
            name="startTime"
            className="mb-5"
            required
          />

          <FormItem
            type="time"
            label="endTime"
            name="endTime"
            className="mb-5"
            required
          />

          <FormItem
            type="file"
            label="Imagem(ns) da(as) vaga(as)"
            name="images"
            className="mb-5"
            multiple
          />

          <button type="submit">Enviar</button>
        </FormContainer>
      </InfoLayout>
    </main>
  );
}
