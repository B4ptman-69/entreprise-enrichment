const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'outlook.fr',
  'hotmail.com',
  'hotmail.fr',
  'yahoo.com',
  'yahoo.fr',
  'icloud.com',
  'me.com',
  'mac.com',
  'live.com',
  'live.fr',
  'msn.com',
  'aol.com',
  'protonmail.com',
  'protonmail.ch',
  'laposte.net',
  'orange.fr',
  'wanadoo.fr',
  'free.fr',
  'sfr.fr',
];

export function extractDomainFromEmail(email: string): string {
  const emailRegex = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
  const match = email.match(emailRegex);

  if (!match) {
    return '';
  }

  return match[1].toLowerCase();
}

export function isPersonalEmailDomain(domain: string): boolean {
  return PERSONAL_EMAIL_DOMAINS.includes(domain.toLowerCase());
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export type InputType = 'email' | 'company_name';

export interface InputAnalysis {
  type: InputType;
  searchTerm: string;
  originalInput: string;
}

export function extractCompanyNameFromDomain(domain: string): string {
  const commonExtensions = [
    '.com', '.fr', '.net', '.org', '.eu', '.co.uk', '.de', '.es', '.it',
    '.be', '.nl', '.ch', '.io', '.ai', '.tech', '.app', '.dev', '.pro'
  ];

  let companyName = domain.toLowerCase();

  for (const ext of commonExtensions) {
    if (companyName.endsWith(ext)) {
      companyName = companyName.slice(0, -ext.length);
      break;
    }
  }

  companyName = companyName.replace(/[-_]/g, ' ').trim();

  return companyName;
}

export function analyzeInput(input: string): InputAnalysis {
  const trimmedInput = input.trim();

  if (isValidEmail(trimmedInput)) {
    const domain = extractDomainFromEmail(trimmedInput);
    return {
      type: 'email',
      searchTerm: domain || trimmedInput,
      originalInput: trimmedInput,
    };
  }

  return {
    type: 'company_name',
    searchTerm: trimmedInput,
    originalInput: trimmedInput,
  };
}
