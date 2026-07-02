import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AuthFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id"
> & {
  error?: string;
  icon: LucideIcon;
  id: string;
  label: string;
  reserveErrorSpace?: boolean;
  trailingAction?: ReactNode;
  variant?: "light" | "dark";
};

const inputBaseClassName =
  "h-[52px] w-full rounded-lg border pl-12 text-base font-medium transition focus:outline-none focus-visible:ring-4 lg:h-[50px]";

const inputVariantClassNames = {
  light:
    "bg-white/80 text-slate-900 placeholder:text-slate-500 hover:border-slate-400 focus:border-blue-600 focus-visible:ring-blue-600/20",
  dark:
    "bg-slate-950/55 text-white placeholder:text-slate-500 hover:border-slate-500 focus:border-violet-400 focus-visible:ring-violet-500/25",
};

export const secondaryActionClassName =
  "flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_16px_36px_rgba(37,99,235,0.14)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 lg:h-[52px] xl:text-lg";

export const inquiryActionClassName =
  "flex h-[54px] items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-4 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-[0_14px_30px_rgba(37,99,235,0.12)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 lg:h-[50px] xl:text-base";

export function AuthField({
  error,
  icon: Icon,
  id,
  label,
  reserveErrorSpace = false,
  trailingAction,
  variant = "light",
  ...inputProps
}: AuthFieldProps) {
  const errorId = `${id}-error`;
  const isDark = variant === "dark";

  return (
    <div>
      <label
        className={`mb-2 block text-sm font-bold ${
          isDark ? "text-slate-200" : "text-slate-800 xl:text-base"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="group relative">
        <Icon
          className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition ${
            isDark
              ? "text-slate-500 group-focus-within:text-violet-300"
              : "text-slate-500 group-focus-within:text-blue-600"
          }`}
          aria-hidden="true"
        />
        <input
          {...inputProps}
          id={id}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className={`${inputBaseClassName} ${inputVariantClassNames[variant]} ${
            trailingAction ? "pr-16" : "pr-5"
          } ${
            error
              ? "border-red-400 focus:border-red-400 focus-visible:ring-red-500/25"
              : isDark
                ? "border-slate-700"
                : "border-slate-300"
          }`}
        />
        {trailingAction}
      </div>
      {(error || reserveErrorSpace) && (
        <p
          id={errorId}
          className={`mt-1.5 min-h-5 text-sm font-medium ${
            isDark ? "text-red-300" : "text-red-700"
          }`}
          role={error ? "alert" : undefined}
        >
          {error}
        </p>
      )}
    </div>
  );
}

type PasswordFieldProps = Omit<AuthFieldProps, "icon" | "trailingAction" | "type">;

export function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isDark = props.variant === "dark";

  return (
    <AuthField
      {...props}
      icon={Lock}
      type={showPassword ? "text" : "password"}
      trailingAction={
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className={`absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-4 ${
            isDark
              ? "text-slate-400 hover:bg-white/10 hover:text-white focus-visible:ring-violet-500/30"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-blue-600/30"
          }`}
          onClick={() => setShowPassword((value) => !value)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      }
    />
  );
}

export function PrimaryAction({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="group flex h-[54px] w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#020617,#0f172a,#0a2c70)] px-6 text-base font-black tracking-[0.08em] text-white shadow-enterprise-button transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(10,44,112,0.32)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/35 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0 lg:h-[52px] xl:text-lg"
    >
      <span className="flex-1 text-center">{children}</span>
      <ArrowRight
        className="h-6 w-6 transition group-hover:translate-x-1 group-disabled:translate-x-0 xl:h-7 xl:w-7"
        aria-hidden="true"
      />
    </button>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-5 text-sm font-semibold text-slate-500 lg:text-xs xl:text-sm">
      <div className="h-px flex-1 bg-slate-200" />
      <span>{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function LegalNotice() {
  return (
    <p className="mx-auto mt-6 max-w-[460px] text-center text-sm leading-6 text-slate-500 lg:mt-3 lg:text-xs lg:leading-5 xl:mt-4 xl:text-sm xl:leading-6">
      By continuing, you agree to NexgenOps{" "}
      <a
        className="whitespace-nowrap font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-blue-600/40"
        href="/terms"
      >
        Terms of Use
      </a>{" "}
      and{" "}
      <a
        className="whitespace-nowrap font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-blue-600/40"
        href="/privacy"
      >
        Privacy Policy
      </a>
      .
    </p>
  );
}
