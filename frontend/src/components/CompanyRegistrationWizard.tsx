import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, LogIn } from "lucide-react";
import { CompanyRegistrationStepOne } from "./CompanyRegistrationStepOne";
import { CompanyRegistrationStepTwo } from "./CompanyRegistrationStepTwo";
import { CompanyRegistrationStepThree } from "./CompanyRegistrationStepThree";
import { CompanyRegistrationStepFour } from "./CompanyRegistrationStepFour";
import type {
  CompanyRegistrationData,
  CompanyRegistrationErrors,
  CompanyRegistrationField,
  UpdateCompanyRegistrationField,
} from "./CompanyRegistrationTypes";

export type { CompanyRegistrationData } from "./CompanyRegistrationTypes";

type CompanyRegistrationWizardProps = {
  onRegisterCompany: (data: CompanyRegistrationData) => void;
  onSignInClick: () => void;
};

type Captcha = {
  answer: number;
  question: string;
};

const stepTitles = [
  "Company Details",
  "Primary Contact Person & Corporate Info",
  "Corporate Facility & Demographics Info",
  "Portal Credentials Creation",
] as const;

const stepFields: CompanyRegistrationField[][] = [
  [
    "companyName",
    "companyType",
    "industrySectors",
    "gstNumber",
    "corporateWebsite",
    "corporateWorkEmail",
    "companyPhone",
  ],
  [
    "contactOfficerName",
    "corporateDesignation",
    "mobileContactPhone",
    "credentialsEmail",
    "streetAddress",
    "city",
    "stateRegion",
    "emergencyNumber",
    "postalCode",
  ],
  [
    "numberOfSites",
    "totalBuildings",
    "coreRosterCount",
    "workforceShifts",
    "initialAssetsCount",
  ],
  [
    "adminUsername",
    "password",
    "confirmPassword",
    "captchaAnswer",
    "acceptedTerms",
  ],
];

const initialData: CompanyRegistrationData = {
  companyName: "",
  companyType: "",
  industrySectors: "",
  gstNumber: "",
  corporateWebsite: "",
  corporateWorkEmail: "",
  companyPhone: "",
  contactOfficerName: "",
  corporateDesignation: "",
  mobileContactPhone: "",
  credentialsEmail: "",
  streetAddress: "",
  city: "",
  stateRegion: "",
  emergencyNumber: "",
  postalCode: "",
  numberOfSites: "",
  totalBuildings: "",
  coreRosterCount: "",
  workforceShifts: "",
  initialAssetsCount: "",
  adminUsername: "",
  password: "",
  confirmPassword: "",
  captchaAnswer: "",
  acceptedTerms: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nonNegativeIntegerPattern = /^\d+$/;

function createCaptcha(): Captcha {
  const left = Math.floor(Math.random() * 8) + 2;
  const right = Math.floor(Math.random() * 8) + 2;

  return {
    answer: left + right,
    question: `${left} + ${right} = ?`,
  };
}

function validateRegistration(
  data: CompanyRegistrationData,
  captchaAnswer: number,
): CompanyRegistrationErrors {
  const errors: CompanyRegistrationErrors = {};

  const requireText = (
    field: Exclude<CompanyRegistrationField, "acceptedTerms">,
    message: string,
  ) => {
    if (!data[field].trim()) {
      errors[field] = message;
    }
  };

  requireText("companyName", "Company name is required.");
  requireText("companyType", "Company type is required.");
  requireText("industrySectors", "Industry sector is required.");
  requireText("gstNumber", "GST identification number is required.");
  requireText("corporateWorkEmail", "Corporate work email is required.");
  requireText("companyPhone", "Company phone is required.");

  if (
    data.corporateWorkEmail &&
    !emailPattern.test(data.corporateWorkEmail.trim())
  ) {
    errors.corporateWorkEmail = "Enter a valid corporate email address.";
  }

  requireText("contactOfficerName", "Contact officer name is required.");
  requireText("corporateDesignation", "Corporate designation is required.");
  requireText("mobileContactPhone", "Mobile contact phone is required.");
  requireText("credentialsEmail", "Credentials email is required.");
  requireText("streetAddress", "Street address is required.");
  requireText("city", "City is required.");
  requireText("postalCode", "Postal code is required.");

  if (
    data.credentialsEmail &&
    !emailPattern.test(data.credentialsEmail.trim())
  ) {
    errors.credentialsEmail = "Enter a valid credentials email address.";
  }

  const validateCount = (
    field:
      | "numberOfSites"
      | "totalBuildings"
      | "coreRosterCount"
      | "workforceShifts"
      | "initialAssetsCount",
    label: string,
    minimum: number,
  ) => {
    const value = data[field].trim();
    if (!value) {
      errors[field] = `${label} is required.`;
    } else if (
      !nonNegativeIntegerPattern.test(value) ||
      Number(value) < minimum
    ) {
      errors[field] = `Enter a whole number of ${minimum} or more.`;
    }
  };

  validateCount("numberOfSites", "Number of sites", 1);
  validateCount("totalBuildings", "Total buildings", 1);
  validateCount("coreRosterCount", "Core roster count", 0);
  validateCount("workforceShifts", "Workforce shifts strength", 0);
  validateCount("initialAssetsCount", "Initial assets count", 0);

  requireText("adminUsername", "Admin username is required.");

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!data.captchaAnswer.trim()) {
    errors.captchaAnswer = "Security code result is required.";
  } else if (Number(data.captchaAnswer) !== captchaAnswer) {
    errors.captchaAnswer = "Security code result is incorrect.";
  }

  if (!data.acceptedTerms) {
    errors.acceptedTerms = "You must accept the terms to continue.";
  }

  return errors;
}

export function CompanyRegistrationWizard({
  onRegisterCompany,
  onSignInClick,
}: CompanyRegistrationWizardProps) {
  const [data, setData] = useState<CompanyRegistrationData>(initialData);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState<
    Partial<Record<CompanyRegistrationField, boolean>>
  >({});
  const [captcha, setCaptcha] = useState<Captcha>(createCaptcha);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const errors = useMemo(
    () => validateRegistration(data, captcha.answer),
    [captcha.answer, data],
  );
  const currentFields = stepFields[step];
  const isCurrentStepValid = currentFields.every((field) => !errors[field]);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => {
      return touched[field as CompanyRegistrationField];
    }),
  ) as CompanyRegistrationErrors;

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  const updateField: UpdateCompanyRegistrationField = (field, value) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  function markTouched(field: CompanyRegistrationField) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function refreshCaptcha() {
    setCaptcha(createCaptcha());
    setData((current) => ({ ...current, captchaAnswer: "" }));
    setTouched((current) => ({ ...current, captchaAnswer: false }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isCurrentStepValid) {
      setTouched((current) => ({
        ...current,
        ...Object.fromEntries(currentFields.map((field) => [field, true])),
      }));
      return;
    }

    if (step < stepTitles.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    onRegisterCompany(data);
  }

  const sharedStepProps = {
    data,
    errors: visibleErrors,
    onBlur: markTouched,
    onChange: updateField,
  };

  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/85 p-5 shadow-[0_28px_80px_rgba(2,6,23,0.48)] backdrop-blur-xl sm:p-7">
      <header>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Step {step + 1} of 4
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Platform Provisioning
            </p>
          </div>
          <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-200">
            {Math.round(((step + 1) / stepTitles.length) * 100)}%
          </span>
        </div>

        <div
          className="mt-4 grid grid-cols-4 gap-2"
          role="progressbar"
          aria-label="Company registration progress"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step + 1}
        >
          {stepTitles.map((title, index) => (
            <div
              key={title}
              className={`h-1.5 rounded-full transition-colors ${
                index <= step
                  ? "bg-gradient-to-r from-violet-500 to-blue-500"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">
          Onboarding Registration Form
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Provide basic details to scaffold company workspaces.
        </p>
        <h3
          ref={stepHeadingRef}
          tabIndex={-1}
          className="mt-5 text-base font-bold text-violet-200 outline-none sm:text-lg"
        >
          {stepTitles[step]}
        </h3>
      </header>

      <form className="mt-5" noValidate onSubmit={handleSubmit}>
        <div key={step} className="wizard-step-enter">
          {step === 0 && <CompanyRegistrationStepOne {...sharedStepProps} />}
          {step === 1 && <CompanyRegistrationStepTwo {...sharedStepProps} />}
          {step === 2 && <CompanyRegistrationStepThree {...sharedStepProps} />}
          {step === 3 && (
            <CompanyRegistrationStepFour
              {...sharedStepProps}
              captchaQuestion={captcha.question}
              onRefreshCaptcha={refreshCaptcha}
            />
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          {step > 0 ? (
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-600 px-5 text-sm font-bold text-slate-200 transition hover:border-slate-400 hover:bg-white/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
              onClick={() => setStep((current) => current - 1)}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          ) : null}

          <button
            type="submit"
            disabled={!isCurrentStepValid}
            className="group flex h-12 flex-1 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 text-sm font-black text-white shadow-[0_16px_35px_rgba(79,70,229,0.28)] transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/40 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0"
          >
            {step === stepTitles.length - 1 ? (
              <>
                <Check className="h-5 w-5" aria-hidden="true" />
                Complete Registration
              </>
            ) : (
              <>
                Advance Form
                <ArrowRight
                  className="h-5 w-5 transition group-hover:translate-x-1 group-disabled:translate-x-0"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 border-t border-white/10 pt-5 text-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded text-sm font-bold text-slate-400 transition hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
          onClick={onSignInClick}
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Return to Sign In
        </button>
      </div>
    </div>
  );
}
