import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Scale, HeartPulse, Smile, Leaf } from "lucide-react";
import { Layout } from "@/components/Layout";
import aboutImg from "@/assets/about-tea.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ranrasa — Our Highland Promise" },
      { name: "description", content: "Single-origin Sri Lankan highland tea, sourced without additives. Learn about our heritage and health benefits." },
    ],
  }),
  component: About,
});

const benefits = [
  { icon: Eye, title: "Improve Eyesight", desc: "Rich in vitamin B2 and antioxidants for ocular health." },
  { icon: Scale, title: "Weight Loss", desc: "Polyphenols that support a healthy metabolism." },
  { icon: HeartPulse, title: "Heart Health", desc: "Catechins help maintain healthy cholesterol levels." },
  { icon: Smile, title: "Makes You Happy", desc: "L-theanine gently calms and lifts the mood." },
];

function About() {
  return (
    <Layout>
      {/* Hero band */}
      <section className="border-b border-border bg-cream">
        <div className="container-tea py-16 text-center md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Story</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">From Highland Mist to Your Cup</h1>
          <span className="gold-divider mx-auto mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Three generations of tea makers, one unwavering promise: nothing but the leaf.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="container-tea py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg"
          >
            <img src={aboutImg} alt="Tea picker in the highlands" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Zero Additives</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Sourced from 6,500 ft. Above the Sea</h2>
            <span className="gold-divider mt-4" />
            <p className="mt-6 text-muted-foreground">
              Our gardens cling to the steep slopes of Nuwara Eliya, where cool mountain air and
              persistent mist slow the leaf's growth — concentrating flavor and aroma in ways
              lowland tea simply cannot match.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every batch is hand-plucked, sun-withered, and sealed within hours of harvest.
              No flavorings. No colorings. No shortcuts. Just tea, the way it was meant to be.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-lg border border-gold/30 bg-gold/5 p-5">
              <Leaf className="h-8 w-8 shrink-0 text-gold" />
              <p className="text-sm font-medium">
                100% single-origin · Rainforest Alliance certified · Ethically sourced
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
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">A Daily Ritual, A Lifetime of Wellness</h2>
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
