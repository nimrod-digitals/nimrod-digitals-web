import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/ai-insights", label: "AI Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header page-shell pt-6 md:pt-8">
      <nav className="border-b border-mist pb-4 text-sm font-medium uppercase tracking-[0.12em] md:pb-5">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Nimrod Digitals home" className="brand-link">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-4 md:gap-7">
            <div className="hidden gap-7 md:flex">
              {navigation.map((item) => (
                <Link className="nav-link" href={item.href} key={item.href}>{item.label}</Link>
              ))}
            </div>
            <Link className="nav-link md:hidden" href="/contact">Contact</Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-4 flex gap-5 overflow-x-auto whitespace-nowrap text-[0.6875rem] md:hidden">
          {navigation.slice(0, -1).map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="page-shell pb-8 pt-16 md:pb-10 md:pt-24">
      <div className="grid gap-8 border-t border-mist pt-6 text-sm md:grid-cols-2">
        <div className="max-w-sm">
          <BrandMark />
          <p className="mt-4 text-quiet-ink">Independent digital strategy and execution for the next useful thing.</p>
        </div>
        <div className="flex items-center justify-between gap-4 md:justify-end">
          <a className="nav-link" href="mailto:hello@nimroddigitals.com">hello@nimroddigitals.com</a>
          <span className="text-quiet-ink">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

export function HeroSignal({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`hero-signal ${className}`}>
      <span className="hero-signal-orbit hero-signal-orbit-one" />
      <span className="hero-signal-orbit hero-signal-orbit-two" />
      <span className="hero-signal-core">
        <BrandMark compact />
      </span>
      <span className="hero-signal-dot hero-signal-dot-one" />
      <span className="hero-signal-dot hero-signal-dot-two" />
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="page-intro page-shell grid gap-8 overflow-hidden py-20 md:grid-cols-12 md:py-28">
      <HeroSignal className="page-intro-signal" />
      <p className="eyebrow page-intro-copy md:col-span-3">{eyebrow}</p>
      <div className="page-intro-copy md:col-span-8 md:col-start-5">
        <h1 className="brand-headline text-6xl leading-[0.94] md:text-8xl">{title}</h1>
        <div className="mt-8 max-w-2xl text-lg leading-relaxed text-quiet-ink">{children}</div>
      </div>
    </section>
  );
}
