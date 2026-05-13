import Container from "./Container";
import Reveal from "./Reveal";
import EarlyAccessTrigger from "./early-access/Trigger";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative bg-paper py-16 sm:py-20">
      <Container size="default">
        <Reveal className="relative overflow-hidden rounded-4xl border border-line bg-primary-soft/60 px-7 py-14 sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mask-[radial-gradient(70%_60%_at_50%_0%,black,transparent)] pw-grid-bg opacity-50"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="pw-display mt-6 text-[36px] font-medium leading-[1.05] text-ink sm:text-[56px]">
              Stop ending the month{" "}
              <span className="text-primary">surprised.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.65] text-mute">
              Join the early access list. Be among the first users shaping the
              future of intelligent personal finance in Africa.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3">
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
              <p className="text-[12.5px] text-soft">
                Takes about 60 seconds. No debit card.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
