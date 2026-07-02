export type CompanyRegistrationData = {
  companyName: string;
  companyType: string;
  industrySectors: string;
  gstNumber: string;
  corporateWebsite: string;
  corporateWorkEmail: string;
  companyPhone: string;
  contactOfficerName: string;
  corporateDesignation: string;
  mobileContactPhone: string;
  credentialsEmail: string;
  streetAddress: string;
  city: string;
  stateRegion: string;
  emergencyNumber: string;
  postalCode: string;
  numberOfSites: string;
  totalBuildings: string;
  coreRosterCount: string;
  workforceShifts: string;
  initialAssetsCount: string;
  adminUsername: string;
  password: string;
  confirmPassword: string;
  captchaAnswer: string;
  acceptedTerms: boolean;
};

export type CompanyRegistrationField = keyof CompanyRegistrationData;

export type CompanyRegistrationErrors = Partial<
  Record<CompanyRegistrationField, string>
>;

export type UpdateCompanyRegistrationField = <
  Field extends CompanyRegistrationField,
>(
  field: Field,
  value: CompanyRegistrationData[Field],
) => void;

export type CompanyRegistrationStepProps = {
  data: CompanyRegistrationData;
  errors: CompanyRegistrationErrors;
  onBlur: (field: CompanyRegistrationField) => void;
  onChange: UpdateCompanyRegistrationField;
};
