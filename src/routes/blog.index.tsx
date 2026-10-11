import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import { blogPosts, formatDate } from "@/content/blog-posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Ranrasa Journal — Tea Stories & Brewing Guides" },
      { name: "description", content: "Brewing guides, teatime favourites and simple tips for enjoying pure Ranrasa Ceylon tea." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <Layout>
      <section className="border-b border-border bg-cream">
        <div className="container-tea py-16 text-center md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Journal</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Stories From the Highlands</h1>
          <span className="gold-divider mx-auto mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Brewing guides, teatime favourites and simple tips for the perfect cup.
          </p>
        </div>
      </section>

      <section className="container-tea py-20">
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {blogPosts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <img src={p.cover} alt={p.coverAlt} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug group-hover:text-deep-red">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-deep-red" aria-hidden="true">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
