/* Loan maths for the calculator mock.
   Rate (owner, 2026-11-25): 日千3 — 0.3 % of the loan amount per day, charged on the full amount for every day of the loan.
   Each term is 15 days, so one term costs 4.5 % of the amount; principal is paid back in equal parts (amount / terms).
   Terms (owner, 2026-11-25): 4 / 6 / 8 × 15 days, as the PeraSure calculator — the longest is 120 days, though the hero says
   "Up To 180 Days" (owner, 2026-11-25: keep 180 as designed). The amount range is still a placeholder. */
const TERMS = [4, 6, 8] as const;
export type Term = (typeof TERMS)[number];

export const LOAN = {
  min: 1000,
  max: 90000,
  step: 500,
  amount: 50000,
  terms: TERMS,
  term: 6 as Term, // opens on 6 terms, as the PeraSure calculator
  days: 15, // per term
  dailyRate: 0.003, // 日千3
};

const r2 = (n: number) => Math.round(n * 100) / 100;

export function loanQuote(amount: number, term: number) {
  const daily = r2(amount * LOAN.dailyRate); // the daily fee
  const charge = r2(daily * LOAN.days); // fees per term (15 days)
  const principal = r2(amount / term);
  const days = term * LOAN.days;
  return {
    daily,
    charge,
    principal,
    per: r2(principal + charge),
    total: r2(amount + charge * term),
    days,
  };
}

const fmt2 = new Intl.NumberFormat('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt0 = new Intl.NumberFormat('en-PH', { maximumFractionDigits: 0 });

/** "₱1,234.50" */
export const money = (n: number, decimals: 0 | 2 = 2) => '₱' + (decimals ? fmt2 : fmt0).format(n);
/** ["1,234", "50"] */
export const splitMoney = (n: number) => fmt2.format(n).split('.') as [string, string];
