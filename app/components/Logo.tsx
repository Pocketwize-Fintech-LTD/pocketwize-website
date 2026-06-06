import Image from "next/image";
import logoMark from "../../public/logo-mark.png";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
};

export default function Logo({ className = "", variant = "default" }: LogoProps) {
  const wordColor = variant === "light" ? "text-paper" : "text-ink";
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={logoMark}
        alt="Pocketwize"
        priority
        sizes="28px"
        className="h-7 w-7 select-none"
      />
      <span
        className={`text-[28px] font-medium tracking-[-0.01em] ${wordColor}`}
      >
        Pocketwize
      </span>
    </div>
  );
}
