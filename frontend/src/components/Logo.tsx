import logoUrl from "../assets/nexgenops-logo.svg";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  imageClassName?: string;
  wordmarkClassName?: string;
};

export function Logo({
  className = "",
  showWordmark = false,
  imageClassName = "h-16 w-16",
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <img
        src={logoUrl}
        alt="NexgenOps"
        className={`shrink-0 rounded-[22%] object-contain ${imageClassName}`}
      />
      {showWordmark ? (
        <span
          className={`text-[clamp(2rem,3.2vw,3.25rem)] font-black leading-none tracking-normal ${wordmarkClassName}`}
        >
          <span className="text-white">Nexgen</span>
          <span className="text-electric-400">Ops</span>
        </span>
      ) : null}
    </div>
  );
}
