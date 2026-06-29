import Container from "./Container";
import Reveal from "./Reveal";
import SecuredBy from "./SecuredBy";

const guarantees = [
  "Bank-level encryption",
  "Read-only financial connections",
  "Privacy-first architecture",
];

export default function Trust() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-cream/40 py-16 sm:py-20"
    >
      <Container size="default" className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mute">
            <span className="h-px w-6 bg-line" />
            Security & trust
            <span className="h-px w-6 bg-line" />
          </div>
          <h2 className="pw-display mt-4 text-[34px] font-medium leading-[1.1] text-ink sm:text-[44px]">
            Your financial data{" "}
            <span className="text-primary">stays protected.</span>
          </h2>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={(i % 3) * 80}
              className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-5 py-4"
            >
              <CheckBadge />
              <span className="text-[15px] font-medium text-ink">{item}</span>
            </Reveal>
          ))}
        </ul>

        <SecuredBy />
      </Container>
    </section>
  );
}

function CheckBadge() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line bg-cream text-primary">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="m3.5 7.5 2.3 2.3 4.7-4.7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
