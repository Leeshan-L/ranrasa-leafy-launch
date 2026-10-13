import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Facebook, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import brandLogo from "@/assets/logos/brand-logo.webp";
import kahataLogo from "@/assets/logos/kahata-logo.webp";
import companyLogo from "@/assets/logos/company-logo.webp";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.31l-.35-.21-3.57.94.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.43-9.44 9.43zm8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.4l5.81-1.52a11.3 11.3 0 0 0 5.63 1.43h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}

const socials = [
  { href: siteConfig.facebookUrl, label: "Ranrasa on Facebook", Icon: Facebook },
  { href: siteConfig.tiktokUrl, label: "Ranrasa on TikTok", Icon: TikTokIcon },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-tea flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={brandLogo} alt="Ranrasa" className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-deep-red"
              activeProps={{ className: "text-deep-red" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="brand" size="sm">
            <Link to="/" hash="products">Shop Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <nav className="container-tea flex flex-col py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-foreground/80"
                  activeProps={{ className: "text-deep-red" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
              <Button asChild variant="brand" className="mt-2" onClick={() => setOpen(false)}>
                <Link to="/" hash="products">Shop Now</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-tea grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-block">
            <img src={brandLogo} alt="Ranrasa" className="h-14 w-auto" />
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Pure Sri Lankan highland tea. No additives. Just good taste that lingers.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="rounded-md bg-deep-red px-3 py-2">
              <img src={kahataLogo} alt="Ranrasa Kahata Tea" className="h-7 w-auto" />
            </span>
            <div className="flex items-center gap-2">
              <img src={companyLogo} alt={siteConfig.companyName} className="h-10 w-auto" />
              <span className="text-xs text-muted-foreground">{siteConfig.brandLine}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Explore</h4>
          <span className="gold-divider mt-2" />
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-deep-red">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Follow</h4>
          <span className="gold-divider mt-2" />
          <div className="mt-4 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Order or Ask Us on WhatsApp</h4>
          <span className="gold-divider mt-2" />
          <p className="mt-4 text-sm text-muted-foreground">
            Chat with us for orders, pack sizes and delivery.
          </p>
          <Button asChild variant="brand" className="mt-4">
            <a
              href={whatsappLink("Hi Ranrasa, I have a question about your tea.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-tea flex flex-col items-center justify-center gap-3 py-5 text-sm sm:flex-row sm:gap-10">
          <a
            href={`tel:${siteConfig.phoneLink}`}
            className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-deep-red"
          >
            <Phone className="h-4 w-4 text-gold" />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 break-all text-foreground/80 transition-colors hover:text-deep-red"
          >
            <Mail className="h-4 w-4 shrink-0 text-gold" />
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-tea flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {siteConfig.brandLine}. All rights reserved.</span>
          <span>Crafted in the highlands of Sri Lanka.</span>
        </div>
      </div>
    </footer>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-[60vh]"
    >
      {children}
    </motion.main>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  );
}
