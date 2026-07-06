import type { LucideIcon } from "lucide-react";
import { Activity, BrainCircuit, ClipboardCheck, Wrench } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  iconColor: string;
};

const features: Feature[] = [
  {
    title: "Continuous Health Index",
    description: "Real-time status tracking for over 500+ site assets.",
    icon: Activity,
    accent: "from-blue-500 to-blue-700 shadow-blue-950/35",
    iconColor: "text-white",
  },
  {
    title: "Automated PPM Engine",
    description: "Calendar & Kanban scheduled routines to minimize downtime.",
    icon: Wrench,
    accent: "from-emerald-400 to-emerald-700 shadow-emerald-950/35",
    iconColor: "text-white",
  },
  {
    title: "ISO-Compliant Inspection",
    description: "Mobile checklists replace paper logs for substation readings.",
    icon: ClipboardCheck,
    accent: "from-amber-400 to-orange-600 shadow-orange-950/35",
    iconColor: "text-white",
  },
  {
    title: "Predictive AI Advisor",
    description: "Advanced equipment risk forecasting with Gemini.",
    icon: BrainCircuit,
    accent: "from-blue-400 to-indigo-700 shadow-indigo-950/35",
    iconColor: "text-white",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:gap-x-5 lg:gap-y-3 xl:gap-x-6 xl:gap-y-4 2xl:gap-x-8 2xl:gap-y-5">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <article
            key={feature.title}
            className="flex min-w-0 items-start gap-4 lg:gap-2.5 xl:gap-3"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg lg:h-9 lg:w-9 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 ${feature.accent}`}
              aria-hidden="true"
            >
              <Icon
                className={`h-6 w-6 lg:h-[18px] lg:w-[18px] xl:h-5 xl:w-5 2xl:h-6 2xl:w-6 ${feature.iconColor}`}
                strokeWidth={2.1}
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-snug text-white lg:text-xs xl:text-sm 2xl:text-base">
                {feature.title}
              </h3>
              <p className="brand-feature-description mt-1.5 text-sm leading-6 text-slate-300 lg:mt-0.5 lg:text-[0.72rem] lg:leading-4 xl:text-xs xl:leading-5 2xl:mt-1 2xl:text-sm 2xl:leading-6">
                {feature.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
