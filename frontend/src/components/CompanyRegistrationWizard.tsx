import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import {
  inquiryActionClassName,
  PrimaryAction,
} from "./AuthFormControls";
import { CompanyRegistrationStepOne } from "./CompanyRegistrationStepOne";
import { CompanyRegistrationStepTwo } from "./CompanyRegistrationStepTwo";
import { CompanyRegistrationStepThree } from "./CompanyRegistrationStepThree";
import { CompanyRegistrationStepFour } from "./CompanyRegistrationStepFour";
import {
  toCompanyRegistrationPayload,
  type CompanyRegistrationErrors,
  type CompanyRegistrationField,
  type CompanyRegistrationFormState,
  type CompanyRegistrationPayload,
  type UpdateCompanyRegistrationField,
} from "./CompanyRegistrationTypes";

export {
  toCompanyRegistrationPayload,
  type CompanyRegistrationFormState,
  type CompanyRegistrationPayload,
} from "./CompanyRegistrationTypes";

type CompanyRegistrationWizardProps = {
  onRegisterCompany: (payload: CompanyRegistrationPayload) => void;
  onSignInClick: () => void;
};

const stepTitles = [
  "Company Details",
  "Primary Contact Person & Corporate Info",
  "Corporate Facility & Demographics Info",
  "Review & Terms Acceptance",
] as const;

const stepFields: CompanyRegistrationField[][] = [
  [
    "company_name",
    "company_type",
    "industry_sector",
    "gst_identification_number",
    "corporate_website",
    "corporate_work_email",
    "company_phone",
  ],
  [
    "contact_officer_full_name",
    "corporate_designation",
    "mobile_contact_phone",
    "credentials_outbox_email",
    "detailed_street_address",
    "city",
    "state_region",
    "emergency_number",
    "postal_pincode",
  ],
  [
    "number_of_sites",
    "total_buildings_complex",
    "pre_onboarded_core_roster_count",
    "workforce_shifts_strength",
    "initial_facility_assets_count",
  ],
  ["terms_accepted"],
];

const initialData: CompanyRegistrationFormState = {
  company_name: "",
  company_type: "",
  industry_sector: "",
  gst_identification_number: "",
  corporate_website: "",
  corporate_work_email: "",
  company_phone: "",
  contact_officer_full_name: "",
  corporate_designation: "",
  mobile_contact_phone: "",
  credentials_outbox_email: "",
  detailed_street_address: "",
  city: "",
  state_region: "",
  emergency_number: "",
  postal_pincode: "",
  number_of_sites: "",
  total_buildings_complex: "",
  pre_onboarded_core_roster_count: "",
  workforce_shifts_strength: "",
  initial_facility_assets_count: "",
  terms_accepted: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nonNegativeIntegerPattern = /^\d+$/;

function isValidWebsite(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      ["http:", "https:", "ftp:", "ftps:"].includes(url.protocol) &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
}

function validateRegistration(
  data: CompanyRegistrationFormState,
): CompanyRegistrationErrors {
  const errors: CompanyRegistrationErrors = {};

  const requireText = (
    field: Exclude<CompanyRegistrationField, "terms_accepted">,
    label: string,
    maxLength?: number,
  ) => {
    const value = data[field].trim();
    if (!value) {
      errors[field] = `${label} is required.`;
    } else if (maxLength && value.length > maxLength) {
      errors[field] = `${label} must be ${maxLength} characters or fewer.`;
    }
  };

  requireText("company_name", "Company name", 255);
  requireText("company_type", "Company type", 100);
  requireText("industry_sector", "Industry sector", 150);
  requireText(
    "gst_identification_number",
    "GST identification number",
    50,
  );
  requireText("corporate_work_email", "Corporate work email", 254);
  requireText("company_phone", "Company phone", 20);

  const corporateWebsite = data.corporate_website.trim();
  if (corporateWebsite.length > 200) {
    errors.corporate_website =
      "Corporate website must be 200 characters or fewer.";
  } else if (corporateWebsite && !isValidWebsite(corporateWebsite)) {
    errors.corporate_website = "Enter a valid corporate website URL.";
  }

  if (
    data.corporate_work_email.trim() &&
    !emailPattern.test(data.corporate_work_email.trim())
  ) {
    errors.corporate_work_email =
      "Enter a valid corporate email address.";
  }

  requireText("contact_officer_full_name", "Contact officer name", 255);
  requireText("corporate_designation", "Corporate designation", 150);
  requireText("mobile_contact_phone", "Mobile contact phone", 20);
  requireText("credentials_outbox_email", "Credentials email", 254);
  requireText("detailed_street_address", "Street address");
  requireText("city", "City", 100);
  requireText("state_region", "State or region", 100);
  requireText("postal_pincode", "Postal or pincode", 20);

  if (
    data.credentials_outbox_email.trim() &&
    !emailPattern.test(data.credentials_outbox_email.trim())
  ) {
    errors.credentials_outbox_email =
      "Enter a valid credentials email address.";
  }

  if (data.emergency_number.trim().length > 20) {
    errors.emergency_number =
      "Emergency number must be 20 characters or fewer.";
  }

  const validateCount = (
    field:
      | "number_of_sites"
      | "total_buildings_complex"
      | "pre_onboarded_core_roster_count"
      | "workforce_shifts_strength"
      | "initial_facility_assets_count",
    label: string,
    minimum: number,
  ) => {
    const value = data[field].trim();
    const numericValue = Number(value);

    if (!value) {
      errors[field] = `${label} is required.`;
    } else if (
      !nonNegativeIntegerPattern.test(value) ||
      !Number.isSafeInteger(numericValue) ||
      numericValue < minimum
    ) {
      errors[field] = `Enter a whole number of ${minimum} or more.`;
    }
  };

  validateCount("number_of_sites", "Number of sites", 0);
  validateCount("total_buildings_complex", "Total buildings", 0);
  validateCount(
    "pre_onboarded_core_roster_count",
    "Core roster count",
    0,
  );
  validateCount(
    "workforce_shifts_strength",
    "Workforce shifts strength",
    0,
  );
  validateCount(
    "initial_facility_assets_count",
    "Initial assets count",
    0,
  );

  if (!data.terms_accepted) {
    errors.terms_accepted = "You must accept the terms to continue.";
  }

  return errors;
}

export function CompanyRegistrationWizard({
  onRegisterCompany,
  onSignInClick,
}: CompanyRegistrationWizardProps) {
  const [data, setData] =
    useState<CompanyRegistrationFormState>(initialData);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState<
    Partial<Record<CompanyRegistrationField, boolean>>
  >({});
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const errors = useMemo(() => validateRegistration(data), [data]);
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

    onRegisterCompany(toCompanyRegistrationPayload(data));
  }

  const sharedStepProps = {
    data,
    errors: visibleErrors,
    onBlur: markTouched,
    onChange: updateField,
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-5 lg:max-h-[calc(100vh-32px)] lg:overflow-hidden lg:p-4 2xl:p-5">
      <header className="shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Step {step + 1} of 4
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Platform Provisioning
            </p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            {Math.round(((step + 1) / stepTitles.length) * 100)}%
          </span>
        </div>

        <div
          className="mt-3 grid grid-cols-4 gap-2"
          role="progressbar"
          aria-label="Company registration progress"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step + 1}
        >
          {stepTitles.map((title, index) => (
            <div
              key={title}
              className={`h-1 rounded-full transition-colors ${
                index <= step ? "bg-blue-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <h2 className="mt-4 text-2xl font-black leading-tight tracking-normal text-slate-900 sm:text-3xl lg:text-[1.75rem]">
          Onboarding Registration Form
        </h2>
        <p className="mt-1.5 text-sm font-medium leading-5 text-slate-600">
          Provide basic details to scaffold company workspaces.
        </p>
        <h3
          ref={stepHeadingRef}
          tabIndex={-1}
          className="mt-3 text-sm font-bold text-blue-700 outline-none sm:text-base"
        >
          {stepTitles[step]}
        </h3>
      </header>

      <form
        className="mt-2.5 flex min-h-0 flex-col lg:flex-1"
        noValidate
        onSubmit={handleSubmit}
      >
        <div
          key={step}
          className="wizard-form-scroll wizard-step-enter min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1.5"
        >
          {step === 0 && <CompanyRegistrationStepOne {...sharedStepProps} />}
          {step === 1 && <CompanyRegistrationStepTwo {...sharedStepProps} />}
          {step === 2 && (
            <CompanyRegistrationStepThree {...sharedStepProps} />
          )}
          {step === 3 && (
            <CompanyRegistrationStepFour {...sharedStepProps} />
          )}
        </div>

        <div className="mt-3 flex shrink-0 flex-col-reverse gap-3 sm:flex-row sm:items-center">
          {step > 0 ? (
            <button
              type="button"
              className={inquiryActionClassName}
              onClick={() => setStep((current) => current - 1)}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          ) : null}

          <div className="flex-1">
            <PrimaryAction disabled={!isCurrentStepValid}>
              {step === stepTitles.length - 1
                ? "Complete Registration"
                : "Advance Form"}
            </PrimaryAction>
          </div>
        </div>
      </form>

      <div className="mt-3 shrink-0 border-t border-slate-200 pt-2.5 text-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded text-sm font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30"
          onClick={onSignInClick}
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Return to Sign In
        </button>
      </div>
    </div>
  );
}
