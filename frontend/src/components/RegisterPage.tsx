import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  RegisterForm,
  type RegisterCredentials,
} from "./RegisterForm";

export function RegisterPage() {
  const navigate = useNavigate();

  async function handleRegister(credentials: RegisterCredentials) {
    try {
      await api.post("/users/register/", credentials);

      alert("Registration Successful!");

      navigate("/");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Unable to connect to the server.");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl">
        <RegisterForm
          onRegister={handleRegister}
          onSignInClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}