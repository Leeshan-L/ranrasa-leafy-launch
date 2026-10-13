import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate, type Post } from "@/content/blog-posts";

// Card used on the Blog page and the Home page journal section.
// The whole card is clickable via the title link's ::after overlay.
export function BlogCard({ post, index = 0, headingLevel: Heading = "h2" }: { post: Post; index?: number; headingLevel?: "h2" | "h3" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <img src={post.cover} alt={post.coverAlt} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-gold" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <Heading className="mt-3 font-display text-xl font-semibold leading-snug text-red-gold group-hover:text-deep-red">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-deep-red" aria-hidden="true">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  );
}
