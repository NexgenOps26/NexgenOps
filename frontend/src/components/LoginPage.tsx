import { useState } from "react";
import { BrandPanel } from "./BrandPanel";
import {
  CompanyRegistrationWizard,
  type CompanyRegistrationData,
} from "./CompanyRegistrationWizard";
import { LoginForm } from "./LoginForm";

type AuthMode = "login" | "register";

function handleRegisterCompany(_data: CompanyRegistrationData) {
  // Frontend-only boundary for the future company registration API.
}

export function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <BrandPanel />
        <section
          className={`order-1 flex min-h-screen items-center justify-center overflow-hidden lg:order-2 lg:min-h-screen lg:basis-[48%] ${
            mode === "login"
              ? "bg-[#f8fafc] px-6 py-10 sm:px-10 lg:px-8 lg:py-5 xl:px-10"
              : "bg-[radial-gradient(circle_at_80%_10%,rgba(109,40,217,0.18),transparent_30%),linear-gradient(145deg,#020617,#0f172a)] px-4 py-6 sm:px-6 lg:px-5 lg:py-6 xl:px-8"
          }`}
        >
          <div
            key={mode}
            className={`auth-form-enter w-full ${
              mode === "login" ? "max-w-[520px]" : "max-w-[720px]"
            }`}
          >
            {mode === "login" ? (
              <LoginForm
                onRegisterCompanyClick={() => setMode("register")}
              />
            ) : (
              <CompanyRegistrationWizard
                onRegisterCompany={handleRegisterCompany}
                onSignInClick={() => setMode("login")}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
