import { useRef, useState } from 'react';
import { domMax, LazyMotion, m, MotionConfig, useInView } from 'framer-motion';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { LoanCalculator } from './components/LoanCalculator';
import { WhyCard } from './components/WhyCard';
import { Steps } from './components/Steps';
import { Button, PlayMark } from './components/Button';
import { Legal } from './components/Legal';
import { StickyCta } from './components/StickyCta';
import { LOAN, type Term } from './loan';
import { PLAY_URL, track } from './config';
import { rise } from './motion';

/* MocaMoca landing page — the PeraSure SMS landing page's flow (hero → calculator → trust → how it works → closing band,
   sticky CTA) with the MocaMoca home screen as the hero (Figma 2850:35688). The hero and the calculator mock keep their
   copy; everything else is MocaMoca's own wording, deliberately different from PeraSure's (owner, 2026-11-25):
   English with a touch of Tagalog, as the Figma hero ("Walang Kaltas"), honest about fees and approval. */
const STEPS = [
  { title: 'Install MocaMoca', text: 'Find us on Google Play and register with your Philippine mobile number.' },
  { title: 'Verify with one ID', text: 'Upload a valid government ID and fill in a short form. Once we’ve checked it, you’ll see your credit line in the app.' },
  { title: 'Receive the full amount', text: 'Pick how much and how many terms. The money lands in your e-wallet or bank account, walang kaltas.' },
];

export default function App() {
  const [amount, setAmount] = useState(LOAN.amount);
  const [term, setTerm] = useState<Term>(LOAN.term);

  const heroRef = useRef<HTMLDivElement>(null);
  const calcRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const heroIn = useInView(heroRef, { margin: '0px 0px -30% 0px' });
  const calcIn = useInView(calcRef);
  const endIn = useInView(endRef);

  const checkLimit = { href: PLAY_URL, label: 'Check My Limit' };

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <div className="lp-page" id="top">
          <TopBar cta={{ href: PLAY_URL, label: 'Download' }} onCta={() => track('nav')} />

          <div ref={heroRef}>
            <Hero amount={LOAN.max} cta={checkLimit} onCta={() => track('hero')} />
          </div>

          <main>
            <Section id="calculator" kicker="Loan calculator" title="See what you’d pay">
              <div ref={calcRef}>
                <LoanCalculator
                  amount={amount}
                  term={term}
                  onAmount={setAmount}
                  onTerm={setTerm}
                  action={{ href: PLAY_URL, label: 'Apply in the app', onClick: () => track('calculator') }}
                  note="These are examples only. Approval and your final loan details depend on our review."
                />
              </div>
            </Section>

            <Section id="why">
              <WhyCard />
            </Section>

            <Section id="how" tone="white" kicker="Getting started" title="From download to cash-in">
              <Steps items={STEPS} />
            </Section>

            <Section tone="deep" align="center" title="Curious about your credit line?" body="Install MocaMoca, see what you qualify for, and borrow only if it fits your plans.">
              <m.div variants={rise} ref={endRef}>
                <Button href={PLAY_URL} block icon={<PlayMark />} onClick={() => track('end')}>
                  Download MocaMoca
                </Button>
              </m.div>
              <m.footer variants={rise} className="lp-footer">
                <Legal tone="inverse" />
              </m.footer>
            </Section>
          </main>

          <StickyCta show={!heroIn && !calcIn && !endIn}>
            <Button href={checkLimit.href} block onClick={() => track('sticky')}>
              {checkLimit.label}
            </Button>
          </StickyCta>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
