"use client";

import { useEffect, useState, startTransition } from "react";

import Image from "next/image";
import Link from "next/link";

import background from "@/public/vaggoLoginTest.png";
import loginLogo from "@/public/assets/logo/logo_single/v1.png";

import FormContainer from "@/component/container/FormContainer";
import FormItem from "@/component/ui/form/FormItem";

import GenericWindow from "@/component/GenericWindow";
import BlurOverlay from "@/component/blur_overlay";

import action from "./register.action";
import useForm from "@/hooks/useForm";
import { FormUtils, MaskUtils } from "@utils";
import { AuthController, UserController } from "@controllers";
import { redirect, useRouter } from "next/navigation";
import { BrowserService } from "@services";

function VerificationCodeWindow({
  email,
  password,
  onClose,
}: {
  email: string;
  password: string;
  onClose: () => void;
}) {
  const [codeError, setCodeError] = useState("");
  const router = useRouter();

  return (
    <>
      <BlurOverlay show={true} onClick={() => {}} />

      <GenericWindow
        title="Confirmar Cadastro"
        exitButton={true}
        onExit={onClose}
      >
        <div className="w-full max-w-md">
          <p
            className="
              text-center
              text-muted
              mb-6
            "
          >
            Digite o código de 6 dígitos enviado para seu celular.
          </p>

          <FormContainer
            action={async (form: FormData) => {
              setCodeError("");
              let code = "";

              for (let i = 0; i < 6; i++) {
                code += (form.get(`code_${i}`) as string) || "";
              }
              
              console.log("Código enviado:", code);

              try {
                const res = await AuthController.confirmRegistration(email, code);
                console.log("Resposta da API:", res);
                if (res && res.success !== false) {
                  const authRes = await UserController.authenticate(email, password);
                  console.log("Autenticação finalizada:", authRes);
                  router.push("/login");
                } else {
                  console.log("Falha de validação da API");
                  setCodeError("Código incorreto. Confira o código recebido e tente novamente.");
                }
              } catch (error) {
                console.log("Erro capturado:", error);
                setCodeError("Não foi possível validar o código no momento. Tente novamente.");
              }
            }}
          >
            <div
              className="
              flex
              justify-center
              gap-3
              mb-2
            "
            >
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code_${index}`}
                  maxLength={1}
                  className="
                  w-12
                  h-14
                  rounded-xl
                  border
                  border-soft
                  bg-card
                  text-center
                  text-xl
                "
                />
              ))}
            </div>

            <div className="h-4 flex items-center justify-center mb-4">
              {codeError && (
                <p className="text-xs text-rose-500">{codeError}</p>
              )}
            </div>

            <button
              type="submit"
              className="
              w-full
              py-3
              rounded-xl
              btn-primary
            "
            >
              Confirmar Código
            </button>

            <button
              type="button"
              className="
              w-full
              mt-3
              text-sm
              text-muted
              opacity-50
            "
            >
              Reenviar Código
            </button>
          </FormContainer>
        </div>
      </GenericWindow>
    </>
  );
}

export default function Page() {
  const [state, dispatchAction, pending] = useForm(action);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    cpf: "",
    gender: "M",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
    passConfirm: "",
  });

  const [showVerificationWindow, setShowVerificationWindow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarFileName, setAvatarFileName] = useState<string>("");

  useEffect(() => {
    if (state && state.success) {
    }
  }, [state]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validar campos obrigatórios
    if (!formData.name) newErrors.name = "Nome é obrigatório.";
    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório.";
    if (!formData.birthDate) newErrors.birthDate = "Data de nascimento é obrigatória.";
    if (!formData.phone) newErrors.phone = "Telefone é obrigatório.";
    if (!formData.email) newErrors.email = "Email é obrigatório.";
    if (!formData.password) newErrors.password = "Senha é obrigatória.";
    if (!formData.passConfirm) newErrors.passConfirm = "Confirmação de senha é obrigatória.";

    // Validar CPF
    const cpfUnmasked = MaskUtils.unmaskCPF(formData.cpf);
    if (formData.cpf && cpfUnmasked.length !== 11) {
      newErrors.cpf = "CPF inválido. Deve conter 11 dígitos.";
    }

    // Validar telefone
    let phoneUnmasked = MaskUtils.unmaskPhone(formData.phone);
    if (formData.phone && !MaskUtils.isValidPhone(phoneUnmasked)) {
      newErrors.phone = "Telefone inválido. Deve ter entre 10 e 15 dígitos.";
    }

    // Validar email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido. Por favor, verifique.";
    }

    // Validar senhas
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres.";
    }

    if (formData.passConfirm && formData.password !== formData.passConfirm) {
      newErrors.passConfirm = "As senhas não conferem.";
    }

    // Validar idade
    if (formData.birthDate && !MaskUtils.isAtLeast18(formData.birthDate)) {
      newErrors.birthDate = "Você deve ter no mínimo 18 anos para criar uma conta.";
    }

    // Validar foto de perfil
    const fileInput = e.currentTarget.querySelector(
      'input[type="file"][name="avatarUrl"]',
    ) as HTMLInputElement;

    if (!fileInput?.files?.[0]) {
      newErrors.avatarUrl = "Foto de perfil é obrigatória.";
    }



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (!phoneUnmasked.startsWith("55")) {
      phoneUnmasked = "55" + phoneUnmasked;
    }

    // Tudo validado, criar FormData e enviar
    const form = new FormData();
    form.set("name", formData.name);
    form.set("cpf", cpfUnmasked);
    form.set("gender", formData.gender);
    form.set("birthDate", formData.birthDate);
    form.set("phone", phoneUnmasked);
    form.set("email", formData.email);
    form.set("password", formData.password);
    form.set("passConfirm", formData.passConfirm);
    if (fileInput?.files?.[0]) {
      form.set("avatarUrl", fileInput.files[0]);
    }

    // Enviar dados
    setEmail(formData.email);
    setPass(formData.password);
    setShowVerificationWindow(true);
    startTransition(() => {
      dispatchAction(form);
    });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src={background}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

      {/* Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-lg
          mx-auto
          surface-elevated
          rounded-4xl
          p-8
          md:p-10
          overflow-auto
          max-h-[90vh]
        "
      >
        {/* Logo */}
        <div className="w-full flex flex-col items-center">
          <Image
            src={loginLogo}
            alt="Logo da Vaggo"
            width={86}
            height={86}
            className="object-cover"
          />
        </div>

        <div className="h-6" />

        <h1 className="text-primary text-3xl text-center">Criar Conta</h1>

        <div className="h-6" />

        <FormContainer onSubmit={handleFormSubmit}>
          <FormItem
            type="text"
            label="Nome Completo"
            name="name"
            placeholder="João da Silva"
            controller={state}
            value={formData.name}
            onChange={handleFormChange}
            error={!!errors.name}
            errorMessage={errors.name}
          // required
          />

          <div className="h-3" />

          <div className="grid grid-cols-2 gap-4">
            <FormItem
              type="text"
              label="CPF"
              name="cpf"
              placeholder="000.000.000-00"
              mask={MaskUtils.maskCPF}
              maxLength={15}
              controller={state}
              value={formData.cpf}
              onChange={handleFormChange}
              error={!!errors.cpf}
              errorMessage={errors.cpf}
            // required
            />

            <div className="flex flex-col gap-2">
              <label className="text-muted text-sm">Gênero</label>

              <select
                name="gender"
                value={formData.gender}
                className="app-input"
                onChange={handleFormChange}
              >
                <option value="M">Masculino</option>

                <option value="F">Feminino</option>

                <option value="O">Outro</option>
              </select>
            </div>
          </div>

          <div className="h-3" />

          <div className="grid grid-cols-2 gap-4">
            <FormItem
              type="date"
              label="Nascimento"
              name="birthDate"
              controller={state}
              value={formData.birthDate}
              onChange={handleFormChange}
              error={!!errors.birthDate}
              errorMessage={errors.birthDate}
            // required
            />

            <FormItem
              type="text"
              label="Telefone"
              name="phone"
              placeholder="(11) 99999-9999"
              mask={MaskUtils.maskPhone}
              maxLength={15}
              controller={state}
              value={formData.phone}
              onChange={handleFormChange}
              error={!!errors.phone}
              errorMessage={errors.phone}
            // required
            />
          </div>

          <div className="h-3" />

          <FormItem
            type="email"
            label="Email"
            name="email"
            placeholder="seu@email.com"
            mask={MaskUtils.maskEmail}
            controller={state}
            value={formData.email}
            onChange={handleFormChange}
            error={!!errors.email}
            errorMessage={errors.email}
          // required
          />

          <div className="h-3" />

          <div className="grid grid-cols-2 gap-4">
            <FormItem
              type="password"
              label="Senha"
              name="password"
              placeholder="••••••••"
              controller={state}
              value={formData.password}
              onChange={handleFormChange}
              error={!!errors.password}
              errorMessage={errors.password}
            // required
            />

            <FormItem
              type="password"
              label="Confirmar Senha"
              name="passConfirm"
              placeholder="••••••••"
              controller={state}
              value={formData.passConfirm}
              onChange={handleFormChange}
              error={!!errors.passConfirm}
              errorMessage={errors.passConfirm}
            // required
            />
          </div>

          <div className="h-3" />

          <div className="flex flex-col gap-2">
            <label className="text-muted text-sm">Foto de Perfil</label>

            <input
              type="file"
              name="avatarUrl"
              className="app-input"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAvatarFileName(e.target.files[0].name);
                } else {
                  setAvatarFileName("");
                }
              }}
            />
            {avatarFileName && (
              <span className="text-sm text-primary">Imagem selecionada: {avatarFileName}</span>
            )}
            {errors.avatarUrl && (
              <p className="text-xs text-rose-500">{errors.avatarUrl}</p>
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
            {pending ? "Criando conta..." : "Criar Conta"}
          </button>
        </FormContainer>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="
              text-muted
              text-link
              transition-colors
            "
          >
            Já possui uma conta? Entrar
          </Link>
        </div>
      </div>

      {showVerificationWindow && (
        <VerificationCodeWindow
          onClose={() => setShowVerificationWindow(false)}
          email={email}
          password={pass}
        />
      )}
    </main>
  );
}
