import { m } from 'framer-motion';
import laurelLeft from '../assets/laurel-left.png';
import laurelRight from '../assets/laurel-right.png';
import { EASE_OUT, rise } from '../motion';
import './HeroSlogan.css';

/* Home/Hero slogan (Figma 2570:17822): laurels either side of a headline + subline, white on the brand header. */
export function HeroSlogan({
  headline = '6 years trusted service',
  subline = 'Bank-Level Data Security   |    SEC Licensed',
}: {
  headline?: string;
  subline?: string;
}) {
  const laurel = (from: number) => ({
    hidden: { opacity: 0, x: from, rotate: from > 0 ? 12 : -12 },
    show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  });
  return (
    <div className="lp-slogan">
      <m.img variants={laurel(14)} src={laurelLeft} width={40} height={66} alt="" />
      <m.div variants={rise} className="lp-slogan__copy">
        <h1 className="lp-slogan__headline">{headline}</h1>
        <p className="lp-slogan__subline">{subline}</p>
      </m.div>
      <m.img variants={laurel(-14)} src={laurelRight} width={40} height={60} alt="" />
    </div>
  );
}
