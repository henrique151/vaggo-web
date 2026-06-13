"use client";

import { useState, startTransition } from "react";
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    manufactureYear: "",
    type: "",
    size: "",
  });

  async function action(_state: unknown, form: FormData) {
    const res: ControllerStatusStructureInterface =
      await VehicleController.register(BrowserService.getToken(), form);
    if (res.success) {
      redirect(`/user/account`);
    }
    return res;
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Marca
    if (!formData.brand.trim()) newErrors.brand = "Marca é obrigatória.";
    else if (formData.brand.length > 30)
      newErrors.brand = "Marca pode possuir no máximo 30 caracteres.";

    // Modelo
    if (!formData.model.trim()) newErrors.model = "Modelo é obrigatório.";
    else if (formData.model.length > 50)
      newErrors.model = "Modelo pode possuir no máximo 50 caracteres.";

    // Cor
    if (!formData.color.trim()) newErrors.color = "Cor é obrigatória.";
    else if (formData.color.length > 30)
      newErrors.color = "Cor pode possuir no máximo 30 caracteres.";

    // Placa
    if (!formData.licensePlate.trim())
      newErrors.licensePlate = "Placa é obrigatória.";
    else if (formData.licensePlate.length > 7)
      newErrors.licensePlate = "Placa pode possuir no máximo 7 caracteres.";

    // Ano
    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.manufactureYear);
    if (!formData.manufactureYear.trim())
      newErrors.manufactureYear = "Ano de fabricação é obrigatório.";
    else if (isNaN(year) || year < 1900 || year > currentYear + 1)
      newErrors.manufactureYear = "Insira um ano de fabricação válido.";

    // Tipo
    if (!formData.type)
      newErrors.type = "Tipo de veículo é obrigatório.";

    // Porte
    if (!formData.size)
      newErrors.size = "Porte do veículo é obrigatório.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const form = new FormData();
    form.set("brand", formData.brand.trim());
    form.set("model", formData.model.trim());
    form.set("color", formData.color.trim());
    form.set("licensePlate", formData.licensePlate.trim().toUpperCase());
    form.set("manufactureYear", formData.manufactureYear);
    form.set("type", formData.type);
    form.set("size", formData.size);

    startTransition(() => {
      dispatchAction(form);
    });
  };

  return (
    <main>
      <InfoLayout
        title={"Registrar novo Veículo"}
        description={
          "Insira as informações de seu veículo para usar com a plataforma"
        }
      >
        <FormContainer onSubmit={handleFormSubmit}>
          <FormItem
            label={"Marca"}
            name={"brand"}
            type="text"
            className="mb-5"
            placeholder="CarroX"
            value={formData.brand}
            onChange={handleFormChange}
            maxLength={30}
            error={!!errors.brand}
            errorMessage={errors.brand}
          />

          <FormItem
            type="text"
            label={"Modelo"}
            name={"model"}
            className="mb-5"
            placeholder="Ex: Corolla"
            value={formData.model}
            onChange={handleFormChange}
            maxLength={50}
            error={!!errors.model}
            errorMessage={errors.model}
          />

          <FormItem
            type="text"
            label={"Cor"}
            name={"color"}
            className="mb-5"
            placeholder="Ex: Preto"
            value={formData.color}
            onChange={handleFormChange}
            maxLength={30}
            error={!!errors.color}
            errorMessage={errors.color}
          />

          <FormItem
            label={"Placa do Veículo"}
            name={"licensePlate"}
            type="text"
            className="mb-5"
            placeholder="Ex: BBA2B38"
            value={formData.licensePlate}
            onChange={handleFormChange}
            maxLength={7}
            error={!!errors.licensePlate}
            errorMessage={errors.licensePlate}
          />

          <FormItem
            type="number"
            label="Ano de Fabricação"
            name="manufactureYear"
            className="mb-5"
            placeholder="2000"
            value={formData.manufactureYear}
            onChange={handleFormChange}
            error={!!errors.manufactureYear}
            errorMessage={errors.manufactureYear}
          />

          <FormItem
            type="select"
            label="Tipo do Veículo"
            name="type"
            className="mb-5"
            items={[
              { value: "", label: "Selecione" },
              { value: "CARRO", label: "Carro" },
              { value: "MOTO", label: "Moto" },
            ]}
            value={formData.type}
            onChange={handleFormChange}
            error={!!errors.type}
            errorMessage={errors.type}
          />

          <FormItem
            type="select"
            label="Porte"
            name="size"
            className="mb-5"
            items={[
              { value: "", label: "Selecione" },
              { value: "PEQUENO", label: "Pequeno" },
              { value: "MEDIO", label: "Médio" },
              { value: "GRANDE", label: "Grande" },
            ]}
            value={formData.size}
            onChange={handleFormChange}
            error={!!errors.size}
            errorMessage={errors.size}
          />

          <p className="text-rose-400">{state?.error?.message}</p>

          <button
            type="submit"
            disabled={pending}
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
            {pending ? "Criando..." : "Criar"}
          </button>
        </FormContainer>
      </InfoLayout>
    </main>
  );
}
