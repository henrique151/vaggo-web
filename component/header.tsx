"use client";

import { useState } from "react";
import SearchBar from "./search_bar";
import LoginCard from "./login_card";
import BlurOverlay from "./blur_overlay";
import * as api from "@/app/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  showSearch?: boolean;
}

export default function Header({ showSearch = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as {
      email: string;
      pass: string;
    };

    delete (values as any).passConfirm;

    const res = (await api.call("users/login", false, {
      body: JSON.stringify(values),
      dataOnly: true,
      contentType: "json",
      method: "POST",
    })) as any;
    console.log(res);
    console.log("Login enviado");
    setShowLogin(false);

    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user.id);
    // console.log(localStorage)

    router.push("/user/dashboard");
  }

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-white to-gray-100 border-b border-gray-200">
        <div className="container-default flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/icons/globe.ico" width={28} height={28} alt="Logo" />
            <span className="font-semibold text-lg">Vaggo</span>
          </Link>

          {/* Search */}
          {showSearch && (
            <div className="flex-1 max-w-xl">
              <SearchBar />
            </div>
          )}

          {/* Menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpen(!open)}
              className="
                flex items-center justify-center
                w-10 h-10
                border border-gray-200
                bg-gray-100
                rounded-full
                shadow-sm
                hover:bg-gray-200 hover:shadow-md
                transition-all duration-200
              "
            >
              <div className="flex flex-col gap-[3px]">
                <span className="w-4 h-[2px] bg-gray-700"></span>
                <span className="w-4 h-[2px] bg-gray-700"></span>
                <span className="w-4 h-[2px] bg-gray-700"></span>
              </div>
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className="
                  absolute right-0 mt-2
                  w-52
                  bg-white
                  border border-gray-200
                  rounded-xl
                  shadow-lg
                  overflow-hidden
                "
              >
                {!localStorage.getItem("token") ? (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setOpen(false);
                    }}
                    className="
                    w-full text-left
                    px-4 py-3 text-sm
                    hover:bg-gray-100
                    transition
                  "
                  >
                    Entrar ou Cadastrar-se
                  </button>
                ) : null}

                {localStorage.getItem("token") ? (
                  <>
                    <Link
                      href="/user/dashboard"
                      className="
                        block px-4 py-3 text-sm
                        hover:bg-gray-100
                        transition
                      "
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/user/account"
                      className="
                    block px-4 py-3 text-sm
                    hover:bg-gray-100
                    transition
                  "
                    >
                      Ajustes da Conta
                    </Link>
                  </>
                ) : null}

                <div className="border-t border-gray-200"></div>

                <a
                  href="#"
                  className="
                    block px-4 py-3 text-sm
                    hover:bg-gray-100
                    transition
                  "
                >
                  Ajuda
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY GLOBAL */}
      <BlurOverlay show={showLogin} onClick={() => setShowLogin(false)} />

      {/* LOGIN CARD */}
      {showLogin && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            px-4
          "
        >
          <div className="relative w-full max-w-sm">
            <LoginCard onSubmit={handleLogin} loading={false} hasBlur={true} />

            {/* Fechar */}
            <button
              onClick={() => setShowLogin(false)}
              className="
                absolute -top-3 -right-3
                w-9 h-9
                rounded-full
                bg-white
                border border-gray-200
                shadow-md
                hover:bg-gray-100
                transition
              "
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
