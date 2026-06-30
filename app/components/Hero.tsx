import Image from "next/image";
import Container from "./Container";
import EarlyAccessTrigger from "./early-access/Trigger";
import heroImgLight from "../../public/iphone-16-light-hd.webp";
import heroImgDark from "../../public/iphone-16-dark-hd.webp";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-primary-soft/60 pt-20 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl pw-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl pw-blob"
        style={{ animationDelay: "-9s" }}
      />

      <Container
        size="wide"
        className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-20"
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

          <div className="pw-fade-up-delay-2 lg:col-span-5">
            <div className="relative mx-auto flex justify-center lg:justify-end">
              <div
                aria-hidden
                className="pw-phone-glow pointer-events-none absolute inset-0 -z-10 translate-y-4 rounded-[3rem] bg-primary/18 blur-3xl"
              />

              <div className="pw-float relative w-[200px] sm:w-[230px] lg:w-[260px] xl:w-[290px]">
                <div
                  aria-hidden
                  className="pw-only-dark pointer-events-none absolute inset-0 z-10 rounded-[27px] sm:rounded-[31px] lg:rounded-[35px] xl:rounded-[39px]"
                  style={{ boxShadow: "inset 0 0 0 7px #000" }}
                />

                <Image
                  src={heroImgLight}
                  alt="Pocketwize AI Coach — spending insights"
                  priority
                  unoptimized
                  className="pw-only-light h-auto w-full select-none"
                  style={{ filter: "drop-shadow(0 28px 44px rgba(0,0,0,0.18))" }}
                />

                <Image
                  src={heroImgDark}
                  alt="Pocketwize AI Coach — spending insights"
                  priority
                  unoptimized
                  className="pw-only-dark h-auto w-full select-none"
                  style={{ filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.62))" }}
                />
              </div>
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
