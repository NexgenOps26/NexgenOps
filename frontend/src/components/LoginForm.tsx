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
    <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
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
    <section className="order-1 flex min-h-screen items-center justify-center bg-[#f8fafc] px-6 py-12 sm:px-10 lg:order-2 lg:basis-[48%]">
      <div className="w-full max-w-[560px]">
        <div className="mb-14 flex justify-center">
          <Logo imageClassName="h-[90px] w-[90px]" />
        </div>

        <div className="mb-12 text-center sm:text-left">
          <h2 className="text-3xl font-black leading-tight tracking-normal text-slate-900 sm:text-4xl lg:text-[3rem]">
            Sign in to Operations Command
          </h2>
          <p className="mt-4 text-base font-medium leading-7 text-slate-600 sm:text-lg">
            Access secure facility analytics and asset parameters.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-3 block text-base font-bold text-slate-800"
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
                className="h-[60px] w-full rounded-2xl border border-slate-300 bg-white/80 pl-16 pr-5 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-blue-600 focus:shadow-input-focus"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-3 block text-base font-bold text-slate-800"
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
                className="h-[60px] w-full rounded-2xl border border-slate-300 bg-white/80 pl-16 pr-16 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-blue-600 focus:shadow-input-focus"
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
            className="flex h-[60px] w-full items-center justify-center gap-4 rounded-2xl border border-slate-300 bg-white/70 text-lg font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_16px_36px_rgba(37,99,235,0.14)] focus:outline-none focus:ring-4 focus:ring-blue-600/15"
          >
            <Smartphone className="h-6 w-6" aria-hidden="true" />
            <span>Login with OTP (Mobile/Email)</span>
          </button>

          <button
            type="submit"
            className="group flex h-[60px] w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#020617,#0f172a,#0a2c70)] px-6 text-lg font-black tracking-[0.08em] text-white shadow-enterprise-button transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(10,44,112,0.32)] focus:outline-none focus:ring-4 focus:ring-blue-600/20"
          >
            <span className="flex-1 text-center">LOGIN</span>
            <ArrowRight
              className="h-7 w-7 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <Divider label="New Users & Inquiries" />

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => logAction("register")}
              className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-4 text-base font-bold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_14px_30px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-4 focus:ring-blue-600/15"
            >
              <UserPlus className="h-5 w-5" aria-hidden="true" />
              <span>Register as New User</span>
            </button>
            <button
              type="button"
              onClick={() => logAction("demo")}
              className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-4 text-base font-bold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_14px_30px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-4 focus:ring-blue-600/15"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span>Request a Demo</span>
            </button>
          </div>
        </form>

        <p className="mx-auto mt-10 max-w-[460px] text-center text-sm leading-6 text-slate-500">
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
