import { COMPANY } from '../config';
import './Legal.css';

/* Company lines (Figma 2850:35717). tone: default (grey on the page) | inverse (on the deep brand band) */
export function Legal({ tone = 'default' }: { tone?: 'default' | 'inverse' }) {
  return (
    <div className={`lp-legal lp-legal--${tone}`}>
      <p className="lp-legal__name">Company Name: {COMPANY.name}</p>
      <p>{COMPANY.sec}</p>
      <p>{COMPANY.coa}</p>
      <p className="lp-legal__reg">{COMPANY.regulator}</p>
    </div>
  );
}
