import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";

export default function Page() {
  return (
    <main>
      <InfoLayout
        title={"Registrar novas Vagas"}
        description={
          "Preencha o formulário para criar novas vagas para sua propriedade"
        }
      >
        <FormContainer>
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
            required
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
          />

          <FormItem
            type="text"
            label="Coloque formulário sobre período de data aqui"
            name="date"
            className="mb-5"
            multiple
          />

          <FormItem
            type="file"
            label="Imagem(ns) da(as) vaga(as)"
            name="images"
            className="mb-5"
            multiple
          />
        </FormContainer>
      </InfoLayout>
    </main>
  );
}
