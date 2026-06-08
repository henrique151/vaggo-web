import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";

export default function Page() {
  return (
    <InfoLayout
      title={"Template Test Page"}
      description={
        "Hello! This is a pre-made layout for configuring thingies and whole lot others!"
      }
    >
      <FormContainer>
        <FormItem
          type="text"
          label={"Nome da Propriedade"}
          name={"propertyName"}
          value="mango"
          className="mb-10"
        />

        <FormItem
          type="select"
          items={[{ label: "Residencial", value: "Residencial" }]}
          label={"Tipo"}
          name={"thingies"}
          className="mb-10"
        />

        <FormItem type="number" label="Capacidade" name="capacity" />
      </FormContainer>
    </InfoLayout>
  );
}
