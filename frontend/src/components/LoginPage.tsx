import { useState } from "react";
import { BrandPanel } from "./BrandPanel";
import { LoginForm } from "./LoginForm";
import {
  RegisterForm,
  type RegisterCredentials,
} from "./RegisterForm";

type AuthMode = "login" | "register";

function handleRegister(_credentials: RegisterCredentials) {
  // Frontend-only boundary for POST /api/users/register/.
}

export function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <BrandPanel />
        <section className="order-1 flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fafc] px-6 py-10 sm:px-10 lg:order-2 lg:min-h-screen lg:basis-[48%] lg:px-8 lg:py-5 xl:px-10">
          <div key={mode} className="auth-form-enter w-full max-w-[520px]">
            {mode === "login" ? (
              <LoginForm onRegisterClick={() => setMode("register")} />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                onSignInClick={() => setMode("login")}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
