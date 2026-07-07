import { useState } from "react";
import api from "../api/axios";
import { BrandPanel } from "./BrandPanel";
import {
  CompanyRegistrationWizard,
  type CompanyRegistrationPayload,
} from "./CompanyRegistrationWizard";
import { LoginForm } from "./LoginForm";

type AuthMode = "login" | "register";

export function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isRegisteringCompany, setIsRegisteringCompany] = useState(false);

  async function handleRegisterCompany(
    payload: CompanyRegistrationPayload,
  ) {
    try {
      setIsRegisteringCompany(true);

      const response = await api.post("/companies/register/", payload);

      console.log("Company registration success:", response.data);

      alert("Company registered successfully. You can now sign in.");
      setMode("login");
    } catch (error: any) {
      console.error("Company registration failed:", error);

      if (error.response?.data) {
        alert(
          `Registration failed: ${JSON.stringify(error.response.data)}`,
        );
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsRegisteringCompany(false);
    }
  }

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