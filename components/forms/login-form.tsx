"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginSchema } from "@/lib/validations/login";

import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

// Adicionando os imports que faltavam
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ─── Helpers ─── */
// Corrigindo o erro de tipagem do Framer Motion: 
// O Framer Motion espera que 'ease' seja um tipo específico ou que o objeto seja tratado como constante.
// Usar 'as const' ou definir o tipo explicitamente resolve o erro de "string is not assignable to Easing".

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const fadeUpDelay = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

/* ─── Component ─── */
export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden lg:grid lg:grid-cols-2">

      {/* ═══════════════════════════════════════════════════════════════
          PAINEL ESQUERDO / BRAND
         ═══════════════════════════════════════════════════════════════ */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden bg-slate-950 sm:h-44 lg:h-full">

        <div
          className={cn(
            "absolute inset-0",
            "[background-size:48px_48px]",
            "[background-image:linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]"
          )}
        />

        <div className="pointer-events-none absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black)]" />

        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#38bdf8" />
        <Spotlight className="top-10 left-full md:left-[80%]" fill="#2563eb" />

        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/[0.06] blur-3xl" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between px-8 py-6 lg:px-12 lg:py-12 xl:px-16 xl:py-16">

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="flex items-center gap-3 lg:hidden"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] backdrop-blur-sm">
              <ShieldCheck className="h-4.5 w-4.5 text-white/80" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white/80">
              SCM Saúde
            </span>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="hidden lg:block"
          >
            <div className="mb-14 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] backdrop-blur-sm">
                <ShieldCheck className="h-5.5 w-5.5 text-white/90" />
              </div>
              <span className="text-base font-semibold tracking-wide text-white/80">
                SCM Saúde
              </span>
            </div>

            <h2 className="max-w-md text-3xl font-semibold leading-snug tracking-tight text-white xl:text-[2rem] xl:leading-snug">
              Gerencie toda a operação da{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SCM Saúde
              </span>{" "}
              em um único lugar.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400 xl:text-[0.925rem] xl:leading-relaxed">
              Plataforma centralizada para autenticação, indicadores,
              clientes, financeiro e operações com segurança e alta performance.
            </p>
          </motion.div>

          <p className="hidden text-xs text-slate-500 lg:block">
            © {new Date().getFullYear()} SCM Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FORMULÁRIO
         ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto bg-white px-5 py-8 sm:px-8 sm:py-12">
        <motion.div
          {...fadeUp}
          className="w-full max-w-sm"
        >
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/5">
              <ShieldCheck className="h-5 w-5 text-slate-700" />
            </div>
            <h1 className="text-lg font-semibold text-slate-800">SCM Saúde</h1>
            <p className="mt-1 text-sm text-slate-400">Platform</p>
          </div>

          <div className="rounded-2xl bg-slate-50/60 p-7 sm:p-9 sm:rounded-[1.375rem]">

            <motion.div
              {...fadeUpDelay(0.05)}
              className="mb-7 space-y-1"
            >
              <h1 className="text-[1.55rem] font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Bem-vindo de volta
              </h1>
              <p className="text-sm text-slate-400">
                Entre com suas credenciais para continuar.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <motion.div {...fadeUpDelay(0.1)} className="space-y-1.5">
  <Label className="text-xs font-medium text-slate-500">
    Email
  </Label>

  <div className="group relative">
    <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-300 transition-colors group-focus-within:text-slate-500" />

    <Input
      type="email"
      placeholder="voce@empresa.com"
      autoComplete="email"
      className="
        h-11
        rounded-xl
        border-slate-200/80
        bg-white
        pl-11
        text-sm
        shadow-sm
        transition-shadow
        placeholder:text-slate-300
        focus:border-blue-400/60
        focus:ring-2
        focus:ring-blue-400/20
        focus-visible:ring-blue-400/20
      "
      {...register("email")}
    />
  </div>

  {errors.email && (
    <p className="text-xs text-red-500">
      {errors.email.message}
    </p>
  )}
</motion.div>

              <motion.div {...fadeUpDelay(0.16)} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-slate-500">
                    Senha
                  </Label>

                  <Link
                    href="#"
                    className="text-xs font-medium text-slate-400 transition hover:text-slate-600"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <div className="group relative">
  <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-300 transition-colors group-focus-within:text-slate-500" />

  <Input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    autoComplete="current-password"
    className="
      h-11
      rounded-xl
      border-slate-200/80
      bg-white
      pl-11
      pr-11
      text-sm
      shadow-sm
      transition-shadow
      placeholder:text-slate-300
      focus:border-blue-400/60
      focus:ring-2
      focus:ring-blue-400/20
      focus-visible:ring-blue-400/20
    "
    {...register("password")}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700"
  >
    {showPassword ? (
      <EyeOff className="h-4.5 w-4.5" />
    ) : (
      <Eye className="h-4.5 w-4.5" />
    )}
  </button>
</div>

                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </motion.div>

              <motion.div {...fadeUpDelay(0.22)}>
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "group relative flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-medium text-white shadow-sm",
                    "transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60"
                  )}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Entrar</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-70 group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-350 lg:hidden">
            © {new Date().getFullYear()} SCM Saúde
          </p>
        </motion.div>
      </div>
    </div>
  );
}
