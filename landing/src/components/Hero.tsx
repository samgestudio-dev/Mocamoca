import { m } from 'framer-motion';
import heroBg from '../assets/home-hero-bg.png';
import { HeroSlogan } from './HeroSlogan';
import { LoanCard } from './LoanCard';
import { stagger } from '../motion';
import './Hero.css';

/* Hero — the MocaMoca home screen for new users (Figma 2850:35688 "首页-新客未登录") as the landing page's first screen:
   brand header art, slogan, loan card. Left out on purpose: the phone status bar (a web page has none) and the company lines
   (2850:35717 — they sit in the page footer instead). The page scrolls natively; no page-turn interaction. */
export function Hero({ amount, cta, onCta }: {
  amount: number;
  cta: { href: string; label: string };
  onCta?: () => void;
}) {
  return (
    <section className="lp-hero" aria-labelledby="hero-title">
      <img className="lp-hero__bg" src={heroBg} alt="" />
      <m.div className="lp-hero__main" initial="hidden" animate="show" variants={stagger(0.12, 0.05)}>
        <div id="hero-title">
          <HeroSlogan />
        </div>
        <LoanCard amount={amount} cta={cta} onCta={onCta} />
      </m.div>
    </section>
  );
}
