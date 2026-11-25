/* Where the page's calls to action go.
   PLACEHOLDER: swap PLAY_URL for MocaMoca's real Google Play listing before launch. */
export const PLAY_URL = 'https://play.google.com/store/search?q=MocaMoca&c=apps';

export const COMPANY = {
  name: 'Copperstone Lending Inc.',
  sec: 'SEC Registration No. 2021050012959-04',
  coa: 'CERTIFICATE OF AUTHORITY NO.3454',
  regulator: 'Regulated by the Securities and Exchange commission',
};

export function track(where: string) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    (w.dataLayer = w.dataLayer || []).push({ event: 'cta_click', where });
  } catch {
    /* analytics is optional */
  }
}
