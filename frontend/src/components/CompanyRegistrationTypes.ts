export type CompanyRegistrationFormState = {
  company_name: string;
  company_type: string;
  industry_sector: string;
  gst_identification_number: string;
  corporate_website: string;
  corporate_work_email: string;
  company_phone: string;
  contact_officer_full_name: string;
  corporate_designation: string;
  mobile_contact_phone: string;
  credentials_outbox_email: string;
  detailed_street_address: string;
  city: string;
  state_region: string;
  emergency_number: string;
  postal_pincode: string;
  number_of_sites: string;
  total_buildings_complex: string;
  pre_onboarded_core_roster_count: string;
  workforce_shifts_strength: string;
  initial_facility_assets_count: string;
  admin_username: string;
  admin_email: string;
  admin_password: string;
  admin_confirm_password: string;
  terms_accepted: boolean;
};

export type CompanyRegistrationPayload = {
  company_name: string;
  company_type: string;
  industry_sector: string;
  gst_identification_number: string;
  corporate_website: string | null;
  corporate_work_email: string;
  company_phone: string;
  contact_officer_full_name: string;
  corporate_designation: string;
  mobile_contact_phone: string;
  credentials_outbox_email: string;
  detailed_street_address: string;
  city: string;
  state_region: string;
  emergency_number: string | null;
  postal_pincode: string;
  number_of_sites: number;
  total_buildings_complex: number;
  pre_onboarded_core_roster_count: number;
  workforce_shifts_strength: number;
  initial_facility_assets_count: number;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
};

export function toCompanyRegistrationPayload(
  formState: CompanyRegistrationFormState,
): CompanyRegistrationPayload {
  const corporateWebsite = formState.corporate_website.trim();
  const emergencyNumber = formState.emergency_number.trim();

  return {
    company_name: formState.company_name.trim(),
    company_type: formState.company_type.trim(),
    industry_sector: formState.industry_sector.trim(),
    gst_identification_number:
      formState.gst_identification_number.trim(),
    corporate_website: corporateWebsite || null,
    corporate_work_email: formState.corporate_work_email.trim(),
    company_phone: formState.company_phone.trim(),
    contact_officer_full_name:
      formState.contact_officer_full_name.trim(),
    corporate_designation: formState.corporate_designation.trim(),
    mobile_contact_phone: formState.mobile_contact_phone.trim(),
    credentials_outbox_email:
      formState.credentials_outbox_email.trim(),
    detailed_street_address:
      formState.detailed_street_address.trim(),
    city: formState.city.trim(),
    state_region: formState.state_region.trim(),
    emergency_number: emergencyNumber || null,
    postal_pincode: formState.postal_pincode.trim(),
    number_of_sites: Number(formState.number_of_sites),
    total_buildings_complex: Number(
      formState.total_buildings_complex,
    ),
    pre_onboarded_core_roster_count: Number(
      formState.pre_onboarded_core_roster_count,
    ),
    workforce_shifts_strength: Number(
      formState.workforce_shifts_strength,
    ),
    initial_facility_assets_count: Number(
      formState.initial_facility_assets_count,
    ),
    username: formState.admin_username.trim(),
    email: formState.admin_email.trim(),
    password: formState.admin_password,
    confirm_password: formState.admin_confirm_password,
    terms_accepted: formState.terms_accepted,
  };
}

export type CompanyRegistrationField =
  keyof CompanyRegistrationFormState;

export type CompanyRegistrationErrors = Partial<
  Record<CompanyRegistrationField, string>
>;

export type UpdateCompanyRegistrationField = <
  Field extends CompanyRegistrationField,
>(
  field: Field,
  value: CompanyRegistrationFormState[Field],
) => void;

export type CompanyRegistrationStepProps = {
  data: CompanyRegistrationFormState;
  errors: CompanyRegistrationErrors;
  onBlur: (field: CompanyRegistrationField) => void;
  onChange: UpdateCompanyRegistrationField;
};
