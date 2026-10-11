import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Truck, Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/site-config";
import heroImg from "@/assets/hero-tea.jpg";
import kahataLogo from "@/assets/logos/kahata-logo.webp";
import kahataTea50g from "@/assets/products/kahata-tea-50g.webp";
import kahataTeaBags from "@/assets/products/kahata-tea-bags.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ranrasa Ceylon Tea | Pure Sri Lankan Highland Tea" },
      { name: "description", content: "Shop Ranrasa Tea: Pure, zero additive Sri Lankan highland tea." },
    ],
  }),
  component: Home,
});

const products = [
  {
    name: "Ranrasa Kahata Tea",
    detail: "Tea packets · 50g to 1kg",
    price: "From LKR 120",
    img: kahataTea50g,
    alt: "Ranrasa Kahata Tea 50g packet with loose tea leaves",
    tag: "Bestseller",
    message: "Hi Ranrasa, I'd like to order Ranrasa Kahata Tea. Could you share the available pack sizes and prices?",
  },
  {
    name: "Ranrasa Kahata Tea Bags",
    detail: "25 tea bags",
    price: "LKR 180",
    img: kahataTeaBags,
    alt: "Ranrasa Kahata tea bag with branded red tag",
    tag: "New",
    message: "Hi Ranrasa, I'd like to order Ranrasa Kahata Tea Bags (25 bags).",
  },
];

const features = [
  { icon: Leaf, title: "No Artificial Colours", desc: "Only pure tea leaves" },
  { icon: ShieldCheck, title: "Zero Additives", desc: "Nothing added, ever" },
  { icon: Truck, title: "Island-wide Delivery", desc: "Across Sri Lanka" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.31l-.35-.21-3.57.94.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.43-9.44 9.43zm8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.4l5.81-1.52a11.3 11.3 0 0 0 5.63 1.43h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Sri Lankan tea plantation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        </motion.div>

        <div className="container-tea relative flex min-h-[88vh] flex-col items-start justify-center py-24 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/20 px-3 py-1 text-xs uppercase tracking-widest text-gold backdrop-blur"
          >
            <Leaf className="h-3.5 w-3.5" /> Pure Ceylon Tea
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Good Taste <br /><em className="not-italic text-gold">That Lingers</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base text-white/85 sm:text-lg"
          >
            Single-origin highland tea, picked by hand and sealed at the source. Nothing added — ever.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild variant="brand" size="lg" className="group">
              <Link to="/" hash="products">
                Shop the Collection
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-y border-border bg-cream">
        <div className="container-tea grid gap-6 py-8 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product showcase */}
      <section id="products" className="container-tea scroll-mt-20 py-20">
        <div className="mb-12 text-center">
          <span className="mx-auto mb-5 inline-block rounded-lg bg-deep-red px-4 py-2.5">
            <img src={kahataLogo} alt="Ranrasa Kahata Tea" className="h-10 w-auto md:h-12" />
          </span>
          <br />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Featured</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Brewed to Perfection</h2>
          <span className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="group overflow-hidden border-border/60 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-cream">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-deep-red px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {p.tag}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold text-deep-red">{p.price}</span>
                    <Button asChild variant="brand" className="group/btn">
                      <a href={whatsappLink(p.message)} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        Order on WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
