import Container from "./Container";
import Reveal from "./Reveal";
import SmartGuidanceCycle from "./SmartGuidanceCycle";

const steps = [
  {
    number: "01",
    title: "Connect your accounts",
    body: "Securely link your bank or track spending manually whichever feels right. Setup takes about 60 seconds.",
    micro: "Bank-grade · Read-only",
  },
  {
    number: "02",
    title: "Understand your financial patterns",
    body: "Pocketwize analyzes your spending behavior, recurring expenses, and financial habits surfacing patterns you couldn’t see from inside.",
    micro: "Behavior · Habits",
  },
  {
    number: "03",
    title: "Get smart guidance",
    body: "Receive proactive insights, budgeting help, timely alerts, and personalized recommendations calibrated to your real life.",
    micro: "Proactive · Personalized",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-paper py-24 sm:py-32">
      <Container size="default">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mute">
            <span className="h-px w-6 bg-line" />
            How it works
            <span className="h-px w-6 bg-line" />
          </div>
          <h2 className="pw-display mt-4 text-[34px] font-medium leading-[1.1] text-ink sm:text-[44px]">
            An AI financial assistant that{" "}
            <span className="text-primary">actually understands you.</span>
          </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 120}
              className="relative flex flex-col bg-paper p-7 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="pw-num text-[13px] font-medium tracking-wide text-soft">
                  {step.number}
                </span>
                <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-mute">
                  {step.micro}
                </span>
              </div>
              <h3 className="mt-7 text-[20px] font-medium leading-snug text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-mute">
                {step.body}
              </p>
              <StepIllustration index={step.number} />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function StepIllustration({ index }: { index: string }) {
  if (index === "01") {
    return (
      <div className="mt-7 flex flex-1 items-end">
        <div className="flex w-full items-center gap-3 rounded-2xl border border-line-soft bg-cream/60 p-4">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-paper text-[12px] font-semibold text-primary shadow-soft">
            GT
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium text-ink">GTBank · Salary</p>
            <p className="text-[12px] text-soft">Connected · read-only</p>
          </div>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-line bg-cream text-primary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="m3 6 2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  }
  if (index === "02") {
    return (
      <div className="mt-7 flex flex-1 items-end">
        <div className="w-full rounded-2xl border border-line-soft bg-cream/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-soft">
            Patterns found
          </p>
          <ul className="mt-3 space-y-2 text-[13px]">
            {[
              ["Bolt rides cluster on Fridays", "weekly", "0s"],
              ["Airtime top-ups every 3 days", "habit", "0.6s"],
              ["3 unused subscriptions", "leak", "1.2s"],
            ].map(([label, tag, delay]) => (
              <li
                key={label}
                className="pw-shimmer-row flex items-center justify-between rounded-xl bg-paper px-3 py-2"
                style={{ ["--pw-shimmer-delay" as string]: delay }}
              >
                <span className="text-ink">{label}</span>
                <span className="rounded-full bg-line-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-mute">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return <SmartGuidanceCycle />;
}
