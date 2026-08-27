// Shared contact-form validation — used by BOTH the client form and the API
// route so the rules can never drift apart. The server is the enforcement
// point; the client only mirrors it for instant feedback.

// Only well-known mailbox providers are accepted, so random/throwaway
// domains can't submit the form.
export const ALLOWED_EMAIL_DOMAINS = [
  // Google
  "gmail.com",
  "googlemail.com",
  // Yahoo
  "yahoo.com",
  "yahoo.in",
  "yahoo.co.in",
  "yahoo.co.uk",
  "ymail.com",
  "rocketmail.com",
  // Microsoft
  "outlook.com",
  "outlook.in",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "live.in",
  "msn.com",
  // Apple
  "icloud.com",
  "me.com",
  "mac.com",
  // Others widely used
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "zoho.com",
  "zohomail.in",
  "rediffmail.com",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "yandex.com",
  "yandex.ru",
  "fastmail.com",
  "hey.com",
] as const;

// One submission per 15 minutes — enforced server-side by IP + email.
export const COOLDOWN_SECONDS = 15 * 60;

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Letters (any language), then letters/spaces/dots/apostrophes/hyphens.
const NAME_RE = /^[\p{L}][\p{L} .'-]{1,119}$/u;
// After normalization: optional +country code, then 7–15 digits.
const PHONE_RE = /^\+?[0-9]{7,15}$/;

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/** Strip spaces, dashes, dots and parentheses so "+91 98765-43210" validates. */
export function normalizePhone(phone: string): string {
  return phone.trim().replace(/[\s().-]/g, "");
}

export function validateContact(input: ContactInput): {
  errors: ContactErrors;
  values: ContactInput;
} {
  const values: ContactInput = {
    name: input.name.trim().replace(/\s+/g, " "),
    email: input.email.trim().toLowerCase(),
    phone: normalizePhone(input.phone),
    message: input.message.trim(),
  };

  const errors: ContactErrors = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  } else if (values.name.length < 2 || !NAME_RE.test(values.name)) {
    errors.name = "Please enter a real name (letters only, min 2 characters).";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (values.email.length > 200 || !EMAIL_RE.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  } else {
    const domain = values.email.split("@")[1];
    if (!(ALLOWED_EMAIL_DOMAINS as readonly string[]).includes(domain)) {
      errors.email =
        "Please use a well-known email provider (Gmail, Yahoo, Outlook, iCloud…).";
    }
  }

  if (!values.phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!PHONE_RE.test(values.phone)) {
    errors.phone =
      "Please enter a valid phone number (7–15 digits, e.g. +91 98765 43210).";
  }

  if (!values.message) {
    errors.message = "Please write a message.";
  } else if (values.message.length < 10) {
    errors.message = "Please write at least 10 characters about your project.";
  } else if (values.message.length > 5000) {
    errors.message = "Message is too long (max 5000 characters).";
  }

  return { errors, values };
}
