"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

type Step = 1 | 2 | 3 | 4 | 5;

type FormState = {
  fullName: string;
  email: string;
  challenge: string;
  behavior: string;
  motivation: string;
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
  fullName: "",
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
  const [submitted, setSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const triggerOnOpenRef = useRef<HTMLElement | null>(null);

  const reset = useCallback(() => {
    setStep(1);
    setForm(initialForm);
    setSubmitting(false);
    setError(null);
    setSubmitted(false);
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
    if (!form.fullName.trim()) return "Please add your first name.";
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
      const referredBy =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("ref")
          : null;
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, referredBy }),
      });
      const data = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!res.ok || !data.ok) {
        setError("error" in data ? data.error : "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
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
          {step === 5 && submitted && (
            <Success fullName={form.fullName} onClose={handleClose} />
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
        <Field label="Full name">
          <input
            ref={firstFieldRef}
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullName: e.target.value }))
            }
            placeholder="Tomi Johnson"
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
  fullName,
  onClose,
}: {
  fullName: string;
  onClose: () => void;
}) {
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
          Thanks{fullName ? `, ${fullName}` : ""}. We’ll email you as soon as
          Pocketwize is ready for you to try.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="pw-sheen inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-[14.5px] font-medium text-paper transition-colors hover:bg-primary-ink"
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
