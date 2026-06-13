"use client";

import { useEffect, useState } from "react";

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
import { redirect } from "next/navigation";
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
              const formObj = FormUtils.toObject(form);
              let code = "";

              for (const [key, value] of Object.entries(formObj)) {
                console.log(value);
                code = code.concat(value);
              }
              console.log(FormUtils.toObject(form));
              console.log(code);
              const res = await AuthController.confirmRegistration(email, code);
              if (res) {
                const res = await UserController.authenticate(email, password);
                console.log(res);
                // if (res.success) {
                //   BrowserService.setToken({
                //     token: res.data.acessToken,
                //     expiration: res.data.expiresIn,
                //     user: {
                //       id: res.data.user.id,
                //     },
                //   });
                // }
                redirect("/login");
              }
            }}
          >
            <div
              className="
              flex
              justify-center
              gap-3
              mb-6
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
                  opacity-60
                  cursor-not-allowed
                "
                />
              ))}
            </div>

            {/* TODO:
              Implementar envio e validação do código.
              Atualmente a janela serve apenas como
              placeholder visual para o fluxo.
          */}

            <button
              type="submit"
              // disabled
              className="
              w-full
              py-3
              rounded-xl
              btn-primary
              opacity-50
            "
            >
              Confirmar Código
            </button>

            <button
              // disabled
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
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [showVerificationWindow, setShowVerificationWindow] = useState(false);

  useEffect(() => {
    if (state && state.success) {
    }
  }, [state]);

  const validateForm = (data: Record<string, string>) => {
    const hasAllFields =
      data.name &&
      data.cpf &&
      data.birthDate &&
      data.email &&
      data.password &&
      data.passConfirm &&
      data.phone;

    const cpfValid =
      data.cpf && MaskUtils.isValidCPF(MaskUtils.unmaskCPF(data.cpf));
    const phoneValid =
      data.phone && MaskUtils.isValidPhone(MaskUtils.unmaskPhone(data.phone));
    const emailValid = data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const passwordMatch =
      data.password && data.passConfirm && data.password === data.passConfirm;
    const ageValid =
      data.birthDate && MaskUtils.isAtLeast18(data.birthDate);

    return (
      hasAllFields &&
      cpfValid &&
      phoneValid &&
      emailValid &&
      passwordMatch &&
      ageValid
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setIsFormValid(validateForm(newFormData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
    }
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

        <FormContainer
          action={(form: FormData) => {
            setEmail(String(form.get("email")));
            setPass(String(form.get("password")));

            setShowVerificationWindow(true);
            dispatchAction(form);
          }}
        >
          <FormItem
            type="text"
            label="Nome Completo"
            name="name"
            placeholder="João da Silva"
            controller={state}
            onChange={handleFormChange}
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
              maxLength={11}
              controller={state}
              onChange={handleFormChange}
              // required
            />

            <div className="flex flex-col gap-2">
              <label className="text-muted text-sm">Gênero</label>

              <select 
                name="gender" 
                defaultValue="M" 
                className="app-input"
                onChange={(e) => handleFormChange(e as any)}
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
              onChange={handleFormChange}
              // required
            />

            <FormItem
              type="text"
              label="Telefone"
              name="phone"
              placeholder="(11) 99999-9999"
              mask={MaskUtils.maskPhone}
              maxLength={11}
              controller={state}
              onChange={handleFormChange}
              // required
            />
          </div>

          <div className="h-3" />

          <FormItem
            type="email"
            label="Email"
            name="email"
            placeholder="seu@email.com"
            controller={state}
            onChange={handleFormChange}
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
              onChange={handleFormChange}
              // required
            />

            <FormItem
              type="password"
              label="Confirmar Senha"
              name="passConfirm"
              placeholder="••••••••"
              controller={state}
              onChange={handleFormChange}
              // required
            />
          </div>

          <div className="h-3" />

          <div className="flex flex-col gap-2">
            <label className="text-muted text-sm">Foto de Perfil</label>

            <div className="relative">
              <input 
                type="file" 
                name="avatarUrl" 
                className="app-input cursor-pointer" 
                onChange={handleFileChange}
                accept="image/*"
              />
              {selectedFileName && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Imagem selecionada: <span className="font-semibold">{selectedFileName}</span>
                </p>
              )}
            </div>
          </div>

          <p className="text-rose-400">{state?.error?.message}</p>

          <button
            type="submit"
            disabled={pending || !isFormValid}
            // onClick={() => setShowVerificationWindow(true)}
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
