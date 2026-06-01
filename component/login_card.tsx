'use client'

import Link from "next/link"

interface LoginCardProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  hasBlur?: boolean
}

export default function LoginCard({
  onSubmit,
  loading,
  hasBlur = false
}: LoginCardProps) {
  return (
    <section
      className={`
        w-full max-w-sm
        rounded-2xl
        px-6 py-8
        shadow-sm
        border
        transition

        ${hasBlur
          ? "bg-white/100 backdrop-blur-md border-white/40 shadow-xl"
          : "bg-white border-gray-200"
        }
      `}
    >

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Entrar no Vaggo
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Acesse sua conta
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            placeholder="seu@email.com"
            className="
              px-4 py-3
              rounded-lg
              border border-gray-300
              bg-white/90
              focus:outline-none
              focus:ring-2 focus:ring-gray-300
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Senha
          </label>

          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="
              px-4 py-3
              rounded-lg
              border border-gray-300
              bg-white/90
              focus:outline-none
              focus:ring-2 focus:ring-gray-300
            "
          />
        </div>

        <div className="flex justify-between text-sm mt-1">
          <Link href="/register" className="text-gray-600 hover:text-black">
            Criar conta
          </Link>

          <Link href="/template" className="text-gray-600 hover:text-black">
            Esqueci a senha
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
                mt-4
                py-3
                rounded-lg
                font-medium
                text-white
                btn-primary
                btn-hover
                transition
                disabled:opacity-60
          "
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </form>

    </section>
  )
}
