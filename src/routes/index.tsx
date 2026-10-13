import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Truck, Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout, WhatsAppIcon } from "@/components/Layout";
import { SinhalaText } from "@/components/SinhalaText";
import { BlogCard } from "@/components/BlogCard";
import { getPost } from "@/content/blog-posts";
import { whatsappLink } from "@/lib/site-config";
import hero1 from "@/assets/hero/hero-1.webp";
import hero2 from "@/assets/hero/hero-2.webp";
import hero3 from "@/assets/hero/hero-3.webp";
import fmArjunnWoff2 from "@/assets/fonts/fm-arjunn.woff2?url";
import kahataLogo from "@/assets/logos/kahata-logo.webp";
import kahataTea50g from "@/assets/products/kahata-tea-50g.webp";
import kahataTeaBags from "@/assets/products/kahata-tea-bags.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ranrasa Ceylon Tea | Pure Sri Lankan Highland Tea" },
      { name: "description", content: "Shop Ranrasa Tea: Pure, zero additive Sri Lankan highland tea." },
    ],
    links: [{ rel: "preload", href: fmArjunnWoff2, as: "font", type: "font/woff2", crossOrigin: "anonymous" }],
  }),
  component: Home,
});

// `position` keeps the subject in frame when phones crop the image
const heroSlides = [
  { src: hero1, alt: "A cup of Ranrasa tea beside fresh tea leaves overlooking green tea hills", position: "70% center" },
  { src: hero2, alt: "Green tea plantation on a misty Sri Lankan hillside", position: "center" },
  { src: hero3, alt: "Tea pluckers picking fresh tea leaves", position: "65% 30%" },
];
const SLIDE_MS = 5000;
// Right-to-left slide + fade. Each image is 30% wider than the hero and moves
// 15% of the hero width (11.5% of its own), so its edges never come into view.
// The new image fades in on top while the old one slides out underneath,
// so there's no seam, gap or dark dip mid-transition.
const slideVariants = {
  enter: (reduce: boolean) => ({ x: reduce ? 0 : "11.5%", opacity: 0, zIndex: 1 }),
  center: { x: 0, opacity: 1, zIndex: 1 },
  exit: (reduce: boolean) => ({ x: reduce ? 0 : "-11.5%", opacity: 1, zIndex: 0 }),
};

const journalPosts = ["perfect-cup-of-kahata", "how-to-store-tea"].flatMap((slug) => getPost(slug) ?? []);

const products = [
  {
    name: "Ranrasa Kahata Tea",
    detail: "Tea packets · 50g to 1kg",
    price: "LKR 120",
    priceSuffix: "onwards",
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

function HeroSlideshow({ y }: { y: MotionValue<number> }) {
  const [current, setCurrent] = useState(0);
  const [tabHidden, setTabHidden] = useState(false);
  const reduceMotion = !!useReducedMotion();

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    // Only the current slide is mounted, so warm the cache for the others.
    heroSlides.slice(1).forEach((slide) => {
      new Image().src = slide.src;
    });
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Re-runs whenever the slide changes, so clicking a dot restarts the timer.
  useEffect(() => {
    if (reduceMotion || tabHidden) return;
    const t = setTimeout(() => setCurrent((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current, reduceMotion, tabHidden]);

  const slide = heroSlides[current];

  return (
    <>
      <motion.div style={{ y }} className="absolute inset-0 -z-10 bg-neutral-900">
        <AnimatePresence initial={false} custom={reduceMotion}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fetchPriority={current === 0 ? "high" : undefined}
            custom={reduceMotion}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.5 : 1.2, ease: "easeInOut" }}
            style={{ objectPosition: slide.position }}
            className="absolute inset-y-0 left-[-15%] h-full w-[130%] max-w-none object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-1">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === current}
            className="grid h-6 w-6 place-items-center rounded-full"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <HeroSlideshow y={y} />

        <div className="container-tea relative flex min-h-[88vh] flex-col items-start justify-center py-24 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/20 px-3 py-1 text-xs uppercase tracking-widest text-gold backdrop-blur"
          >
            <Leaf className="h-3.5 w-3.5" /> Trusted for Over 15 Years
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[3.5rem] leading-[1.2] [text-shadow:0_2px_10px_rgb(0_0_0/0.35)] sm:text-[4.5rem] md:text-[6rem]"
          >
            <SinhalaText
              lines={[
                { fm: "iS; l¥lrfha", unicode: "සීත කඳුකරයේ", className: "whitespace-nowrap text-white" },
                { fm: "kejqï f;a myi", unicode: "නැවුම් තේ පහස", className: "whitespace-nowrap text-logo-gold" },
              ]}
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base text-white/85 sm:text-lg"
          >
            Finest tea produced from tea leaves harvested from lush tea plantations in the highlands.
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
                  <h3 className="font-display text-xl font-semibold text-gold-dark">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                  <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                    <p className="flex items-baseline gap-1.5 whitespace-nowrap">
                      <span className="text-2xl font-bold text-deep-red">{p.price}</span>
                      {p.priceSuffix && (
                        <span className="text-sm font-medium text-muted-foreground">{p.priceSuffix}</span>
                      )}
                    </p>
                    <Button asChild variant="brand" className="group/btn w-full lg:w-auto">
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

      {/* Journal */}
      <section className="border-t border-border bg-cream">
        <div className="container-tea py-20">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Journal</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">From Our Tea Journal</h2>
            <span className="gold-divider mx-auto mt-4" />
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Tips and stories for the perfect cup</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {journalPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} headingLevel="h3" />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="brand" size="lg" className="group">
              <Link to="/blog">
                Explore All Stories
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
