import { m } from 'framer-motion';
import npcLogo from '../assets/why/npc-mask.png';
import secGlobe from '../assets/why/sec-globe.svg';
import payMaya from '../assets/why/pay-paymaya.png';
import gcash from '../assets/why/pay-gcash.png';
import coinsPh from '../assets/why/pay-coinsph.png';
import grabPay from '../assets/why/pay-grabpay.png';
import { rise, stagger } from '../motion';
import './WhyCard.css';

/* "Why Choose MocaMoca?" — Figma 2843:34556 (关于我们): title on a mint-topped card, a registered-users banner,
   two trust tiles (National Privacy Commission, SEC registration) and the repayment channels.
   Copy is the Figma copy as designed. */
const CHANNELS = [
  { name: 'PayMaya', src: payMaya },
  { name: 'GCash', src: gcash },
  { name: 'Coins.ph', src: coinsPh },
  { name: 'GrabPay', src: grabPay },
];

export function WhyCard() {
  return (
    <m.div variants={stagger(0.08)} className="lp-why">
      <m.h2 variants={rise} className="lp-why__title">Why Choose MocaMoca?</m.h2>

      <m.div variants={rise} className="lp-why__banner">
        <p className="lp-why__users">30,000,000+</p>
        <p className="lp-why__users-label">Global Registered Users</p>
      </m.div>

      <m.div variants={rise} className="lp-why__tiles">
        <div className="lp-why__tile">
          <div className="lp-why__logo">
            <span className="lp-why__npc" role="img" aria-label="National Privacy Commission" style={{ ['--npc' as string]: `url("${npcLogo}")` }} />
          </div>
          <p>National Privacy Commission</p>
        </div>
        <div className="lp-why__tile">
          <div className="lp-why__logo lp-why__logo--sec">
            <img src={secGlobe} width={48.0518} height={52.2158} alt="" />
            <span>SEC Registration</span>
          </div>
          <p>SEC-Registered Lender, Bank-Grade Data Protection</p>
        </div>
      </m.div>

      <m.div variants={rise} className="lp-why__repay">
        <p className="lp-why__repay-title">Your Flexible Repayment</p>
        <ul className="lp-why__channels">
          {CHANNELS.map((c) => (
            <li key={c.name}>
              <img src={c.src} width={32} height={32} alt="" />
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      </m.div>
    </m.div>
  );
}
