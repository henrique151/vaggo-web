"use client";
import { useState, startTransition } from "react";
import FormContainer from "@/component/container/FormContainer";
import InfoLayout from "@/component/layout/InfoLayout";
import FormItem from "@/component/ui/form/FormItem";
import { BrowserService, PropertyService } from "@services";
import { useParams, useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import { usePageContext } from "../_context/page.context";

export default function Page() {
  const params = useParams() as unknown as { id: number };
  const { property } = usePageContext();
  const router = useRouter();

  const [state, dispatchAction, pending] = useForm(action);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFileName, setImageFileName] = useState<string>("");

  const [formData, setFormData] = useState({
    count: "1",
    size: "",
    price: "",
    isCovered: false,
    prefix: "",
    allowedVehicles: "",
    complement: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  async function action(_state: unknown, form: FormData) {
    const res = await PropertyService.generateSpots(
      BrowserService.getToken(),
      params.id,
      form,
    );
    if (res?.success) {
      router.push(`/user/property/${params.id}`);
    }
    return res;
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Quantidade de Vagas
    const count = parseInt(formData.count);
    if (!formData.count.trim()) {
      newErrors.count = "Quantidade de vagas é obrigatória.";
    } else if (isNaN(count) || count <= 0) {
      newErrors.count = "A quantidade deve ser um número inteiro maior que zero.";
    } else if (property?.info?.totalCapacity) {
      // Verificação de Limite usando totalCapacity da propriedade
      // Se não houver spots carregados, podemos verificar apenas com o count e a capacidade.
      // Assumindo property.spots se disponível
      const currentSpots = property.spots?.length || 0;
      if (currentSpots + count > property.info.totalCapacity) {
        newErrors.count = "Você atingiu o limite máximo de vagas permitido.";
      }
    }

    // Tamanho da Vaga
    const size = parseFloat(formData.size);
    if (!formData.size.trim()) {
      newErrors.size = "Tamanho da vaga é obrigatório.";
    } else if (isNaN(size) || size <= 0) {
      newErrors.size = "Informe um tamanho válido.";
    }

    // Preço Geral
    const price = parseFloat(formData.price);
    if (!formData.price.trim()) {
      newErrors.price = "Preço é obrigatório.";
    } else if (isNaN(price) || price <= 0) {
      newErrors.price = "Preço deve ser um número válido e maior que zero.";
    }

    // Prefixo
    if (!formData.prefix.trim()) {
      newErrors.prefix = "Prefixo da vaga é obrigatório.";
    } else if (formData.prefix.length > 50) {
      newErrors.prefix = "Prefixo da vaga deve possuir no máximo 50 caracteres.";
    }

    // Veículos Permitidos
    if (!formData.allowedVehicles) {
      newErrors.allowedVehicles = "Selecione um veículo permitido.";
    } else if (!["CARRO", "MOTO"].includes(formData.allowedVehicles)) {
      newErrors.allowedVehicles = "Selecione um veículo permitido.";
    }

    // Data Inicial
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDateParsed: Date | null = null;
    let endDateParsed: Date | null = null;

    if (!formData.startDate) {
      newErrors.startDate = "Data inicial é obrigatória.";
    } else {
      const [year, month, day] = formData.startDate.split("-").map(Number);
      startDateParsed = new Date(year, month - 1, day);
      if (startDateParsed < today) {
        newErrors.startDate = "A data inicial não pode ser anterior à data atual.";
      }
    }

    // Data Final
    if (!formData.endDate) {
      newErrors.endDate = "Data final é obrigatória.";
    } else {
      const [year, month, day] = formData.endDate.split("-").map(Number);
      endDateParsed = new Date(year, month - 1, day);
      if (startDateParsed && endDateParsed <= startDateParsed) {
        newErrors.endDate = "A data final deve ser maior que a data inicial.";
      }
    }

    // Horas
    if (!formData.startTime) {
      newErrors.startTime = "Hora inicial é obrigatória.";
    }

    if (!formData.endTime) {
      newErrors.endTime = "Hora final é obrigatória.";
    } else if (formData.startTime && formData.endTime <= formData.startTime) {
      newErrors.endTime = "Hora final deve ser maior que a hora inicial.";
    }

    // Imagem
    const fileInput = e.currentTarget.querySelector(
      'input[type="file"][name="images"]',
    ) as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      newErrors.images = "Imagem é obrigatória.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const form = new FormData();
    form.set("count", formData.count);
    form.set("size", formData.size);
    form.set("price", formData.price);
    form.set("isCovered", formData.isCovered ? "true" : "false");
    form.set("prefix", formData.prefix.trim());
    form.set("allowedVehicles", formData.allowedVehicles);
    
    const availability = {
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      startTime: formData.startTime || "00:00:00",
      endTime: formData.endTime || "23:59:59",
    };
    
    form.set("availability", JSON.stringify(availability));
    
    // O backend não aceita 'complement' na criação de Vagas, então não o enviamos.
    // if (formData.complement.trim()) {
    //   form.set("complement", formData.complement.trim());
    // }

    if (fileInput?.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        form.append("images", fileInput.files[i]);
      }
    }

    startTransition(() => {
      dispatchAction(form);
    });
  };

  // Mapear os erros que vieram da API e não foram tratados nos campos acima (ex: complemento que não existe, data inválida no backend, etc)
  const apiErrors = state?.errors || state?.error?.data?.errors;
  const mainApiMessage = state?.message || state?.error?.message;

  return (
    <main>
      <InfoLayout
        title={"Registrar novas Vagas"}
        description={
          "Preencha o formulário para criar novas vagas para sua propriedade"
        }
      >
        <FormContainer onSubmit={handleFormSubmit}>
          <FormItem
            label={"Quantidade"}
            name={"count"}
            type="number"
            className="mb-5"
            value={formData.count}
            onChange={handleFormChange}
            error={!!errors.count}
            errorMessage={errors.count}
          />

          <FormItem
            type="text"
            label={"Tamanho da(as) vaga(as)"}
            name={"size"}
            placeholder="Ex: 10.5"
            className="mb-5"
            value={formData.size}
            onChange={handleFormChange}
            error={!!errors.size}
            errorMessage={errors.size}
          />

          <FormItem
            label={"Preço Geral"}
            name={"price"}
            type="number"
            placeholder="Ex: 25.00"
            className="mb-5"
            value={formData.price}
            onChange={handleFormChange}
            error={!!errors.price}
            errorMessage={errors.price}
          />

          <FormItem
            type="select"
            label="Vaga coberta?"
            name="isCovered"
            className="mb-5"
            items={[
              { label: "Selecione", value: "" },
              { label: "Sim, é coberta", value: "true" },
              { label: "Não, é descoberta", value: "false" },
            ]}
            value={formData.isCovered ? "true" : "false"}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                isCovered: e.target.value === "true",
              }));
              if (errors.isCovered) {
                setErrors((prev) => ({ ...prev, isCovered: "" }));
              }
            }}
            error={!!errors.isCovered}
            errorMessage={errors.isCovered}
          />

          <FormItem
            type="text"
            label="Prefixo da(as) Vaga(as)"
            name="prefix"
            className="mb-5"
            placeholder="Vaga-A"
            maxLength={50}
            value={formData.prefix}
            onChange={handleFormChange}
            error={!!errors.prefix}
            errorMessage={errors.prefix}
          />

          <FormItem
            type="select"
            label="Veículos Permitidos"
            name="allowedVehicles"
            className="mb-5"
            items={[
              { label: "Selecione", value: "" },
              { label: "Carro", value: "CARRO" },
              { label: "Moto", value: "MOTO" },
            ]}
            value={formData.allowedVehicles}
            onChange={handleFormChange}
            error={!!errors.allowedVehicles}
            errorMessage={errors.allowedVehicles}
          />

          <FormItem
            type="text"
            label="Complemento (Opcional)"
            name="complement"
            className="mb-5"
            placeholder="Bloco #XX"
            value={formData.complement}
            onChange={handleFormChange}
            error={!!errors.complement}
            errorMessage={errors.complement}
          />

          <FormItem
            type="date"
            label="Data Inicial"
            name="startDate"
            className="mb-5"
            value={formData.startDate}
            onChange={handleFormChange}
            error={!!errors.startDate}
            errorMessage={errors.startDate}
          />

          <FormItem
            type="date"
            label="Data Final"
            name="endDate"
            className="mb-5"
            value={formData.endDate}
            onChange={handleFormChange}
            error={!!errors.endDate}
            errorMessage={errors.endDate}
          />

          <FormItem
            type="time"
            label="Hora Inicial"
            name="startTime"
            className="mb-5"
            value={formData.startTime}
            onChange={handleFormChange}
            error={!!errors.startTime}
            errorMessage={errors.startTime}
          />

          <FormItem
            type="time"
            label="Hora Final"
            name="endTime"
            className="mb-5"
            value={formData.endTime}
            onChange={handleFormChange}
            error={!!errors.endTime}
            errorMessage={errors.endTime}
          />

          <div className="flex flex-col gap-2 mb-5">
            <label className="text-muted text-sm">Imagem(ns) da(as) vaga(as)</label>
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

          {(mainApiMessage || (apiErrors && Array.isArray(apiErrors) && apiErrors.length > 0)) && (
            <div className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
              {mainApiMessage && <p className="text-rose-500 font-medium mb-1">{mainApiMessage}</p>}
              {apiErrors && Array.isArray(apiErrors) && apiErrors.map((err: any, idx: number) => (
                <p key={idx} className="text-sm text-rose-400">
                  • {err.field ? `[${err.field}]: ` : ""}{err.message}
                </p>
              ))}
            </div>
          )}

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
            {pending ? "Criando..." : "Criar Vaga"}
          </button>
        </FormContainer>
      </InfoLayout>
    </main>
  );
}
