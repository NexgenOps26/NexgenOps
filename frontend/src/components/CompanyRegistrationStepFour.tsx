import { RefreshCw, ShieldCheck, UserCog } from "lucide-react";
import { AuthField, PasswordField } from "./AuthFormControls";
import type { CompanyRegistrationStepProps } from "./CompanyRegistrationTypes";

type CompanyRegistrationStepFourProps = CompanyRegistrationStepProps & {
  captchaQuestion: string;
  onRefreshCaptcha: () => void;
};

export function CompanyRegistrationStepFour({
  captchaQuestion,
  data,
  errors,
  onBlur,
  onChange,
  onRefreshCaptcha,
}: CompanyRegistrationStepFourProps) {
  const termsErrorId = "accepted-terms-error";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <AuthField
          id="admin-username"
          name="adminUsername"
          autoComplete="username"
          label="Workstation Admin Username *"
          icon={UserCog}
          placeholder="Create an admin username"
          required
          variant="dark"
          value={data.adminUsername}
          error={errors.adminUsername}
          onBlur={() => onBlur("adminUsername")}
          onChange={(event) => onChange("adminUsername", event.target.value)}
        />
      </div>
      <PasswordField
        id="create-password"
        name="password"
        autoComplete="new-password"
        label="Create Password *"
        placeholder="Minimum 8 characters"
        required
        variant="dark"
        value={data.password}
        error={errors.password}
        onBlur={() => onBlur("password")}
        onChange={(event) => onChange("password", event.target.value)}
      />
      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        autoComplete="new-password"
        label="Confirm Password *"
        placeholder="Re-enter password"
        required
        variant="dark"
        value={data.confirmPassword}
        error={errors.confirmPassword}
        onBlur={() => onBlur("confirmPassword")}
        onChange={(event) => onChange("confirmPassword", event.target.value)}
      />

      <div>
        <span className="mb-2 block text-sm font-bold text-slate-200">
          CAPTCHA Security Code
        </span>
        <div className="flex h-[52px] items-center justify-between rounded-lg border border-slate-700 bg-slate-950/55 px-4 lg:h-[50px]">
          <span
            className="font-mono text-lg font-black tracking-[0.12em] text-violet-200"
            aria-live="polite"
          >
            {captchaQuestion}
          </span>
          <button
            type="button"
            aria-label="Refresh security code"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
            onClick={onRefreshCaptcha}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <AuthField
        id="captcha-answer"
        name="captchaAnswer"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        label="Input Result *"
        icon={ShieldCheck}
        placeholder="Enter result"
        required
        variant="dark"
        value={data.captchaAnswer}
        error={errors.captchaAnswer}
        onBlur={() => onBlur("captchaAnswer")}
        onChange={(event) => onChange("captchaAnswer", event.target.value)}
      />

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300 transition hover:border-slate-600">
          <input
            type="checkbox"
            name="acceptedTerms"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-violet-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
            checked={data.acceptedTerms}
            aria-invalid={Boolean(errors.acceptedTerms)}
            aria-describedby={errors.acceptedTerms ? termsErrorId : undefined}
            onBlur={() => onBlur("acceptedTerms")}
            onChange={(event) =>
              onChange("acceptedTerms", event.target.checked)
            }
          />
          <span>
            I confirm that the information provided is accurate and agree to
            the NexgenOps Terms of Use and Privacy Policy. *
          </span>
        </label>
        {errors.acceptedTerms && (
          <p
            id={termsErrorId}
            className="mt-1.5 text-sm font-medium text-red-300"
            role="alert"
          >
            {errors.acceptedTerms}
          </p>
        )}
      </div>
    </div>
  );
}
