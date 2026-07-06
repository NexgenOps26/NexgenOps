import {
  Building2,
  CalendarRange,
  Landmark,
  PackageSearch,
  UsersRound,
} from "lucide-react";
import { AuthField } from "./AuthFormControls";
import type { CompanyRegistrationStepProps } from "./CompanyRegistrationTypes";

export function CompanyRegistrationStepThree({
  data,
  errors,
  onBlur,
  onChange,
}: CompanyRegistrationStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AuthField
        id="number-of-sites"
        name="number_of_sites"
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        label="Number of Sites / Campuses *"
        icon={Landmark}
        placeholder="1"
        required
        value={data.number_of_sites}
        error={errors.number_of_sites}
        onBlur={() => onBlur("number_of_sites")}
        onChange={(event) =>
          onChange("number_of_sites", event.target.value)
        }
      />
      <AuthField
        id="total-buildings"
        name="total_buildings_complex"
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        label="Total Buildings Complex *"
        icon={Building2}
        placeholder="1"
        required
        value={data.total_buildings_complex}
        error={errors.total_buildings_complex}
        onBlur={() => onBlur("total_buildings_complex")}
        onChange={(event) =>
          onChange("total_buildings_complex", event.target.value)
        }
      />
      <AuthField
        id="core-roster-count"
        name="pre_onboarded_core_roster_count"
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        label="Pre-onboarded Core Roster count *"
        icon={UsersRound}
        placeholder="0"
        required
        value={data.pre_onboarded_core_roster_count}
        error={errors.pre_onboarded_core_roster_count}
        onBlur={() => onBlur("pre_onboarded_core_roster_count")}
        onChange={(event) =>
          onChange(
            "pre_onboarded_core_roster_count",
            event.target.value,
          )
        }
      />
      <AuthField
        id="workforce-shifts"
        name="workforce_shifts_strength"
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        label="Workforce shifts Strength *"
        icon={CalendarRange}
        placeholder="0"
        required
        value={data.workforce_shifts_strength}
        error={errors.workforce_shifts_strength}
        onBlur={() => onBlur("workforce_shifts_strength")}
        onChange={(event) =>
          onChange("workforce_shifts_strength", event.target.value)
        }
      />
      <div className="sm:col-span-2">
        <AuthField
          id="initial-assets-count"
          name="initial_facility_assets_count"
          type="number"
          inputMode="numeric"
          min="0"
          step="1"
          label="Initial Facility Assets Count (estimate) *"
          icon={PackageSearch}
          placeholder="0"
          required
          value={data.initial_facility_assets_count}
          error={errors.initial_facility_assets_count}
          onBlur={() => onBlur("initial_facility_assets_count")}
          onChange={(event) =>
            onChange("initial_facility_assets_count", event.target.value)
          }
        />
      </div>
    </div>
  );
}
