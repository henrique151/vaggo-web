import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";

export default function Page() {
  return (
    <main>
      <InfoLayout
        title={"Registrar novo Veículo"}
        description={
          "Insira as informações de seu veículo para usar com a plataforma"
        }
      >
        <FormContainer>
          <FormItem
            label={"Marca"}
            name={"brand"}
            type="text"
            className="mb-5"
            placeholder="CarroX"
            required
          />

          <FormItem
            type="text"
            label={"Modelo"}
            name={"model"}
            className="mb-5"
            required
          />

          <FormItem
            label={"Placa do Veículo"}
            name={"licensePlate"}
            type="text"
            className="mb-5"
            required
          />

          <FormItem
            type="number"
            label="Ano de Fabricação"
            name="manufactureYear"
            className="mb-5"
            placeholder="2000"
            required
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
            required
          />

          <FormItem
            type="select"
            label="Porte"
            name="type"
            className="mb-5"
            items={[
              { value: "PEQUENO", label: "Pequeno" },
              { value: "MEDIO", label: "Médio" },
              { value: "GRANDE", label: "Grande" },
            ]}
            required
          />
        </FormContainer>
      </InfoLayout>
    </main>
  );
}
