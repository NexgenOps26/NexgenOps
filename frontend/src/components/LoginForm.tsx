import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  User,
  UserPlus,
} from "lucide-react";
import { Logo } from "./Logo";

type ActionName = "login" | "otp" | "register" | "demo";

function logAction(action: ActionName) {
  console.log(action);
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-5 text-sm font-semibold text-slate-500 lg:text-xs xl:text-sm">
      <div className="h-px flex-1 bg-slate-200" />
      <span>{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    logAction("login");
  }

  return (
    <section className="order-1 flex min-h-screen items-center justify-center bg-[#f8fafc] px-6 py-10 sm:px-10 lg:order-2 lg:h-full lg:min-h-0 lg:basis-[48%] lg:px-8 lg:py-5 xl:px-10">
      <div className="w-full max-w-[520px]">
        <div className="mb-10 flex justify-center lg:mb-4 xl:mb-6">
          <Logo imageClassName="h-[84px] w-[84px] lg:h-16 lg:w-16 xl:h-[72px] xl:w-[72px]" />
        </div>

        <div className="mb-9 text-center sm:text-left lg:mb-5 xl:mb-6">
          <h2 className="text-3xl font-black leading-tight tracking-normal text-slate-900 sm:text-4xl lg:text-[2.15rem] xl:text-[2.35rem]">
            Sign in to Operations Command
          </h2>
          <p className="mt-4 text-base font-medium leading-7 text-slate-600 sm:text-lg lg:mt-2 lg:text-sm lg:leading-6 xl:text-base">
            Access secure facility analytics and asset parameters.
          </p>
        </div>

        <form className="space-y-5 lg:space-y-3 xl:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-base font-bold text-slate-800 lg:text-sm xl:text-base"
              htmlFor="username"
            >
              Username / Email
            </label>
            <div className="group relative">
              <User
                className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500 transition group-focus-within:text-blue-600"
                aria-hidden="true"
              />
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username or email"
                className="h-[52px] w-full rounded-2xl border border-slate-300 bg-white/80 pl-16 pr-5 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-blue-600 focus:shadow-input-focus lg:h-[50px]"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-base font-bold text-slate-800 lg:text-sm xl:text-base"
              htmlFor="password"
            >
              Password
            </label>
            <div className="group relative">
              <Lock
                className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500 transition group-focus-within:text-blue-600"
                aria-hidden="true"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-[52px] w-full rounded-2xl border border-slate-300 bg-white/80 pl-16 pr-16 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-blue-600 focus:shadow-input-focus lg:h-[50px]"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-600/15"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Divider label="OR" />

          <button
            type="button"
            onClick={() => logAction("otp")}
            className="flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_16px_36px_rgba(37,99,235,0.14)] focus:outline-none focus:ring-4 focus:ring-blue-600/15 lg:h-[52px] xl:text-lg"
          >
            <Smartphone className="h-5 w-5 xl:h-6 xl:w-6" aria-hidden="true" />
            <span>Login with OTP (Mobile/Email)</span>
          </button>

          <button
            type="submit"
            className="group flex h-[54px] w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#020617,#0f172a,#0a2c70)] px-6 text-base font-black tracking-[0.08em] text-white shadow-enterprise-button transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(10,44,112,0.32)] focus:outline-none focus:ring-4 focus:ring-blue-600/20 lg:h-[52px] xl:text-lg"
          >
            <span className="flex-1 text-center">LOGIN</span>
            <ArrowRight
              className="h-6 w-6 transition group-hover:translate-x-1 xl:h-7 xl:w-7"
              aria-hidden="true"
            />
          </button>

          <Divider label="New Users & Inquiries" />

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => logAction("register")}
              className="flex h-[54px] items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-4 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_14px_30px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-4 focus:ring-blue-600/15 lg:h-[50px] xl:text-base"
            >
              <UserPlus className="h-5 w-5" aria-hidden="true" />
              <span>Register as New User</span>
            </button>
            <button
              type="button"
              onClick={() => logAction("demo")}
              className="flex h-[54px] items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-4 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_14px_30px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-4 focus:ring-blue-600/15 lg:h-[50px] xl:text-base"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span>Request a Demo</span>
            </button>
          </div>
        </form>

        <p className="mx-auto mt-6 max-w-[460px] text-center text-sm leading-6 text-slate-500 lg:mt-3 lg:text-xs lg:leading-5 xl:mt-4 xl:text-sm xl:leading-6">
          By continuing, you agree to NexgenOps{" "}
          <a className="font-bold text-blue-700 transition hover:text-blue-900" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="font-bold text-blue-700 transition hover:text-blue-900" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
