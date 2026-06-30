import Link from "next/link";
import Container from "./Container";
import EarlyAccessTrigger from "./early-access/Trigger";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Product", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Trust", href: "#trust" },
];

export default function Nav() {
  return (
    <header className="pw-nav fixed inset-x-0 top-0 z-40 border-b border-line/40 bg-paper/40 backdrop-blur-md">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Pocketwize home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-mute transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <EarlyAccessTrigger className="pw-sheen hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[14px] font-medium text-paper transition-colors hover:bg-primary-ink md:inline-flex">
              Join early access
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </EarlyAccessTrigger>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </Container>
    </header>
  );
}
