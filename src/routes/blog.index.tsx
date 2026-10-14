import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/content/blog-posts";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      path: "/blog",
      title: "Ranrasa Journal — Tea Stories & Brewing Guides",
      description: "Brewing guides, teatime favourites and simple tips for enjoying pure Ranrasa Ceylon tea.",
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
            <BlogCard key={p.slug} post={p} index={i} eager={i < 2} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
