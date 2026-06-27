import Container from "./Container";
import Reveal from "./Reveal";
import EarlyAccessTrigger from "./early-access/Trigger";

export default function Clarity() {
  return (
    <section
      id="clarity"
      className="relative overflow-hidden border-y border-line bg-primary-soft/60 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mask-[radial-gradient(70%_60%_at_50%_0%,black,transparent)] pw-grid-bg opacity-50"
      />
      <Container size="default">
        <Reveal className="relative">
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="pw-display text-[34px] font-medium leading-[1.1] text-ink sm:text-[46px]">
              Money can be confusing.{" "}
              <span className="text-primary">PocketWize makes it clear.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.65] text-mute">
              It helps you understand your spending, reduce financial stress,
              and make smarter money decisions.
            </p>

            <div className="mt-9">
              <EarlyAccessTrigger className="pw-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-[15px] font-medium text-paper transition-all hover:-translate-y-px hover:bg-primary-ink">
                Try PocketWize
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
