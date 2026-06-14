import Image, { type StaticImageData } from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import dashboard from "../../public/screen-dashboard.png";
import spending from "../../public/screen-spending.png";
import alerts from "../../public/screen-alerts.png";
import goals from "../../public/screen-goals.png";
import budgets from "../../public/screen-budgets.png";

type Screen = {
  tag: string;
  title: string;
  body: string;
  points: string[];
  image: StaticImageData;
  alt: string;
};

const screens: Screen[] = [
  {
    tag: "Dashboard",
    title: "Every account in one calm view",
    body: "Link your banks and see your true total balance the moment you open the app — plus what needs your attention today.",
    points: ["Real balance across all accounts", "Read-only & bank-grade secure"],
    image: dashboard,
    alt: "Pocketwize home screen showing total balance, connected accounts, and insights",
  },
  {
    tag: "Spending breakdown",
    title: "See exactly where your money goes",
    body: "A clear breakdown of spending by category — no spreadsheets, no guessing. Spot your top category at a glance.",
    points: ["Category-level breakdown", "Month-by-month comparison"],
    image: spending,
    alt: "Pocketwize spending breakdown screen with a category donut chart",
  },
  {
    tag: "Smart alerts",
    title: "Insights that reach you before problems grow",
    body: "Pocketwize watches for overspending, financial stress, and savings wins — then tells you exactly what to do next.",
    points: ["Proactive spending alerts", "Action plans, not just numbers"],
    image: alerts,
    alt: "Pocketwize insights screen listing critical alerts and savings wins",
  },
  {
    tag: "Goals",
    title: "Stay on track toward every goal",
    body: "From annual rent to a new laptop, set savings goals and watch real progress with clear timelines and milestones.",
    points: ["Visual progress tracking", "Realistic, dated targets"],
    image: goals,
    alt: "Pocketwize goals screen showing active and achieved savings goals",
  },
  {
    tag: "Budgets",
    title: "Budgets that fit real life",
    body: "Create monthly limits per category in seconds. Flexible budgets that adapt to how you actually live instead of fighting you.",
    points: ["Per-category monthly limits", "Set up in under a minute"],
    image: budgets,
    alt: "Pocketwize new budget screen with category limits",
  },
];

export default function Showcase() {
  return (
    <section id="screens" className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mute">
            <span className="h-px w-6 bg-line" />
            A look inside
            <span className="h-px w-6 bg-line" />
          </div>
          <h2 className="pw-display mt-4 text-[34px] font-medium leading-[1.1] text-ink sm:text-[44px]">
            See what clarity{" "}
            <span className="text-primary">actually looks like.</span>
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-24">
          {screens.map((screen, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={screen.tag}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={`flex flex-col items-center text-center lg:items-start lg:text-left ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-ink">
                    {screen.tag}
                  </span>
                  <h3 className="pw-display mt-5 text-[26px] font-medium leading-[1.15] text-ink sm:text-[32px]">
                    {screen.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-mute">
                    {screen.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {screen.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-[14.5px] text-ink-soft"
                      >
                        <CheckMark />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  delay={90}
                  className={`flex justify-center ${reverse ? "lg:order-1" : ""}`}
                >
                  <div className="relative">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto h-[70%] max-w-48 rounded-[3rem] bg-primary/15 blur-3xl"
                    />
                    <Image
                      src={screen.image}
                      alt={screen.alt}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 38vw, 200px"
                      placeholder="blur"
                      className="h-auto w-44 select-none sm:w-52"
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CheckMark() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="m2.5 6.2 2.2 2.2 4.8-4.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
