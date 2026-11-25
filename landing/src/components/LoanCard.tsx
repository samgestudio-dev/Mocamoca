import { useEffect } from 'react';
import { animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import tickerIcon from '../assets/ticker-icon.png';
import amountDeco from '../assets/amount-deco.svg';
import featureId from '../assets/feature-id.png';
import featureNoDeduction from '../assets/feature-no-deduction.png';
import feature180 from '../assets/feature-180-days.png';
import notch from '../assets/notch.svg';
import { Button } from './Button';
import { EASE_OUT, rise, SOFT, stagger } from '../motion';
import { splitMoney } from '../loan';
import './LoanCard.css';

/* The hero's loan card (Figma 2850:35693): ticker · loan amount panel · feature strip with ticket notches · the CTA tucked over its foot. */

/** Home/Ticker (2569:17754): social proof. The coin bobs gently. */
export function Ticker({ children }: { children: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div variants={rise} className="lp-ticker">
      <m.img
        src={tickerIcon}
        width={16}
        height={18}
        alt=""
        animate={reduce ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <p>{children}</p>
    </m.div>
  );
}

/** Amount panel (2850:35695): "Loan Amount" and the max amount counting up once on load. */
export function AmountPanel({ label = 'Loan Amount', amount }: { label?: string; amount: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? amount : 0);
  const int = useTransform(mv, (v) => splitMoney(Math.round(v / 100) * 100)[0]);
  const dec = splitMoney(amount)[1];
  useEffect(() => {
    if (reduce) return void mv.set(amount);
    const run = animate(mv, amount, { duration: 1.4, delay: 0.35, ease: EASE_OUT });
    return () => run.stop();
  }, [amount, reduce, mv]);
  return (
    <m.div variants={rise} className="lp-amount">
      <p className="lp-amount__label">{label}</p>
      <p className="lp-amount__value" aria-label={`₱${splitMoney(amount).join('.')}`}>
        <img className="lp-amount__deco" src={amountDeco} width={208.04} height={44.5039} alt="" />
        <span className="lp-amount__cur">₱</span>
        <m.span className="lp-amount__int">{int}</m.span>
        <span className="lp-amount__dec">.{dec}</span>
      </p>
    </m.div>
  );
}

type Feature = { icon: string; label: string };
const FEATURES: Feature[] = [
  { icon: featureId, label: 'Basic ID Only' },
  { icon: featureNoDeduction, label: 'Walang Kaltas' },
  { icon: feature180, label: 'Up To 180 Days' },
];

/** Home/Feature item ×3 (2569:17740) on a strip with a ticket notch each side. Icons pop in one by one. */
export function FeatureStrip({ items = FEATURES }: { items?: Feature[] }) {
  const pop = { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: SOFT } };
  return (
    <m.ul variants={stagger(0.09)} className="lp-features">
      {items.map((f) => (
        <li key={f.label}>
          <m.img variants={pop} src={f.icon} width={32} height={32} alt="" />
          <m.span variants={rise}>{f.label}</m.span>
        </li>
      ))}
      <img className="lp-features__notch lp-features__notch--l" src={notch} width={16} height={16} alt="" />
      <img className="lp-features__notch lp-features__notch--r" src={notch} width={16} height={16} alt="" />
    </m.ul>
  );
}

export function LoanCard({ amount, cta, onCta }: { amount: number; cta: { href: string; label: string }; onCta?: () => void }) {
  return (
    <m.div variants={stagger(0.1, 0.15)} className="lp-loancard">
      <Ticker>Over 30 Million Users Have Successfully Borrowed !</Ticker>
      <AmountPanel amount={amount} />
      <div className="lp-loancard__foot">
        <FeatureStrip />
        <m.div variants={rise} className="lp-loancard__cta">
          <Button href={cta.href} block onClick={onCta}>
            {cta.label}
          </Button>
        </m.div>
      </div>
    </m.div>
  );
}
