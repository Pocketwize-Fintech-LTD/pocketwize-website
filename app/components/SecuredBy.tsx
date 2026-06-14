export default function SecuredBy() {
  return (
    <div className="mt-16 flex flex-col items-center">
      <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-soft">
        Bank connections powered by
      </p>

      <a
        href="https://mono.co"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Mono — secure bank connections"
        className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 transition-colors hover:border-primary/40"
      >
        {/* To use Mono's real logo, drop it in /public/partners/mono.svg and
            replace this wordmark with:
            <Image src="/partners/mono.svg" alt="Mono" width={84} height={24}
              className="h-6 w-auto" /> */}
        <ShieldIcon />
        <span className="text-[20px] font-semibold tracking-tight text-ink">
          Mono
        </span>
      </a>

      <p className="mt-3 max-w-xs text-center text-[12.5px] leading-[1.55] text-soft">
        Secure, read-only bank connections — handled by Mono.
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="text-primary"
    >
      <path
        d="M8 1.5 13 3.2V8c0 3-2.1 5.3-5 6.5C5.1 13.3 3 11 3 8V3.2L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="m6 8 1.4 1.4L10 6.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
