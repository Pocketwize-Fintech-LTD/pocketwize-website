import Container from "./Container";
import Reveal from "./Reveal";

type Point = {
  title: string;
  body: string;
  icon: IconName;
};

const points: Point[] = [
  {
    title: "See where it goes",
    body: "Understand your spending at a glance, no spreadsheets required.",
    icon: "lens",
  },
  {
    title: "Stress less",
    body: "Spot money problems early and stay in control before they grow.",
    icon: "pulse",
  },
  {
    title: "Decide with confidence",
    body: "Get clear, personalized guidance for everyday money choices.",
    icon: "compass",
  },
];

export default function Clarity() {
  return (
    <section
      id="clarity"
      className="relative overflow-hidden border-y border-line bg-cream/40 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mask-[radial-gradient(70%_60%_at_50%_0%,black,transparent)] pw-grid-bg opacity-50"
      />
      <Container size="default">
        <Reveal className="relative">
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mute">
              <span className="h-px w-6 bg-line" />
              Financial clarity
              <span className="h-px w-6 bg-line" />
            </div>
            <h2 className="pw-display mt-4 text-[34px] font-medium leading-[1.1] text-ink sm:text-[46px]">
              Money can be confusing.{" "}
              <span className="text-primary">PocketWize makes it clear.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.65] text-mute">
              It helps you understand your spending, reduce financial stress,
              and make smarter money decisions.
            </p>
          </div>
        </Reveal>

        <ul className="relative mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-6">
          {points.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 90}
              className="flex flex-col items-center text-center"
            >
              <ClarityIcon name={p.icon} />
              <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <p className="mt-1.5 max-w-[15rem] text-[14px] leading-[1.6] text-mute">
                {p.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

type IconName = "lens" | "pulse" | "compass";

function ClarityIcon({ name }: { name: IconName }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
  };
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-cream text-primary">
      <svg width="19" height="19" viewBox="0 0 18 18" aria-hidden>
        {name === "lens" && (
          <>
            <circle cx="8" cy="8" r="5" {...stroke} />
            <path d="m12 12 3.5 3.5" {...stroke} />
          </>
        )}
        {name === "pulse" && <path d="M2 9h3l1.5-4 3 8 1.5-4H16" {...stroke} />}
        {name === "compass" && (
          <>
            <circle cx="9" cy="9" r="6.5" {...stroke} />
            <path d="m11.5 6.5-3.2 1.4-1.4 3.2 3.2-1.4 1.4-3.2Z" {...stroke} />
          </>
        )}
      </svg>
    </span>
  );
}
