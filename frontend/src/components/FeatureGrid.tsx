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
    <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <article key={feature.title} className="flex min-w-0 items-start gap-5">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ${feature.accent}`}
              aria-hidden="true"
            >
              <Icon className={`h-7 w-7 ${feature.iconColor}`} strokeWidth={2.1} />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-[0.96rem] leading-7 text-slate-300">
                {feature.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
