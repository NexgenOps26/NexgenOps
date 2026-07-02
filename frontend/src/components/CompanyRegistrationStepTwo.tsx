import {
  BriefcaseBusiness,
  Building,
  Contact,
  MapPin,
  MapPinned,
  Mail,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { AuthField } from "./AuthFormControls";
import type { CompanyRegistrationStepProps } from "./CompanyRegistrationTypes";

export function CompanyRegistrationStepTwo({
  data,
  errors,
  onBlur,
  onChange,
}: CompanyRegistrationStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AuthField
        id="contact-officer-name"
        name="contactOfficerName"
        autoComplete="name"
        label="Contact Officer Full Name *"
        icon={Contact}
        placeholder="Full name"
        required
        value={data.contactOfficerName}
        error={errors.contactOfficerName}
        onBlur={() => onBlur("contactOfficerName")}
        onChange={(event) =>
          onChange("contactOfficerName", event.target.value)
        }
      />
      <AuthField
        id="corporate-designation"
        name="corporateDesignation"
        label="Corporate Designation *"
        icon={BriefcaseBusiness}
        placeholder="Facilities Director"
        required
        value={data.corporateDesignation}
        error={errors.corporateDesignation}
        onBlur={() => onBlur("corporateDesignation")}
        onChange={(event) =>
          onChange("corporateDesignation", event.target.value)
        }
      />
      <AuthField
        id="mobile-contact-phone"
        name="mobileContactPhone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        label="Mobile Contact Phone *"
        icon={Phone}
        placeholder="+91 98765 43210"
        required
        value={data.mobileContactPhone}
        error={errors.mobileContactPhone}
        onBlur={() => onBlur("mobileContactPhone")}
        onChange={(event) =>
          onChange("mobileContactPhone", event.target.value)
        }
      />
      <AuthField
        id="credentials-email"
        name="credentialsEmail"
        type="email"
        inputMode="email"
        autoComplete="email"
        label="Email Address (Credentials Outbox) *"
        icon={Mail}
        placeholder="admin@company.com"
        required
        value={data.credentialsEmail}
        error={errors.credentialsEmail}
        onBlur={() => onBlur("credentialsEmail")}
        onChange={(event) => onChange("credentialsEmail", event.target.value)}
      />
      <div className="sm:col-span-2">
        <AuthField
          id="street-address"
          name="streetAddress"
          autoComplete="street-address"
          label="Detailed Street Address *"
          icon={Building}
          placeholder="Building, street, area"
          required
          value={data.streetAddress}
          error={errors.streetAddress}
          onBlur={() => onBlur("streetAddress")}
          onChange={(event) => onChange("streetAddress", event.target.value)}
        />
      </div>
      <AuthField
        id="city"
        name="city"
        autoComplete="address-level2"
        label="City *"
        icon={MapPin}
        placeholder="City"
        required
        value={data.city}
        error={errors.city}
        onBlur={() => onBlur("city")}
        onChange={(event) => onChange("city", event.target.value)}
      />
      <AuthField
        id="state-region"
        name="stateRegion"
        autoComplete="address-level1"
        label="State / Region"
        icon={MapPinned}
        placeholder="State or region"
        value={data.stateRegion}
        error={errors.stateRegion}
        onBlur={() => onBlur("stateRegion")}
        onChange={(event) => onChange("stateRegion", event.target.value)}
      />
      <AuthField
        id="emergency-number"
        name="emergencyNumber"
        type="tel"
        inputMode="tel"
        label="Emergency No."
        icon={ShieldAlert}
        placeholder="Emergency contact"
        value={data.emergencyNumber}
        error={errors.emergencyNumber}
        onBlur={() => onBlur("emergencyNumber")}
        onChange={(event) => onChange("emergencyNumber", event.target.value)}
      />
      <AuthField
        id="postal-code"
        name="postalCode"
        inputMode="numeric"
        autoComplete="postal-code"
        label="Postal/Pincode *"
        icon={MapPin}
        placeholder="Postal code"
        required
        value={data.postalCode}
        error={errors.postalCode}
        onBlur={() => onBlur("postalCode")}
        onChange={(event) => onChange("postalCode", event.target.value)}
      />
    </div>
  );
}
