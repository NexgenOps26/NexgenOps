import { useState } from "react";
import { BrandPanel } from "./BrandPanel";
import {
  CompanyRegistrationWizard,
  type CompanyRegistrationPayload,
} from "./CompanyRegistrationWizard";
import { LoginForm } from "./LoginForm";

type AuthMode = "login" | "register";

function handleRegisterCompany(_payload: CompanyRegistrationPayload) {
  // Frontend-only boundary for the future company registration API.
}

export function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans">
      <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
        <BrandPanel />
        <section
          className={`order-1 flex min-h-screen min-w-0 items-center justify-center bg-[#f8fafc] lg:col-start-2 lg:row-start-1 lg:overflow-hidden ${
            mode === "login"
              ? "px-5 py-8 sm:px-8 lg:px-6 lg:py-4 xl:px-8"
              : "px-4 py-6 sm:px-6 lg:px-5 lg:py-4 xl:px-6"
          }`}
        >
          <div
            key={mode}
            className={`auth-form-enter w-full ${
              mode === "login" ? "max-w-[500px]" : "max-w-[680px]"
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
