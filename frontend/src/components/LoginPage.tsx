import { BrandPanel } from "./BrandPanel";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <BrandPanel />
        <LoginForm />
      </div>
    </div>
  );
}
