import Image from "next/image";
import Container from "./Container";
import EarlyAccessTrigger from "./early-access/Trigger";
import heroImg from "../../public/hero_img.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-primary-soft/60 pt-20 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-105 w-105 rounded-full bg-primary/15 blur-3xl pw-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-90 w-90 rounded-full bg-secondary/10 blur-3xl pw-blob"
        style={{ animationDelay: "-9s" }}
      />
      <Container
        size="wide"
        className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-20"
      >
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="text-center lg:col-span-7 lg:text-left">
            <h1 className="pw-display pw-fade-up-delay-1 text-[44px] font-medium leading-[1.05] text-ink sm:text-[60px] lg:text-[76px]">
              Your AI financial
              <br className="hidden sm:block" /> companion
              <span className="block text-primary">for everyday life.</span>
            </h1>

            <p className="pw-fade-up-delay-2 mx-auto mt-8 max-w-xl text-[18px] leading-[1.6] text-mute sm:text-[20px] lg:mx-0">
              Pocketwize is your AI financial companion helping you understand
              spending, reduce financial stress, and build long-term wealth with
              smarter money decisions.
            </p>

            <div className="pw-fade-up-delay-3 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
              <EarlyAccessTrigger className="pw-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-[15px] font-medium text-paper transition-all hover:-translate-y-px hover:bg-primary-ink">
                Join Early Access
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M3.5 8h9M8.5 4 13 8l-4.5 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </EarlyAccessTrigger>
            </div>

            <TrustStrip />
          </div>

          <div className="pw-fade-up-delay-2 relative lg:col-span-5">
            <div className="relative mx-auto flex w-full justify-center lg:justify-end">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 translate-y-6 rounded-[3rem] bg-primary/15 blur-3xl"
              />
              <Image
                src={heroImg}
                alt="Pocketwize AI Coach showing a conversation about spending insights"
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 480px"
                className="pw-float relative h-auto max-h-128 w-auto select-none lg:max-h-150"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "Read-only access",
    "Bank-grade encryption",
    "Never sells your data",
  ];
  return (
    <div className="pw-fade-up-delay-3 mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-soft lg:justify-start">
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-3">
          {i > 0 && <span className="h-1 w-1 rounded-full bg-line" />}
          <span className="inline-flex items-center gap-1.5">
            <CheckTiny />
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

function CheckTiny() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="m2.5 6.2 2.2 2.2 4.8-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-mute"
      />
    </svg>
  );
}
