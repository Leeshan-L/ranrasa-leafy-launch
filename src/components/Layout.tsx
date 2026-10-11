import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { siteConfig } from "@/lib/site-config";
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    toast.success("Subscribed! Welcome to Ranrasa.");
    form.reset();
  };
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-tea grid gap-10 py-14 md:grid-cols-4">
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
              <span className="text-xs text-muted-foreground">
                Manufactured by {siteConfig.companyName}
              </span>
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
          <h4 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h4>
          <span className="gold-divider mt-2" />
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Input type="email" required placeholder="Your email" className="bg-background" />
            <Button type="submit" variant="brand">Join</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-tea flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Ranrasa Tea Co. All rights reserved.</span>
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
