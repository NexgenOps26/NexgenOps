import { FeatureGrid } from "./FeatureGrid";
import { Logo } from "./Logo";

export function BrandPanel() {
  return (
    <aside className="brand-panel relative order-2 min-h-[620px] min-w-0 overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(37,99,235,0.28),transparent_24%),radial-gradient(circle_at_88%_86%,rgba(59,130,246,0.2),transparent_25%),linear-gradient(135deg,#020617_0%,#04122c_48%,#061b45_100%)] px-6 py-7 text-white sm:px-10 lg:col-start-1 lg:row-start-1 lg:flex lg:min-h-screen lg:px-8 lg:py-5 xl:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute -left-28 top-28 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-2 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative z-10 flex w-full min-w-0 flex-col lg:justify-between">
        <header>
          <Logo
            showWordmark
            imageClassName="h-16 w-16 sm:h-20 sm:w-20 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
            wordmarkClassName="lg:!text-[2rem] xl:!text-[2.35rem]"
          />
          <p className="mt-4 max-w-full text-xs font-medium uppercase tracking-[0.22em] text-slate-300 sm:text-sm lg:mt-2 lg:text-[0.7rem] xl:text-xs">
            Enterprise Asset & Facilities Integration
          </p>
        </header>

        <main className="flex flex-1 flex-col justify-center py-9 lg:py-3 xl:py-4">
          <h1 className="max-w-[680px] text-[2.35rem] font-black leading-[1.12] tracking-normal text-white sm:text-[2.75rem] lg:text-[2.25rem] lg:leading-[1.06] xl:text-[2.65rem] 2xl:text-[3rem]">
            <span className="bg-gradient-to-r from-electric-500 to-electric-300 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Facilities & Asset{" "}
            <span className="text-electric-400">Operations</span> Platform
          </h1>

          <p className="brand-description mt-4 max-w-[580px] text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mt-2.5 lg:text-[0.82rem] lg:leading-5 xl:text-sm xl:leading-6 2xl:text-base 2xl:leading-7">
            Digitize, automate, and optimize critical equipment maintenance,
            daily log inspections, and safety compliance through central
            intelligent AI analytics. Compatible with modern ISO standards.
          </p>

          <div className="mt-7 lg:mt-4 xl:mt-5 2xl:mt-6">
            <FeatureGrid />
          </div>
        </main>

        <footer className="border-t border-white/10 pt-4 text-xs text-slate-400 sm:flex sm:items-center sm:justify-between lg:pt-3 lg:text-[0.7rem] xl:text-xs">
          <p>NexgenOps Commercial v4.2.0</p>
          <p className="brand-footer-secondary mt-2 sm:mt-0">
            Security Certified CCPA & GDPR compliant
          </p>
        </footer>
      </div>
    </aside>
  );
}
