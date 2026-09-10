import { useState } from "react";

import { apiPost } from "../../../../lib/api/client";

type RequestType =
  | "demo"
  | "partnership"
  | "research"
  | "general";

interface FormState {
  name: string;
  email: string;
  organization: string;
  phone: string;
  requestType: RequestType;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  phone: "",
  requestType: "demo",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      await apiPost("/contact", form);

      setSuccess(true);
      setForm(initialState);
    } catch {
      setError(
        "We couldn't send your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {success && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
        >
          Thanks. Your request has been received.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Name
          <input
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            className={inputClass}
            autoComplete="name"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
          <input
            required
            type="email"
            maxLength={254}
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            className={inputClass}
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Organization
          <input
            maxLength={150}
            value={form.organization}
            onChange={(event) =>
              updateField(
                "organization",
                event.target.value,
              )
            }
            className={inputClass}
            autoComplete="organization"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Phone
          <input
            maxLength={30}
            value={form.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            className={inputClass}
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        What can we help with?
        <select
          value={form.requestType}
          onChange={(event) =>
            updateField(
              "requestType",
              event.target.value as RequestType,
            )
          }
          className={inputClass}
        >
          <option value="demo">Request a platform demo</option>
          <option value="partnership">Partnership</option>
          <option value="research">Research</option>
          <option value="general">General inquiry</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Message
        <textarea
          required
          minLength={10}
          maxLength={3000}
          rows={7}
          value={form.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          className={`${inputClass} resize-y`}
          placeholder="Tell us what you would like to explore..."
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-sky-600 px-6 py-3.5 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}