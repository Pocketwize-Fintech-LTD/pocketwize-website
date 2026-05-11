import Container from "./Container";
import Logo from "./Logo";

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
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "#" },
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
              Calm, intelligent answers about your money. Built for young
              professionals who want to stop ending the month confused.
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
                        className="text-[14px] text-ink-soft transition-colors hover:text-ink"
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
          <div className="flex items-center gap-5 text-[12.5px] text-mute">
            <a className="hover:text-ink" href="https://x.com/pocketwize?s=11">
              Twitter / X
            </a>
            <a className="hover:text-ink" href="#">
              Instagram
            </a>
            <a
              className="hover:text-ink"
              href="https://www.linkedin.com/company/pocketwize/"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
