import Link from "next/link";
import { t } from "./copy";

export default function NotFound() {
  return (
    <main className="wrap notfound">
      <p className="kicker">{t.notFoundKicker}</p>
      <h1 className="notfound-title">{t.notFoundTitle}</h1>
      <p className="notfound-sub">{t.notFoundSub}</p>
      <Link href="/" className="notfound-btn">
        {t.notFoundCta} <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
