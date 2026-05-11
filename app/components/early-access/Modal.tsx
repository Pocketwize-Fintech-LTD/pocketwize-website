"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

type Step = 1 | 2 | 3 | 4 | 5;

type FormState = {
  firstName: string;
  email: string;
  challenge: string;
  behavior: string;
  motivation: string;
};

type SubmissionResult = {
  referralCode: string;
  position: number;
};

const challenges = [
  "Overspending",
  "Saving consistently",
  "Budgeting",
  "Understanding spending",
  "Financial stress",
  "Managing multiple accounts",
];

const behaviors = [
  "Bank app only",
  "Notes app",
  "Spreadsheet",
  "Budgeting app",
  "I don’t track anything",
];

const initialForm: FormState = {
  firstName: "",
  email: "",
  challenge: "",
  behavior: "",
  motivation: "",
};

const totalSteps = 5;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function EarlyAccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const triggerOnOpenRef = useRef<HTMLElement | null>(null);

  const reset = useCallback(() => {
    setStep(1);
    setForm(initialForm);
    setSubmitting(false);
    setError(null);
    setResult(null);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => reset(), 200);
  }, [onClose, reset]);

  useEffect(() => {
    if (!open) return;
    triggerOnOpenRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      triggerOnOpenRef.current?.focus?.();
    };
  }, [open, handleClose]);

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const goNext = () => setStep((s) => (Math.min(totalSteps, s + 1) as Step));
  const goBack = () => setStep((s) => (Math.max(1, s - 1) as Step));

  const validateStep1 = () => {
    if (!form.firstName.trim()) return "Please add your first name.";
    if (!isValidEmail(form.email)) return "Please enter a valid email.";
    return null;
  };

  const handleStep1 = (e: FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    goNext();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as
        | { ok: true; referralCode: string; position: number }
        | { ok: false; error: string };
      if (!res.ok || !data.ok) {
        setError("error" in data ? data.error : "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setResult({ referralCode: data.referralCode, position: data.position });
      setStep(5);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="pw-modal-root fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="presentation"
      onKeyDown={trapFocus}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={handleClose}
        className="pw-modal-overlay absolute inset-0 cursor-default bg-ink/40 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ea-title"
        className="pw-modal-card relative z-10 w-full max-w-xl overflow-hidden rounded-t-3xl border border-line bg-paper shadow-float sm:rounded-3xl"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line-soft px-6 py-4 sm:px-8">
          <Progress step={step} />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-cream hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="m4 4 8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="px-6 py-7 sm:px-8 sm:py-9">
          {step === 1 && (
            <Step1
              form={form}
              setForm={setForm}
              onSubmit={handleStep1}
              error={error}
              firstFieldRef={firstFieldRef}
            />
          )}
          {step === 2 && (
            <ChoiceStep
              key="step-2"
              eyebrow="2 of 4"
              title="What’s your biggest financial challenge?"
              hint="Pick the one that bites the hardest."
              options={challenges}
              value={form.challenge}
              onChange={(v) => {
                setForm((f) => ({ ...f, challenge: v }));
                setError(null);
              }}
              onBack={goBack}
              onNext={() => {
                if (!form.challenge) {
                  setError("Pick one to continue.");
                  return;
                }
                setError(null);
                goNext();
              }}
              error={error}
            />
          )}
          {step === 3 && (
            <ChoiceStep
              key="step-3"
              eyebrow="3 of 4"
              title="How do you currently manage your finances?"
              hint="Honest answers help us build for you."
              options={behaviors}
              value={form.behavior}
              onChange={(v) => {
                setForm((f) => ({ ...f, behavior: v }));
                setError(null);
              }}
              onBack={goBack}
              onNext={() => {
                if (!form.behavior) {
                  setError("Pick one to continue.");
                  return;
                }
                setError(null);
                goNext();
              }}
              error={error}
            />
          )}
          {step === 4 && (
            <Step4
              form={form}
              setForm={setForm}
              onBack={goBack}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={error}
            />
          )}
          {step === 5 && result && (
            <Success
              firstName={form.firstName}
              referralCode={result.referralCode}
              position={result.position}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  const dots = step === 5 ? totalSteps : 4;
  const active = step === 5 ? totalSteps : step;
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: dots }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i + 1 <= active ? "w-6 bg-primary" : "w-3 bg-line"
          }`}
        />
      ))}
    </div>
  );
}

function StepHeader({
  eyebrow,
  title,
  hint,
}: {
  eyebrow: string;
  title: string;
  hint?: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-soft">
        {eyebrow}
      </p>
      <h2
        id="ea-title"
        className="pw-display mt-2 text-[24px] font-medium leading-[1.15] text-ink sm:text-[28px]"
      >
        {title}
      </h2>
      {hint && <p className="mt-2 text-[14px] text-mute">{hint}</p>}
    </div>
  );
}

function Step1({
  form,
  setForm,
  onSubmit,
  error,
  firstFieldRef,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (e: FormEvent) => void;
  error: string | null;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <StepHeader
        eyebrow="1 of 4"
        title="Join the Pocketwize beta."
        hint="Two quick taps and you’re in."
      />
      <div className="space-y-3">
        <Field label="First name">
          <input
            ref={firstFieldRef}
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) =>
              setForm((f) => ({ ...f, firstName: e.target.value }))
            }
            placeholder="Tomi"
            className="ea-input"
            required
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
            className="ea-input"
            required
          />
        </Field>
      </div>
      {error && <p className="text-[13px] text-amber">{error}</p>}
      <FooterRow>
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </FooterRow>
    </form>
  );
}

function ChoiceStep({
  eyebrow,
  title,
  hint,
  options,
  value,
  onChange,
  onBack,
  onNext,
  error,
}: {
  eyebrow: string;
  title: string;
  hint?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
  error: string | null;
}) {
  return (
    <div className="space-y-6">
      <StepHeader eyebrow={eyebrow} title={title} hint={hint} />
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`rounded-2xl border px-4 py-3 text-left text-[14.5px] transition-colors ${
                selected
                  ? "border-primary bg-primary-soft text-primary-ink"
                  : "border-line bg-paper text-ink hover:border-ink/20"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="text-[13px] text-amber">{error}</p>}
      <FooterRow>
        <BackButton onClick={onBack} />
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </FooterRow>
    </div>
  );
}

function Step4({
  form,
  setForm,
  onBack,
  onSubmit,
  submitting,
  error,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-6">
      <StepHeader
        eyebrow="4 of 4"
        title="What would make Pocketwize most useful to you?"
        hint="One sentence is plenty. (Optional.)"
      />
      <textarea
        value={form.motivation}
        onChange={(e) =>
          setForm((f) => ({ ...f, motivation: e.target.value }))
        }
        rows={4}
        placeholder="e.g. tell me when I’m drifting from my budget, without making me feel bad."
        className="ea-input min-h-[120px] resize-none py-3"
      />
      {error && <p className="text-[13px] text-amber">{error}</p>}
      <FooterRow>
        <BackButton onClick={onBack} disabled={submitting} />
        <PrimaryButton onClick={onSubmit} disabled={submitting}>
          {submitting ? "Joining…" : "Join the beta"}
        </PrimaryButton>
      </FooterRow>
    </div>
  );
}

function Success({
  firstName,
  referralCode,
  position,
  onClose,
}: {
  firstName: string;
  referralCode: string;
  position: number;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}?ref=${referralCode}`
      : `https://pocketwize.co?ref=${referralCode}`;

  const shareText = `I just joined the Pocketwize early access — they’re building an AI financial companion that actually gets it. Join me:`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `${shareText} ${inviteUrl}`,
  )}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${shareText} ${inviteUrl}`,
  )}`;

  return (
    <div className="space-y-7 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="m6 11.5 3.2 3.2L16 7.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h2
          id="ea-title"
          className="pw-display text-[28px] font-medium leading-[1.1] text-ink sm:text-[32px]"
        >
          You’re on the waitlist 🎉
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.6] text-mute">
          Thanks{firstName ? `, ${firstName}` : ""}. We’re inviting early users
          gradually to help shape Pocketwize. You’re currently{" "}
          <span className="font-medium text-ink">#{position}</span> in line.
        </p>
      </div>

      <div className="rounded-3xl border border-line bg-cream/60 p-5 text-left sm:p-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-soft">
          Move up the waitlist
        </p>
        <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink">
          Invite a friend with your code{" "}
          <span className="rounded-md bg-paper px-1.5 py-0.5 font-mono text-[13px] text-primary">
            {referralCode}
          </span>{" "}
          — every signup bumps you up.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <ShareButton
            href={whatsappHref}
            label="WhatsApp"
            tone="success"
            icon={<WhatsAppIcon />}
          />
          <ShareButton
            href={xHref}
            label="Share on X"
            tone="ink"
            icon={<XIcon />}
          />
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line bg-paper text-[13.5px] font-medium text-ink transition-colors hover:border-ink/30"
          >
            <LinkIcon />
            {copied ? "Copied!" : "Copy invite link"}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-[14px] font-medium text-mute transition-colors hover:text-ink"
      >
        Done
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-mute">
        {label}
      </span>
      {children}
    </label>
  );
}

function FooterRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="pw-sheen ml-auto inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[14.5px] font-medium text-paper transition-colors hover:bg-primary-ink disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function BackButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-mute transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M11 7H3M6.5 3.5 3 7l3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </button>
  );
}

function ShareButton({
  href,
  label,
  icon,
  tone,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  tone: "success" | "ink";
}) {
  const tones = {
    success: "bg-success text-paper hover:bg-success/90",
    ink: "bg-ink text-paper hover:bg-ink/90",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-full text-[13.5px] font-medium transition-colors ${tones[tone]}`}
    >
      {icon}
      {label}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 13.5 4 11A6 6 0 1 1 8 14a5.9 5.9 0 0 1-3-.8L3 13.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6c.2 1.5 1.5 2.8 3 3 .4.1.8 0 1-.3l.3-.4c.2-.2.5-.2.7 0l.5.4c.2.2.2.5 0 .7-.4.5-1 .8-1.7.8-2.2 0-4.1-1.9-4.1-4.1 0-.6.3-1.3.8-1.7.2-.2.5-.2.7 0l.4.5c.2.2.2.5 0 .7L7.8 6c-.3.2-.4.6-.3 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m2 2 5.2 7L2.4 14h2L8.2 10l3 4h2.8L8.5 6.6 13 2h-2L7.8 5.6 5 2H2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M9 7a3 3 0 0 1 0 4l-2 2a3 3 0 0 1-4-4l1-1M7 9a3 3 0 0 1 0-4l2-2a3 3 0 0 1 4 4l-1 1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
