import { BrandPanel } from "./BrandPanel";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen flex-col lg:h-full lg:min-h-0 lg:flex-row">
        <BrandPanel />
        <LoginForm />
      </div>
    </div>
  );
}
