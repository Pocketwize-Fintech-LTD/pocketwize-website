import Container from "./Container";
import Reveal from "./Reveal";

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
    <section id="how-it-works" className="relative overflow-hidden bg-paper py-16 sm:py-20">
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
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
