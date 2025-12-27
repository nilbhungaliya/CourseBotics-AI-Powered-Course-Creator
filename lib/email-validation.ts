// List of trusted email domains
export const TRUSTED_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "protonmail.com",
  "zoho.com",
  "aol.com",
  "mail.com",
  "yandex.com",
  "gmx.com",
  "fastmail.com",
  "tutanota.com",
];

/**
 * Validates if an email domain is from a trusted provider
 * @param email - The email address to validate
 * @returns true if the domain is trusted, false otherwise
 */
export function isEmailDomainTrusted(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const emailLower = email.toLowerCase().trim();
  const domain = emailLower.split("@")[1];

  if (!domain) {
    return false;
  }

  return TRUSTED_EMAIL_DOMAINS.includes(domain);
}

/**
 * Gets the domain from an email address
 * @param email - The email address
 * @returns The domain part of the email
 */
export function getEmailDomain(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }

  const emailLower = email.toLowerCase().trim();
  const domain = emailLower.split("@")[1];

  return domain || "";
}
