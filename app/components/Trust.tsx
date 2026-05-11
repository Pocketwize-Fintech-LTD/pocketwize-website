import Container from "./Container";
import Reveal from "./Reveal";

const guarantees = [
  "Bank-level encryption",
  "Read-only financial connections",
  "No unauthorized transactions",
  "Privacy-first architecture",
  "Secure infrastructure",
];

const compliance = [
  { label: "NDPR compliant", status: "Live" },
  { label: "ISO 27001", status: "In progress" },
  { label: "GDPR-aligned", status: "Live" },
];

const badges = [
  { label: "256-bit AES", icon: "lock" },
  { label: "TLS 1.3", icon: "shield" },
  { label: "OAuth 2.0", icon: "key" },
];

const partners = ["Mono", "Okra", "Paystack"];

export default function Trust() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-secondary-soft/60 py-24 sm:py-32"
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

        <Reveal
          delay={120}
          className="mx-auto mt-12 grid max-w-5xl gap-6 rounded-3xl border border-line bg-paper/70 p-7 sm:p-8 md:grid-cols-3"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-soft">
              Compliance
            </p>
            <ul className="mt-3 space-y-2">
              {compliance.map((c) => {
                const isLive = c.status === "Live";
                return (
                  <li
                    key={c.label}
                    className="flex items-center justify-between text-[13.5px]"
                  >
                    <span className="inline-flex items-center gap-2 text-ink">
                      <ComplianceDot live={isLive} />
                      {c.label}
                    </span>
                    <span
                      className={`text-[12px] ${
                        isLive ? "text-success" : "text-mute"
                      }`}
                    >
                      {c.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-soft">
              Security badges
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream/70 px-3 py-1.5 text-[12.5px] font-medium text-ink"
                >
                  <BadgeIcon name={b.icon} />
                  {b.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-soft">
              Trusted partners
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-2">
              {partners.map((p) => (
                <li
                  key={p}
                  className="inline-flex h-9 items-center rounded-lg border border-dashed border-line bg-paper px-3 text-[12.5px] font-medium text-mute"
                  title="API partner logo placeholder"
                >
                  {p}
                </li>
              ))}
              <li className="text-[11px] text-soft">Logos coming soon</li>
            </ul>
          </div>
        </Reveal>
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

function ComplianceDot({ live = false }: { live?: boolean }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        live ? "bg-success pw-pulse-dot" : "bg-line"
      }`}
    />
  );
}

function BadgeIcon({ name }: { name: string }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
  };
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      className="text-primary"
      aria-hidden
    >
      {name === "lock" && (
        <>
          <rect x="3" y="6" width="8" height="6" rx="1.4" {...stroke} />
          <path d="M5 6V4.5a2 2 0 0 1 4 0V6" {...stroke} />
        </>
      )}
      {name === "shield" && (
        <path
          d="M7 1.5 2.5 3.5V7c0 3 2 4.7 4.5 5.8C9.5 11.7 11.5 10 11.5 7V3.5L7 1.5Z"
          {...stroke}
        />
      )}
      {name === "key" && (
        <>
          <circle cx="5" cy="9" r="2" {...stroke} />
          <path d="m6.4 7.6 5.6-5.6M9.5 4.5l1.5 1.5" {...stroke} />
        </>
      )}
    </svg>
  );
}
