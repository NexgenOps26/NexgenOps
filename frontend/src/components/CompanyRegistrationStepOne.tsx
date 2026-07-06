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
        name="company_name"
        label="Company Name *"
        icon={Building2}
        placeholder="Nexgen Facilities Pvt. Ltd."
        required
        value={data.company_name}
        error={errors.company_name}
        onBlur={() => onBlur("company_name")}
        onChange={(event) => onChange("company_name", event.target.value)}
      />
      <AuthField
        id="company-type"
        name="company_type"
        label="Company Type *"
        icon={BriefcaseBusiness}
        placeholder="Private limited, enterprise..."
        required
        value={data.company_type}
        error={errors.company_type}
        onBlur={() => onBlur("company_type")}
        onChange={(event) => onChange("company_type", event.target.value)}
      />
      <AuthField
        id="industry-sectors"
        name="industry_sector"
        label="Industry Sector *"
        icon={Factory}
        placeholder="Manufacturing, healthcare..."
        required
        value={data.industry_sector}
        error={errors.industry_sector}
        onBlur={() => onBlur("industry_sector")}
        onChange={(event) => onChange("industry_sector", event.target.value)}
      />
      <AuthField
        id="gst-number"
        name="gst_identification_number"
        label="GST Identification Number *"
        icon={BadgeCheck}
        placeholder="Enter GSTIN"
        required
        value={data.gst_identification_number}
        error={errors.gst_identification_number}
        onBlur={() => onBlur("gst_identification_number")}
        onChange={(event) =>
          onChange("gst_identification_number", event.target.value)
        }
      />
      <AuthField
        id="corporate-website"
        name="corporate_website"
        type="url"
        inputMode="url"
        autoComplete="url"
        label="Optional Corporate Website"
        icon={Globe2}
        placeholder="https://company.example"
        value={data.corporate_website}
        error={errors.corporate_website}
        onBlur={() => onBlur("corporate_website")}
        onChange={(event) =>
          onChange("corporate_website", event.target.value)
        }
      />
      <AuthField
        id="corporate-work-email"
        name="corporate_work_email"
        type="email"
        inputMode="email"
        autoComplete="email"
        label="Corporate Work Email *"
        icon={Mail}
        placeholder="operations@company.com"
        required
        value={data.corporate_work_email}
        error={errors.corporate_work_email}
        onBlur={() => onBlur("corporate_work_email")}
        onChange={(event) =>
          onChange("corporate_work_email", event.target.value)
        }
      />
      <div className="sm:col-span-2">
        <AuthField
          id="company-phone"
          name="company_phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          label="Company Phone *"
          icon={Phone}
          placeholder="+91 98765 43210"
          required
          value={data.company_phone}
          error={errors.company_phone}
          onBlur={() => onBlur("company_phone")}
          onChange={(event) =>
            onChange("company_phone", event.target.value)
          }
        />
      </div>
    </div>
  );
}
