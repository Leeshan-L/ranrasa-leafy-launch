import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Ranrasa Journal — Tea Stories & Brewing Guides" },
      { name: "description", content: "Articles on Ceylon tea, brewing rituals, and the health benefits of pure highland tea." },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    img: blog1, date: "Mar 14, 2026", title: "The Finest Tea Selection of the Season",
    excerpt: "How we choose the leaves that make it to your cup — a slow, deliberate process rooted in heritage.",
  },
  {
    img: blog2, date: "Feb 28, 2026", title: "Health Benefits of Ceylon Tea",
    excerpt: "From antioxidants to L-theanine, here's what a daily cup of Ceylon tea actually does for your body.",
  },
  {
    img: blog3, date: "Feb 09, 2026", title: "The Art of the Perfect Steep",
    excerpt: "Water temperature, time, and the small rituals that elevate everyday tea into a moment.",
  },
];

function Blog() {
  return (
    <Layout>
      <section className="border-b border-border bg-cream">
        <div className="container-tea py-16 text-center md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Journal</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Stories From the Highlands</h1>
          <span className="gold-divider mx-auto mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Brewing guides, origin notes, and the wellness science behind every cup.
          </p>
        </div>
      </section>

      <section className="container-tea py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>{p.date}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug group-hover:text-deep-red">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <a href="#" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-deep-red">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
