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
        name="numberOfSites"
        type="number"
        inputMode="numeric"
        min="1"
        step="1"
        label="Number of Sites / Campuses *"
        icon={Landmark}
        placeholder="1"
        required
        value={data.numberOfSites}
        error={errors.numberOfSites}
        onBlur={() => onBlur("numberOfSites")}
        onChange={(event) => onChange("numberOfSites", event.target.value)}
      />
      <AuthField
        id="total-buildings"
        name="totalBuildings"
        type="number"
        inputMode="numeric"
        min="1"
        step="1"
        label="Total Buildings Complex *"
        icon={Building2}
        placeholder="1"
        required
        value={data.totalBuildings}
        error={errors.totalBuildings}
        onBlur={() => onBlur("totalBuildings")}
        onChange={(event) => onChange("totalBuildings", event.target.value)}
      />
      <AuthField
        id="core-roster-count"
        name="coreRosterCount"
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        label="Pre-onboarded Core Roster count *"
        icon={UsersRound}
        placeholder="0"
        required
        value={data.coreRosterCount}
        error={errors.coreRosterCount}
        onBlur={() => onBlur("coreRosterCount")}
        onChange={(event) => onChange("coreRosterCount", event.target.value)}
      />
      <AuthField
        id="workforce-shifts"
        name="workforceShifts"
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        label="Workforce shifts Strength *"
        icon={CalendarRange}
        placeholder="0"
        required
        value={data.workforceShifts}
        error={errors.workforceShifts}
        onBlur={() => onBlur("workforceShifts")}
        onChange={(event) => onChange("workforceShifts", event.target.value)}
      />
      <div className="sm:col-span-2">
        <AuthField
          id="initial-assets-count"
          name="initialAssetsCount"
          type="number"
          inputMode="numeric"
          min="0"
          step="1"
          label="Initial Facility Assets Count (estimate) *"
          icon={PackageSearch}
          placeholder="0"
          required
          value={data.initialAssetsCount}
          error={errors.initialAssetsCount}
          onBlur={() => onBlur("initialAssetsCount")}
          onChange={(event) =>
            onChange("initialAssetsCount", event.target.value)
          }
        />
      </div>
    </div>
  );
}
