import type { CompanyRegistrationStepProps } from "./CompanyRegistrationTypes";

export function CompanyRegistrationStepFour({
  data,
  errors,
  onBlur,
  onChange,
}: CompanyRegistrationStepProps) {
  const termsErrorId = "terms-accepted-error";
  const location = [data.city, data.state_region].filter(Boolean).join(", ");
  const reviewItems = [
    ["Company", data.company_name],
    ["Type & sector", `${data.company_type} · ${data.industry_sector}`],
    ["Primary contact", data.contact_officer_full_name],
    ["Work email", data.corporate_work_email],
    ["Location", location],
    [
      "Facilities",
      `${data.number_of_sites} site(s) · ${data.total_buildings_complex} building(s)`,
    ],
  ] as const;

  return (
    <div className="grid gap-4">
      <section
        className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5"
        aria-labelledby="registration-review-heading"
      >
        <h4
          id="registration-review-heading"
          className="text-sm font-black uppercase tracking-[0.12em] text-slate-700"
        >
          Registration summary
        </h4>
        <dl className="mt-2.5 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
          {reviewItems.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs font-bold text-slate-500">{label}</dt>
              <dd className="mt-0.5 break-words text-sm font-semibold text-slate-900">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-5 text-slate-600">
          Use Back to correct any information before completing registration.
        </p>
      </section>

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 bg-white/70 p-3.5 text-sm leading-5 text-slate-600 transition hover:border-blue-400 hover:bg-white">
          <input
            type="checkbox"
            name="terms_accepted"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30"
            checked={data.terms_accepted}
            aria-invalid={Boolean(errors.terms_accepted)}
            aria-describedby={
              errors.terms_accepted ? termsErrorId : undefined
            }
            onBlur={() => onBlur("terms_accepted")}
            onChange={(event) =>
              onChange("terms_accepted", event.target.checked)
            }
          />
          <span>
            I confirm that the information provided is accurate and agree to
            the NexgenOps Terms of Use and Privacy Policy. *
          </span>
        </label>
        {errors.terms_accepted && (
          <p
            id={termsErrorId}
            className="mt-1.5 text-sm font-medium text-red-700"
            role="alert"
          >
            {errors.terms_accepted}
          </p>
        )}
      </div>
    </div>
  );
}
