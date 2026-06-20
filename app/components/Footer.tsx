import Container from "./Container";
import Logo from "./Logo";

type SocialName = "x" | "instagram" | "linkedin";

const socials: { name: SocialName; label: string; href: string }[] = [
  { name: "x", label: "Twitter / X", href: "https://x.com/pocketwize?s=11" },
  // { name: "instagram", label: "Instagram", href: "#" },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/pocketwize/",
  },
];

const columns = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Trust", href: "#trust" },
      { label: "Early access", href: "#cta" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "mailto:hello@getpocketwize.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Responsible disclosure", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[14.5px] leading-[1.65] text-mute">
              Calm, intelligent guidance for every money decision from monthly
              spending to long-term wealth building.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-soft">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-ink-soft transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-soft">
            © {new Date().getFullYear()} Pocketwize Solutions LTD. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 text-mute">
            {socials.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-cream hover:text-primary"
                >
                  <SocialIcon name={social.name} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ name }: { name: SocialName }) {
  switch (name) {
    case "x":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M13.6 10.6 21.05 2h-1.77l-6.46 7.47L7.6 2H2l7.82 11.38L2 22h1.77l6.83-7.94L15.78 22H21.4l-7.8-11.4Zm-2.42 2.81-.79-1.13L4.4 3.3h2.72l5.08 7.27.79 1.13 6.6 9.45h-2.72l-5.39-7.74Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.2"
            cy="6.8"
            r="1.1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4v15h-4V8Zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8Z" />
        </svg>
      );
  }
}
