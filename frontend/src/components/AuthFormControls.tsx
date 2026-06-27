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
};

const inputClassName =
  "h-[52px] w-full rounded-2xl border bg-white/80 pl-16 text-base font-medium text-slate-900 transition placeholder:text-slate-500 hover:border-slate-400 focus:border-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20 lg:h-[50px]";

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
  ...inputProps
}: AuthFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        className="mb-2 block text-base font-bold text-slate-800 lg:text-sm xl:text-base"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="group relative">
        <Icon
          className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500 transition group-focus-within:text-blue-600"
          aria-hidden="true"
        />
        <input
          {...inputProps}
          id={id}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className={`${inputClassName} ${
            trailingAction ? "pr-16" : "pr-5"
          } ${
            error
              ? "border-red-500 focus:border-red-600 focus-visible:ring-red-600/20"
              : "border-slate-300"
          }`}
        />
        {trailingAction}
      </div>
      {(error || reserveErrorSpace) && (
        <p
          id={errorId}
          className="mt-1.5 min-h-5 text-sm font-medium text-red-700"
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
          className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30"
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
