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
    <div className="grid gap-3 sm:grid-cols-2">
      <AuthField
        id="contact-officer-name"
        name="contact_officer_full_name"
        autoComplete="name"
        label="Contact Officer Full Name *"
        icon={Contact}
        placeholder="Full name"
        required
        value={data.contact_officer_full_name}
        error={errors.contact_officer_full_name}
        onBlur={() => onBlur("contact_officer_full_name")}
        onChange={(event) =>
          onChange("contact_officer_full_name", event.target.value)
        }
      />
      <AuthField
        id="corporate-designation"
        name="corporate_designation"
        label="Corporate Designation *"
        icon={BriefcaseBusiness}
        placeholder="Facilities Director"
        required
        value={data.corporate_designation}
        error={errors.corporate_designation}
        onBlur={() => onBlur("corporate_designation")}
        onChange={(event) =>
          onChange("corporate_designation", event.target.value)
        }
      />
      <AuthField
        id="mobile-contact-phone"
        name="mobile_contact_phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        label="Mobile Contact Phone *"
        icon={Phone}
        placeholder="+91 98765 43210"
        required
        value={data.mobile_contact_phone}
        error={errors.mobile_contact_phone}
        onBlur={() => onBlur("mobile_contact_phone")}
        onChange={(event) =>
          onChange("mobile_contact_phone", event.target.value)
        }
      />
      <AuthField
        id="credentials-email"
        name="credentials_outbox_email"
        type="email"
        inputMode="email"
        autoComplete="email"
        label="Email Address (Credentials Outbox) *"
        icon={Mail}
        placeholder="admin@company.com"
        required
        value={data.credentials_outbox_email}
        error={errors.credentials_outbox_email}
        onBlur={() => onBlur("credentials_outbox_email")}
        onChange={(event) =>
          onChange("credentials_outbox_email", event.target.value)
        }
      />
      <div className="sm:col-span-2">
        <AuthField
          id="street-address"
          name="detailed_street_address"
          autoComplete="street-address"
          label="Detailed Street Address *"
          icon={Building}
          placeholder="Building, street, area"
          required
          value={data.detailed_street_address}
          error={errors.detailed_street_address}
          onBlur={() => onBlur("detailed_street_address")}
          onChange={(event) =>
            onChange("detailed_street_address", event.target.value)
          }
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
        name="state_region"
        autoComplete="address-level1"
        label="State / Region *"
        icon={MapPinned}
        placeholder="State or region"
        required
        value={data.state_region}
        error={errors.state_region}
        onBlur={() => onBlur("state_region")}
        onChange={(event) => onChange("state_region", event.target.value)}
      />
      <AuthField
        id="emergency-number"
        name="emergency_number"
        type="tel"
        inputMode="tel"
        label="Emergency No."
        icon={ShieldAlert}
        placeholder="Emergency contact"
        value={data.emergency_number}
        error={errors.emergency_number}
        onBlur={() => onBlur("emergency_number")}
        onChange={(event) =>
          onChange("emergency_number", event.target.value)
        }
      />
      <AuthField
        id="postal-code"
        name="postal_pincode"
        inputMode="numeric"
        autoComplete="postal-code"
        label="Postal/Pincode *"
        icon={MapPin}
        placeholder="Postal code"
        required
        value={data.postal_pincode}
        error={errors.postal_pincode}
        onBlur={() => onBlur("postal_pincode")}
        onChange={(event) =>
          onChange("postal_pincode", event.target.value)
        }
      />
    </div>
  );
}
