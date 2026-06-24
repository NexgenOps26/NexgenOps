import { FeatureGrid } from "./FeatureGrid";
import { Logo } from "./Logo";

export function BrandPanel() {
  return (
    <aside className="relative order-2 min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(37,99,235,0.28),transparent_24%),radial-gradient(circle_at_88%_86%,rgba(59,130,246,0.2),transparent_25%),linear-gradient(135deg,#020617_0%,#04122c_48%,#061b45_100%)] px-6 py-9 text-white sm:px-10 lg:order-1 lg:flex lg:min-h-screen lg:basis-[52%] lg:px-12 xl:px-[4.5rem]">
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

      <div className="relative z-10 flex w-full flex-col">
        <header>
          <Logo showWordmark imageClassName="h-20 w-20 sm:h-24 sm:w-24" />
          <p className="mt-8 max-w-full text-sm font-medium uppercase tracking-[0.25em] text-slate-300 sm:text-base">
            Enterprise Asset & Facilities Integration
          </p>
        </header>

        <main className="flex flex-1 flex-col justify-center py-14 lg:py-10">
          <h1 className="max-w-[720px] text-[2.55rem] font-black leading-[1.15] tracking-normal text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
            <span className="bg-gradient-to-r from-electric-500 to-electric-300 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Facilities & Asset{" "}
            <span className="text-electric-400">Operations</span> Platform
          </h1>

          <p className="mt-8 max-w-[580px] text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Digitize, automate, and optimize critical equipment maintenance,
            daily log inspections, and safety compliance through central
            intelligent AI analytics. Compatible with modern ISO standards.
          </p>

          <div className="mt-14">
            <FeatureGrid />
          </div>
        </main>

        <footer className="border-t border-white/10 pt-7 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>NexgenOps Commercial v4.2.0</p>
          <p className="mt-3 sm:mt-0">Security Certified CCPA & GDPR compliant</p>
        </footer>
      </div>
    </aside>
  );
}
