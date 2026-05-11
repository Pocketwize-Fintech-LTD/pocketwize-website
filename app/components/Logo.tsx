type LogoProps = {
  className?: string;
  variant?: "default" | "light";
};

export default function Logo({ className = "", variant = "default" }: LogoProps) {
  const wordColor = variant === "light" ? "text-paper" : "text-ink";
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="relative inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-primary-ink"
      >
        <span className="absolute inset-[3px] rounded-[6px] bg-primary" />
        <span className="relative text-[12px] font-semibold tracking-tight text-paper">
          P
        </span>
      </span>
      <span
        className={`text-[17px] font-medium tracking-[-0.01em] ${wordColor}`}
      >
        Pocketwize
      </span>
    </div>
  );
}
