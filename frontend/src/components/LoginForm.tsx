import axios from "axios";
import api from "../api/axios";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Building2, Calendar, Smartphone, User } from "lucide-react";
import {
  AuthField,
  Divider,
  inquiryActionClassName,
  LegalNotice,
  PasswordField,
  PrimaryAction,
  secondaryActionClassName,
} from "./AuthFormControls";

type PlaceholderAction = "otp" | "demo";

type LoginCredentials = {
  username: string;
  password: string;
};

function handlePlaceholderAction(_action: PlaceholderAction) {
  // Placeholder actions are intentionally inert until their flows are added.
}

type LoginFormProps = {
  onRegisterCompanyClick: () => void;
};

export function LoginForm({ onRegisterCompanyClick }: LoginFormProps) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  async function handleLogin(credentials: LoginCredentials) {
    try {
      const response = await api.post("/users/login/", {
        username: credentials.username,
        password: credentials.password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError<{ detail?: string }>(error) && error.response) {
        alert(error.response.data.detail ?? "Login failed.");
      } else {
        alert("Unable to connect to the server.");
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleLogin(credentials);
  }

  return (
    <>
      
      <div className="mb-6 text-center sm:text-left lg:mb-4">
        <h2 className="text-[1.75rem] font-black leading-tight tracking-normal text-slate-900 sm:text-3xl lg:text-[1.9rem]">
          Sign in to Operations Command
        </h2>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
          Access secure facility analytics and asset parameters.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
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
          <Smartphone className="h-5 w-5" aria-hidden="true" />
          <span>Login with OTP (Mobile/Email)</span>
        </button>

        <PrimaryAction>LOGIN</PrimaryAction>

        <Divider label="New Users & Inquiries" />

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onRegisterCompanyClick}
            className={inquiryActionClassName}
          >
            <Building2 className="h-5 w-5" aria-hidden="true" />
            <span>Register Company Profile</span>
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
