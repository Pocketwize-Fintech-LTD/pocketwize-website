import Container from "./Container";
import Reveal from "./Reveal";
import Typewriter from "./Typewriter";

type Feature = {
  title: string;
  body: string;
  icon: IconName;
  example?: string;
};

const features: Feature[] = [
  {
    title: "Smart spending insights",
    body: "See where your money actually goes without staring at charts.",
    icon: "lens",
  },
  {
    title: "AI financial coach",
    body: "Ask questions about your finances in plain language.",
    example: "Can I afford to eat out this weekend?",
    icon: "chat",
  },
  {
    title: "Financial stress detection",
    body: "Pocketwize spots unhealthy spending patterns before they become problems.",
    icon: "pulse",
  },
  {
    title: "Intelligent budgeting",
    body: "Adaptive budgets that work with real life not rigid rules.",
    icon: "compass",
  },
  {
    title: "Savings & goal tracking",
    body: "Stay consistent toward your savings goals without spreadsheets.",
    icon: "target",
  },
  {
    title: "Personalized alerts",
    body: "Get notified before recurring bills, unusual spending, or low balances.",
    icon: "bell",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-cream/40 py-24 sm:py-32">
      <Container size="default">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mute">
            <span className="h-px w-6 bg-line" />
            Core features
            <span className="h-px w-6 bg-line" />
          </div>
          <h2 className="pw-display mt-4 text-[34px] font-medium leading-[1.1] text-ink sm:text-[44px]">
            Built for{" "}
            <span className="text-primary">how money actually feels.</span>
          </h2>
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={(i % 3) * 90}
              className="flex flex-col rounded-2xl border border-line bg-paper p-7 transition-colors hover:border-ink/15"
            >
              <FeatureIcon name={f.icon} />
              <h3 className="mt-6 text-[18px] font-medium leading-snug text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.65] text-mute">
                {f.body}
              </p>
              {f.example && (
                <blockquote className="mt-4 rounded-xl bg-cream/70 px-4 py-3 text-[13.5px] italic leading-[1.55] text-ink">
                  &ldquo;
                  <Typewriter text={f.example} />
                  &rdquo;
                </blockquote>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

type IconName = "lens" | "chat" | "pulse" | "compass" | "target" | "bell";

function FeatureIcon({ name }: { name: IconName }) {
  const wrap =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-cream text-primary";
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
  };
  return (
    <span className={wrap}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        {name === "lens" && (
          <>
            <circle cx="8" cy="8" r="5" {...stroke} />
            <path d="m12 12 3.5 3.5" {...stroke} />
          </>
        )}
        {name === "chat" && (
          <path d="M3 4.5h12v8.5H8.5L5 16v-3H3v-8.5Z" {...stroke} />
        )}
        {name === "pulse" && <path d="M2 9h3l1.5-4 3 8 1.5-4H16" {...stroke} />}
        {name === "compass" && (
          <>
            <circle cx="9" cy="9" r="6.5" {...stroke} />
            <path d="m11.5 6.5-3.2 1.4-1.4 3.2 3.2-1.4 1.4-3.2Z" {...stroke} />
          </>
        )}
        {name === "target" && (
          <>
            <circle cx="9" cy="9" r="6" {...stroke} />
            <circle cx="9" cy="9" r="2.5" {...stroke} />
            <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2" {...stroke} />
          </>
        )}
        {name === "bell" && (
          <path
            d="M5 12V8.5a4 4 0 0 1 8 0V12l1.5 1.5h-11L5 12Zm2.5 2.5a1.5 1.5 0 0 0 3 0"
            {...stroke}
          />
        )}
      </svg>
    </span>
  );
}
