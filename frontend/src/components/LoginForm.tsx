import type { FormEvent } from "react";
import { useState } from "react";
import { Calendar, Smartphone, User, UserPlus } from "lucide-react";
import {
  AuthField,
  Divider,
  inquiryActionClassName,
  LegalNotice,
  PasswordField,
  PrimaryAction,
  secondaryActionClassName,
} from "./AuthFormControls";
import { Logo } from "./Logo";

type PlaceholderAction = "otp" | "demo";

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onRegisterClick: () => void;
};

function handlePlaceholderAction(_action: PlaceholderAction) {
  // Placeholder actions are intentionally inert until their flows are added.
}

function handleLogin(_credentials: LoginCredentials) {
  // Frontend-only shell: API integration can replace this boundary later.
}

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleLogin(credentials);
  }

  return (
    <>
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
        <AuthField
          id="login-username"
          name="username"
          type="text"
          autoComplete="username"
          label="Username / Email"
          icon={User}
          placeholder="Enter your username or email"
          required
          value={credentials.username}
          onChange={(event) =>
            setCredentials((current) => ({
              ...current,
              username: event.target.value,
            }))
          }
        />

        <PasswordField
          id="login-password"
          name="password"
          autoComplete="current-password"
          label="Password"
          placeholder="Enter your password"
          required
          value={credentials.password}
          onChange={(event) =>
            setCredentials((current) => ({
              ...current,
              password: event.target.value,
            }))
          }
        />

        <Divider label="OR" />

        <button
          type="button"
          onClick={() => handlePlaceholderAction("otp")}
          className={secondaryActionClassName}
        >
          <Smartphone className="h-5 w-5 xl:h-6 xl:w-6" aria-hidden="true" />
          <span>Login with OTP (Mobile/Email)</span>
        </button>

        <PrimaryAction>LOGIN</PrimaryAction>

        <Divider label="New Users & Inquiries" />

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onRegisterClick}
            className={inquiryActionClassName}
          >
            <UserPlus className="h-5 w-5" aria-hidden="true" />
            <span>Register as New User</span>
          </button>
          <button
            type="button"
            onClick={() => handlePlaceholderAction("demo")}
            className={inquiryActionClassName}
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            <span>Request a Demo</span>
          </button>
        </div>
      </form>

      <LegalNotice />
    </>
  );
}
