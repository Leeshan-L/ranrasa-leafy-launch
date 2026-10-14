import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { Layout, WhatsAppIcon } from "@/components/Layout";
import { whatsappLink } from "@/lib/site-config";
import { getPost, formatDate, readingTime, type Block } from "@/content/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          path: `/blog/${loaderData.slug}`,
          title: `${loaderData.title} — Ranrasa Journal`,
          description: loaderData.excerpt,
          type: "article",
        })
      : {},
  component: BlogPost,
});

function BodyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 className="!mt-10 font-display text-2xl font-bold text-foreground">{block.text}</h2>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-gold">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-gold-dark">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      );
    case "image":
      return (
        <figure className="!my-8">
          <img src={block.src} alt={block.alt} loading="lazy" className="mx-auto max-h-[36rem] w-auto rounded-lg" />
          <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">{block.caption}</figcaption>
        </figure>
      );
    case "tip":
      return (
        <aside className="flex gap-3 rounded-lg border border-gold/30 bg-gold/5 p-4 text-foreground">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p>{block.text}</p>
        </aside>
      );
  }
}

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <Layout>
      <article className="container-tea max-w-3xl py-12 md:py-16">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-deep-red hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mt-6 aspect-[4/3] overflow-hidden rounded-lg bg-cream">
          <img src={post.cover} alt={post.coverAlt} className="h-full w-full object-cover" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gold" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gold" />
            {readingTime(post)} min read
          </span>
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-red-gold md:text-5xl">{post.title}</h1>
        <span className="gold-divider mt-5" />

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
          {post.body.map((block, i) => <BodyBlock key={i} block={block} />)}
        </div>

        <div className="mt-14 rounded-lg border border-border bg-cream p-6 text-center sm:p-8">
          <h2 className="font-display text-2xl font-bold">Enjoy a cup of pure Ranrasa tea</h2>
          <span className="gold-divider mx-auto mt-3" />
          <Button asChild variant="brand" size="lg" className="mt-6">
            <a
              href={whatsappLink("Hi Ranrasa, I'd like to order Ranrasa Kahata Tea.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </Button>
        </div>

        <Link to="/blog" className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-deep-red hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </article>
    </Layout>
  );
}
