import Container from "./Container";
import Reveal from "./Reveal";

const problems = [
  "You don’t always know where your money went.",
  "Bank apps show transactions not understanding.",
  "Financial advice online rarely fits Nigerian realities.",
  "Budgeting apps feel like work instead of support.",
];

export default function Problem() {
  return (
    <section id="problem" className="relative bg-paper py-24 sm:py-32">
      <Container size="default">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="pw-display mt-4 text-[34px] font-medium leading-[1.1] text-ink sm:text-[46px]">
            Managing money today feels{" "}
            <span className="text-primary">overwhelming.</span>
          </h2>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {problems.map((problem, i) => (
            <Reveal
              as="li"
              key={problem}
              delay={i * 90}
              className="group relative rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-ink/15 sm:p-7"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[17px] leading-normal text-ink sm:text-[18px]">
                {problem}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={300} className="mt-16 text-center">
          <p className="pw-display text-[26px] font-medium leading-[1.2] text-ink sm:text-[32px]">
            Pocketwize <span className="text-primary">changes that.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
