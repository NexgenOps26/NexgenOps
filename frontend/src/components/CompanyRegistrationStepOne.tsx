import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Factory,
  Globe2,
  Mail,
  Phone,
} from "lucide-react";
import { AuthField } from "./AuthFormControls";
import type { CompanyRegistrationStepProps } from "./CompanyRegistrationTypes";

export function CompanyRegistrationStepOne({
  data,
  errors,
  onBlur,
  onChange,
}: CompanyRegistrationStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AuthField
        id="company-name"
        name="companyName"
        label="Company Name *"
        icon={Building2}
        placeholder="Nexgen Facilities Pvt. Ltd."
        required
        value={data.companyName}
        error={errors.companyName}
        onBlur={() => onBlur("companyName")}
        onChange={(event) => onChange("companyName", event.target.value)}
      />
      <AuthField
        id="company-type"
        name="companyType"
        label="Company Type *"
        icon={BriefcaseBusiness}
        placeholder="Private limited, enterprise..."
        required
        value={data.companyType}
        error={errors.companyType}
        onBlur={() => onBlur("companyType")}
        onChange={(event) => onChange("companyType", event.target.value)}
      />
      <AuthField
        id="industry-sectors"
        name="industrySectors"
        label="Industry Sectors *"
        icon={Factory}
        placeholder="Manufacturing, healthcare..."
        required
        value={data.industrySectors}
        error={errors.industrySectors}
        onBlur={() => onBlur("industrySectors")}
        onChange={(event) => onChange("industrySectors", event.target.value)}
      />
      <AuthField
        id="gst-number"
        name="gstNumber"
        label="GST Identification Number *"
        icon={BadgeCheck}
        placeholder="Enter GSTIN"
        required
        value={data.gstNumber}
        error={errors.gstNumber}
        onBlur={() => onBlur("gstNumber")}
        onChange={(event) => onChange("gstNumber", event.target.value)}
      />
      <AuthField
        id="corporate-website"
        name="corporateWebsite"
        type="url"
        inputMode="url"
        autoComplete="url"
        label="Optional Corporate Website"
        icon={Globe2}
        placeholder="https://company.example"
        value={data.corporateWebsite}
        error={errors.corporateWebsite}
        onBlur={() => onBlur("corporateWebsite")}
        onChange={(event) => onChange("corporateWebsite", event.target.value)}
      />
      <AuthField
        id="corporate-work-email"
        name="corporateWorkEmail"
        type="email"
        inputMode="email"
        autoComplete="email"
        label="Corporate Work Email *"
        icon={Mail}
        placeholder="operations@company.com"
        required
        value={data.corporateWorkEmail}
        error={errors.corporateWorkEmail}
        onBlur={() => onBlur("corporateWorkEmail")}
        onChange={(event) =>
          onChange("corporateWorkEmail", event.target.value)
        }
      />
      <div className="sm:col-span-2">
        <AuthField
          id="company-phone"
          name="companyPhone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          label="Company Phone *"
          icon={Phone}
          placeholder="+91 98765 43210"
          required
          value={data.companyPhone}
          error={errors.companyPhone}
          onBlur={() => onBlur("companyPhone")}
          onChange={(event) => onChange("companyPhone", event.target.value)}
        />
      </div>
    </div>
  );
}
