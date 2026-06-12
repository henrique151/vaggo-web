"use client";

import { useState } from "react";
import SearchBar from "./search_bar";
import LoginCard from "./login_card";
import BlurOverlay from "./blur_overlay";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

import logo from "@/public/assets/logo/logo.png";

interface HeaderProps {
  showSearch?: boolean;
}

// TODO refine website's header
export default function Header({ showSearch = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const pathName = usePathname();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as {
      email: string;
      pass: string;
    };

    delete (values as any).passConfirm;

    // const res = (await request("users/login", false, {
    //   body: JSON.stringify(values),
    //   dataOnly: true,
    //   contentType: "json",
    //   method: "POST",
    // })) as any;
    const res = {} as any;
    console.log(res);
    console.log("Login enviado");
    setShowLogin(false);

    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user.id);
    // console.log(localStorage)

    router.push("/user/dashboard");
  }

  const bannedPages = ["/login", "/register"];
  if (bannedPages.find((page) => pathName === page)) return null;

  return (
    <>
      {/* HEADER */}
      <header className="app-header bg-base border-soft">
        <div className="container-default flex items-center justify-between h-16 gap-4 mx-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src={logo} width={46} height={46} alt="Logo" />
            {/*<span className="font-semibold text-lg text-primary">Vaggo</span>*/}
          </Link>

          {/* Search */}
          {showSearch && (
            <div className="flex-1 flex flex-col max-w-xl items-center">
              <SearchBar />
            </div>
          )}

          {/* Menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpen(!open)}
              className="
            app-icon-button
            bg-surface
            border-soft
            hover:bg-gray-200
            dark:hover:bg-gray-700
          "
            >
              <div className="flex flex-col gap-[3px]">
                <span className="w-4 h-[2px] bg-gray-700 dark:bg-gray-300"></span>
                <span className="w-4 h-[2px] bg-gray-700 dark:bg-gray-300"></span>
                <span className="w-4 h-[2px] bg-gray-700 dark:bg-gray-300"></span>
              </div>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="app-dropdown bg-card border-base">
                {!localStorage.getItem("token") && (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setOpen(false);
                    }}
                    className="
                  app-menu-item
                  text-primary
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                "
                  >
                    Entrar ou Cadastrar-se
                  </button>
                )}

                {localStorage.getItem("token") && (
                  <>
                    <Link
                      href="/user/dashboard"
                      className="
                    app-menu-item
                    text-primary
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                  "
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/user/account"
                      className="
                    app-menu-item
                    text-primary
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                  "
                    >
                      Ajustes da Conta
                    </Link>
                  </>
                )}

                <div className="border-t border-base"></div>

                <a
                  href="#"
                  className="
                app-menu-item
                text-primary
                hover:bg-gray-100
                dark:hover:bg-gray-700
              "
                >
                  Ajuda
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTheme();
                  }}
                  className="
               app-menu-item
                text-primary
                hover:bg-gray-100
                dark:hover:bg-gray-700

              "
                >
                  Tema: {theme}
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY GLOBAL */}
      <BlurOverlay show={showLogin} onClick={() => setShowLogin(false)} />

      {/* LOGIN CARD */}
      {showLogin && ( // Não mexi nisso ainda pq acho que seria componente sei la
        <div
          className="
        fixed inset-0 z-50
        flex items-center justify-center
        px-4
      "
        >
          <div className="relative w-full max-w-sm ">
            <LoginCard onSubmit={handleLogin} loading={false} hasBlur={true} />

            <button
              onClick={() => setShowLogin(false)}
              className="
            absolute -top-3 -right-3
            w-9 h-9
            rounded-full
            bg-card
            border border-base
            shadow-md
            text-primary
            hover:bg-gray-100
            dark:hover:bg-gray-700
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
