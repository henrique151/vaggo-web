"use client";

import { useState, startTransition } from "react";
import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";
import useForm from "@/hooks/useForm";
import { PropertyController } from "@controllers";
import { ControllerStatusStructureInterface } from "@interfaces";
import { BrowserService } from "@services";
import { MaskUtils } from "@utils";
import { redirect } from "next/navigation";

export default function Page() {
  const [state, dispatchAction, pending] = useForm(action);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFileName, setImageFileName] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    type: "",
    description: "",
    totalCapacity: "",
    zipCode: "",
    number: "",
    complement: "",
  });

  async function action(_state: unknown, form: FormData) {
    const res: ControllerStatusStructureInterface =
      await PropertyController.register(BrowserService.getToken(), form);
    if (res?.success) {
      redirect(`/user/property/${res.data?.id}`);
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

    // Nome
    if (!formData.name.trim())
      newErrors.name = "Nome da propriedade é obrigatório.";
    else if (formData.name.length > 100)
      newErrors.name =
        "Nome da propriedade deve possuir no máximo 100 caracteres.";

    // Tipo
    if (!formData.type)
      newErrors.type = "Tipo de propriedade é obrigatório.";


    // Descrição
    if (!formData.description.trim())
      newErrors.description = "Descrição da propriedade é obrigatória.";
    else if (formData.description.length > 50)
      newErrors.description = "Descrição deve possuir no máximo 50 caracteres."

    // Capacidade
    const capacity = parseInt(formData.totalCapacity);
    if (!formData.totalCapacity.trim())
      newErrors.totalCapacity = "Capacidade é obrigatória.";
    else if (isNaN(capacity) || capacity < 0)
      newErrors.totalCapacity = "Capacidade deve ser um número válido.";
    else if (capacity > 30)
      newErrors.totalCapacity = "Capacidade máxima permitida é 30.";

    // CEP
    const cepUnmasked = MaskUtils.unmaskCEP(formData.zipCode);
    if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório.";
    else if (cepUnmasked.length !== 8) newErrors.zipCode = "CEP inválido.";

    // Número
    if (!formData.number.trim())
      newErrors.number = "Número é obrigatório.";
    else if (isNaN(Number(formData.number)))
      newErrors.number = "Número deve conter apenas dígitos.";

    // Imagem
    const fileInput = e.currentTarget.querySelector(
      'input[type="file"][name="images"]',
    ) as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      newErrors.images = "Imagem da propriedade é obrigatória.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const form = new FormData();
    form.set("name", formData.name.trim());
    form.set("type", formData.type);
    form.set("description", formData.description.trim());
    form.set("totalCapacity", formData.totalCapacity);
    form.set("zipCode", cepUnmasked);
    form.set("number", formData.number);
    form.set("complement", formData.complement.trim());
    if (fileInput?.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        form.append("images", fileInput.files[i]);
      }
    }

    startTransition(() => {
      dispatchAction(form);
    });
  };

  return (
    <main>
      <InfoLayout
        title={"Registrar nova Propriedade"}
        description={
          "Preencha os dados a seguir para registrar uma nova propriedade"
        }
      >
        <FormContainer onSubmit={handleFormSubmit}>
          <FormItem
            label={"Nome da Propriedade"}
            name={"name"}
            placeholder="Propriedade Fulano de Tal"
            className="mb-5"
            value={formData.name}
            onChange={handleFormChange}
            maxLength={100}
            error={!!errors.name}
            errorMessage={errors.name}
          />

          <FormItem
            type="select"
            items={[
              { label: "Selecione", value: "" },
              { label: "Residencial", value: "Residencial" },
              { label: "Comercial", value: "Comercial" },
            ]}
            label={"Tipo de Propriedade"}
            name={"type"}
            className="mb-5"
            value={formData.type}
            onChange={handleFormChange}
            error={!!errors.type}
            errorMessage={errors.type}
          />

          <FormItem
            label={"Descrição"}
            name={"description"}
            placeholder="Casa com boa cobertura e perto de diversos lugares"
            className="mb-5"
            value={formData.description}
            onChange={handleFormChange}
            error={!!errors.description}
            errorMessage={errors.description}
          />

          <FormItem
            type="number"
            label="Capacidade"
            name="totalCapacity"
            className="mb-5"
            placeholder="10"
            value={formData.totalCapacity}
            onChange={handleFormChange}
            error={!!errors.totalCapacity}
            errorMessage={errors.totalCapacity}
          />

          <FormItem
            type="text"
            label="CEP"
            name="zipCode"
            className="mb-5"
            placeholder="08050-150"
            mask={MaskUtils.maskCEP}
            maxLength={9}
            value={formData.zipCode}
            onChange={handleFormChange}
            error={!!errors.zipCode}
            errorMessage={errors.zipCode}
          />

          <FormItem
            type="number"
            label="Número"
            name="number"
            className="mb-5"
            placeholder="48"
            value={formData.number}
            onChange={handleFormChange}
            error={!!errors.number}
            errorMessage={errors.number}
          />

          <FormItem
            type="text"
            label="Complemento (Opcional)"
            name="complement"
            className="mb-5"
            placeholder="Bloco XX"
            value={formData.complement}
            onChange={handleFormChange}
          />

          <div className="flex flex-col gap-2 mb-5">
            <label className="text-muted text-sm">Imagem</label>
            <input
              type="file"
              name="images"
              className="app-input px-4 py-3 rounded-lg border-base"
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const names = Array.from(e.target.files)
                    .map((f) => f.name)
                    .join(", ");
                  setImageFileName(names);
                } else {
                  setImageFileName("");
                }
                if (errors.images) {
                  setErrors((prev) => ({ ...prev, images: "" }));
                }
              }}
            />
            {imageFileName && (
              <span className="text-sm text-primary">
                Imagem selecionada: {imageFileName}
              </span>
            )}
            {errors.images && (
              <p className="text-xs text-rose-500">{errors.images}</p>
            )}
          </div>

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
