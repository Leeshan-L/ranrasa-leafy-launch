import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Coffee, Sunrise, Users, Leaf } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SinhalaText } from "@/components/SinhalaText";
import aboutImg from "@/assets/about-story.webp";
import fmArjunnWoff2 from "@/assets/fonts/fm-arjunn.woff2?url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ranrasa — The Golden Taste of Pure Tea" },
      { name: "description", content: "The story of Ranrasa Tea by Sampatha Products: pure Sri Lankan highland tea with zero additives, processed and packed in Elpitiya for over fifteen years." },
    ],
    links: [{ rel: "preload", href: fmArjunnWoff2, as: "font", type: "font/woff2", crossOrigin: "anonymous" }],
  }),
  component: About,
});

const benefits = [
  { icon: Coffee, title: "Bold & Rich Flavour", desc: "A strong, full-bodied cup every time." },
  { icon: Sunrise, title: "Your Daily Refresh", desc: "The perfect start to the morning or an evening break." },
  { icon: Users, title: "Made for Sharing", desc: "Tea for family, guests and good conversation." },
  { icon: Leaf, title: "Pure & Simple", desc: "Just tea leaves. Nothing added." },
];

function About() {
  return (
    <Layout>
      {/* Hero band */}
      <section className="border-b border-border bg-cream">
        <div className="container-tea py-16 text-center md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Story</span>
          <h1 className="mt-4 text-balance text-[2.5rem] leading-tight sm:text-5xl md:text-7xl">
            <SinhalaText fm="iS; l¥lrfha kejqï f;a myi" unicode="සීත කඳුකරයේ නැවුම් තේ පහස" />
          </h1>
          <span className="gold-divider mx-auto mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Finest tea produced from tea leaves harvested from lush tea plantations in the highlands.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="container-tea overflow-x-clip py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg"
          >
            <img src={aboutImg} alt="Fresh green tea leaves growing on a tea bush" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-lg bg-background/95 px-5 py-3 shadow-md backdrop-blur">
              <p className="font-display text-3xl font-bold text-deep-red">15+ Years</p>
              <p className="text-sm text-muted-foreground">of pure tea</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Zero Additives</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">The Golden Taste of Pure Tea</h2>
            <span className="gold-divider mt-4" />
            <p className="mt-6 text-muted-foreground">
              Amal Sampath, the founder of Ranrasa Tea, grew up in a family where tea was part of everyday life. More than fifteen years ago, he set out with one simple goal: to bring local families a pure tea with zero additives, nothing but the leaf.
            </p>
            <p className="mt-4 text-muted-foreground">
              He named it Ranrasa, meaning “golden taste” — the rich, golden cup he believed every Sri Lankan home deserves.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our tea leaves are grown in the fresh, cool highlands of Sri Lanka, then brought down south to Elpitiya, where Sampatha Products carefully processes and packs every batch to keep that freshness sealed in.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our signature tea, <span className="font-semibold text-gold-dark">Ranrasa Kahata</span>, celebrates tea at its purest. Kahata means pure tea, nothing but the leaf. Many Sri Lankans love their tea sweet and add sugar to make plain tea, and that choice is yours. What we give you is the pure tea itself.
            </p>
            <p className="mt-4 text-muted-foreground">
              From Amal’s family to yours, every cup of Ranrasa is a promise of honest, pure Ceylon tea.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-lg border border-gold/30 bg-gold/5 p-5">
              <Leaf className="h-8 w-8 shrink-0 text-gold" />
              <p className="text-sm font-medium">
                Zero additives · Nothing but the leaf · Packed in Elpitiya, Sri Lanka
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border bg-cream">
        <div className="container-tea py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Why Drink Tea</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Why People Love Ranrasa</h2>
            <span className="gold-divider mx-auto mt-4" />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-lg border border-border bg-background p-7 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-md"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
