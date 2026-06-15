import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Truck, Leaf, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";
import heroImg from "@/assets/hero-tea.jpg";
import blackTea from "@/assets/black-tea.jpg";
import greenTea from "@/assets/green-tea.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ranrasa — Good Taste That Lingers" },
      { name: "description", content: "Pure Sri Lankan highland tea. Zero additives. Shop our premium Ceylon black and green tea." },
    ],
  }),
  component: Home,
});

const products = [
  { name: "Highland Black Tea", price: "$24.00", img: blackTea, tag: "Bestseller" },
  { name: "Pure Ceylon Green Tea", price: "$22.00", img: greenTea, tag: "New" },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $40" },
  { icon: Leaf, title: "Go Natural", desc: "Zero artificial additives" },
  { icon: ShieldCheck, title: "Safe Payment", desc: "Encrypted checkout" },
];

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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>

        <div className="container-tea relative flex min-h-[88vh] flex-col items-start justify-center py-24 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/20 px-3 py-1 text-xs uppercase tracking-widest text-gold backdrop-blur"
          >
            <Leaf className="h-3.5 w-3.5" /> Pure Ceylon · Est. 1985
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
              <Link to="/about">
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
      <section className="container-tea py-20">
        <div className="mb-12 text-center">
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
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-deep-red px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {p.tag}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Loose leaf · 100g tin</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold text-deep-red">{p.price}</span>
                    <Button
                      variant="brand"
                      onClick={() => toast.success(`${p.name} added to cart`)}
                      className="group/btn"
                    >
                      <ShoppingBag className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                      Add to Cart
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
