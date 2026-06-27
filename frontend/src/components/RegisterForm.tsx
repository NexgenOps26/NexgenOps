import type { FormEvent } from "react";
import { useState } from "react";
import { AtSign, User } from "lucide-react";
import {
  AuthField,
  LegalNotice,
  PasswordField,
  PrimaryAction,
} from "./AuthFormControls";
import { Logo } from "./Logo";

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  onRegister: (credentials: RegisterCredentials) => void;
  onSignInClick: () => void;
};

type TouchedFields = Record<keyof RegisterCredentials, boolean>;
type ValidationErrors = Partial<Record<keyof RegisterCredentials, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(credentials: RegisterCredentials): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!credentials.username.trim()) {
    errors.username = "Username is required.";
  }

  if (!credentials.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(credentials.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!credentials.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function RegisterForm({
  onRegister,
  onSignInClick,
}: RegisterFormProps) {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<TouchedFields>({
    username: false,
    email: false,
    password: false,
  });

  const errors = validate(credentials);
  const isValid = Object.keys(errors).length === 0;

  function markTouched(field: keyof RegisterCredentials) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ username: true, email: true, password: true });

    if (isValid) {
      onRegister({
        username: credentials.username.trim(),
        email: credentials.email.trim(),
        password: credentials.password,
      });
    }
  }

  return (
    <>
      <div className="mb-8 flex justify-center lg:mb-3 xl:mb-5">
        <Logo imageClassName="h-[84px] w-[84px] lg:h-16 lg:w-16 xl:h-[72px] xl:w-[72px]" />
      </div>

      <div className="mb-8 text-center sm:text-left lg:mb-4 xl:mb-5">
        <h2 className="text-3xl font-black leading-tight tracking-normal text-slate-900 sm:text-4xl lg:text-[2.15rem] xl:text-[2.35rem]">
          Create your NexgenOps Account
        </h2>
        <p className="mt-4 text-base font-medium leading-7 text-slate-600 sm:text-lg lg:mt-2 lg:text-sm lg:leading-6 xl:text-base">
          Register to access the AI-powered Facilities Management platform.
        </p>
      </div>

      <form
        className="space-y-4 lg:space-y-2 xl:space-y-3"
        noValidate
        onSubmit={handleSubmit}
      >
        <AuthField
          id="register-username"
          name="username"
          type="text"
          autoComplete="username"
          label="Username"
          icon={User}
          placeholder="Choose a username"
          required
          reserveErrorSpace
          error={touched.username ? errors.username : undefined}
          value={credentials.username}
          onBlur={() => markTouched("username")}
          onChange={(event) =>
            setCredentials((current) => ({
              ...current,
              username: event.target.value,
            }))
          }
        />

        <AuthField
          id="register-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          label="Email Address"
          icon={AtSign}
          placeholder="Enter your email address"
          required
          reserveErrorSpace
          error={touched.email ? errors.email : undefined}
          value={credentials.email}
          onBlur={() => markTouched("email")}
          onChange={(event) =>
            setCredentials((current) => ({
              ...current,
              email: event.target.value,
            }))
          }
        />

        <PasswordField
          id="register-password"
          name="password"
          autoComplete="new-password"
          label="Password"
          placeholder="Create a password"
          required
          reserveErrorSpace
          error={touched.password ? errors.password : undefined}
          value={credentials.password}
          onBlur={() => markTouched("password")}
          onChange={(event) =>
            setCredentials((current) => ({
              ...current,
              password: event.target.value,
            }))
          }
        />

        <PrimaryAction disabled={!isValid}>Register</PrimaryAction>
      </form>

      <p className="mt-5 text-center text-sm font-medium text-slate-600 lg:mt-3 xl:mt-4 xl:text-base">
        Already have an account?{" "}
        <button
          type="button"
          className="rounded font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      </p>

      <LegalNotice />
    </>
  );
}
