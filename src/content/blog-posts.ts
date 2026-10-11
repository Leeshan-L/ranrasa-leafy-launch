import blog1 from "@/assets/blog-1.jpg";
import blog3 from "@/assets/blog-3.jpg";
import teaBags from "@/assets/products/kahata-tea-bags.webp";
import teatime from "@/assets/blog/blog-teatime.webp";
import brewingSteps from "@/assets/blog/brewing-steps.webp";
import packetBack from "@/assets/blog/packet-back.webp";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "tip"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  cover: string;
  coverAlt: string;
  body: Block[];
};

const posts: Post[] = [
  {
    slug: "perfect-cup-of-kahata",
    date: "2026-10-12",
    title: "How to Make the Perfect Cup of Kahata",
    excerpt:
      "Pure tea, brewed your way. Follow the simple steps from the back of every Ranrasa packet for a mild, medium or strong cup.",
    cover: blog3, // TODO: temporary cover
    coverAlt: "Tea being poured from a teapot into a cup",
    body: [
      { type: "p", text: "Kahata is tea at its purest — nothing but the leaf. Whether you enjoy it just as it is, or sweeten it into a cup of plain tea, a great cup always starts with how you brew it." },
      { type: "h2", text: "What you need" },
      {
        type: "ul",
        items: [
          "Ranrasa Kahata Tea (or one Ranrasa Kahata tea bag)",
          "Freshly boiled water",
          "Your favourite cup",
          "A tea strainer (for loose tea)",
          "Sugar, if you like it sweet",
        ],
      },
      { type: "h2", text: "Brewing with Ranrasa tea packets" },
      {
        type: "ol",
        items: [
          "Add 1 teaspoon of Ranrasa Kahata Tea to your cup or teapot.",
          "Pour in freshly boiled water.",
          "Let it brew to your taste: 1–2 minutes for mild, 2–3 minutes for medium, 4 minutes for strong.",
          "Pour through a tea strainer to remove the leaves.",
          "Add sugar to your liking.",
        ],
      },
      {
        type: "image",
        src: brewingSteps,
        alt: "Ranrasa brewing guide: 1 teaspoon of tea, brew 1–2 minutes for mild, 2–3 minutes for medium, 4 minutes for strong, then add sugar to your liking",
        caption: "The brewing guide from the back of every Ranrasa packet.",
      },
      { type: "h2", text: "Brewing with Ranrasa tea bags" },
      { type: "p", text: "One tea bag makes one cup. Place the bag in your cup, pour in freshly boiled water, and brew using the same mild, medium or strong guide. Tea bags brew a few seconds quicker, so keep an eye on your cup. Remove the bag, add sugar if you like, and enjoy." },
      { type: "h2", text: "A few simple tips" },
      {
        type: "ul",
        items: [
          "Always use freshly boiled water for the best flavour.",
          "Don't brew for too long. Going well past the strong time can make tea taste bitter.",
          "Try a small piece of jaggery (hakuru) on the side instead of sugar, a classic Sri Lankan way to enjoy pure tea.",
        ],
      },
      {
        type: "image",
        src: packetBack,
        alt: "Back of a Ranrasa Kahata tea packet showing the brewing guide, ingredients and contact details",
        caption: "You'll find these steps on every Ranrasa packet.",
      },
    ],
  },
  {
    slug: "loose-tea-or-tea-bags",
    date: "2026-10-10",
    title: "Loose Tea or Tea Bags: Which One Is Right for You?",
    excerpt: "Both give you the same pure Ranrasa taste. The difference is how and where you enjoy your cup.",
    cover: teaBags, // TODO: temporary cover
    coverAlt: "Ranrasa Kahata tea bag with its red Ranrasa tag",
    body: [
      { type: "p", text: "Ranrasa Kahata comes in two forms: tea packets and tea bags. Both are made from the same pure highland tea, with nothing added. So which one should you choose? It really comes down to how you like to enjoy your tea." },
      { type: "h2", text: "Ranrasa Kahata Tea packets" },
      { type: "p", text: "Our tea packets come in sizes from 50g up to 1kg, making them perfect for everyday use at home." },
      {
        type: "ul",
        items: [
          "Ideal for families and for serving guests",
          "Brew one cup or a whole teapot",
          "Easily adjust how much tea you use for a lighter or stronger cup",
          "Choose a pack size that suits your household",
        ],
      },
      { type: "tip", text: "You'll just need a tea strainer to pour your cup." },
      { type: "h2", text: "Ranrasa Kahata Tea Bags" },
      { type: "p", text: "Each box has 25 tea bags, and one tea bag makes one cup. The real advantage is convenience." },
      {
        type: "ul",
        items: [
          "No strainer, no loose leaves, no mess",
          "Easy to carry to work, school, the hostel or on a trip",
          "Perfect when you want a quick cup anywhere there's hot water",
          "Brews a few seconds quicker than loose tea",
        ],
      },
      { type: "h2", text: "Which should you pick?" },
      { type: "p", text: "Choose tea packets if you make tea at home every day, often brew for the whole family, or love serving guests." },
      { type: "p", text: "Choose tea bags if you're often on the move, want a simple cup at the office, or like a quick, mess-free cup." },
      { type: "p", text: "Many homes keep both: a packet in the kitchen for family tea time, and a box of tea bags in the bag for the day ahead. Whichever you choose, you get the same pure taste of Ranrasa." },
    ],
  },
  {
    slug: "sri-lankan-teatime-favourites",
    date: "2026-10-08",
    title: "Sri Lankan Teatime Favourites: What to Enjoy with Your Cup",
    excerpt: "From kavum and kokis to a simple piece of jaggery, these are the treats that make a cup of Ranrasa even better.",
    cover: teatime,
    coverAlt: "A glass cup of tea with kavum, jaggery and biscuits on a wooden table",
    body: [
      { type: "p", text: "In Sri Lanka, teatime is more than a drink. It's a moment to pause, to share and to catch up. And of course, a good cup of tea is always better with something by its side." },
      { type: "h2", text: "Hakuru (jaggery)" },
      { type: "p", text: "The classic. A small bite of kithul or coconut jaggery with a cup of pure kahata is a much-loved Sri Lankan tradition. The rich sweetness of jaggery pairs beautifully with the bold taste of the tea." },
      { type: "h2", text: "Kavum" },
      { type: "p", text: "Golden, sweet and a favourite during Avurudu, kavum and its knotted cousin, konda kavum, are perfect with a strong cup." },
      { type: "h2", text: "Kokis" },
      { type: "p", text: "Light, crispy and lightly salted, kokis brings a lovely crunch to tea time." },
      { type: "h2", text: "Biscuits" },
      { type: "p", text: "Simple, everyday and always in the cupboard. Few things beat dipping a biscuit into a hot cup of tea." },
      { type: "h2", text: "Isso wade and ulundu wade" },
      { type: "p", text: "For those who prefer something savoury, a crispy wade with a little spice is a perfect match for a sweet cup of plain tea." },
      { type: "h2", text: "The perfect partner" },
      { type: "p", text: "Whatever your favourite, a bold, pure cup of Ranrasa balances sweet and savoury treats perfectly. Brew it strong, sweeten it to your liking, and enjoy the moment." },
    ],
  },
  {
    slug: "how-to-store-tea",
    date: "2026-10-05",
    title: "How to Store Tea So It Stays Fresh",
    excerpt: "Tea loses its flavour faster than you might think. A few simple habits keep every cup of Ranrasa as fresh as the day it was packed.",
    cover: blog1, // TODO: temporary cover
    coverAlt: "A cup of tea on a saucer surrounded by dried tea leaves",
    body: [
      { type: "p", text: "We pack Ranrasa tea to seal in its freshness. Once you open the packet, how you store it decides how long that fresh taste lasts." },
      { type: "h2", text: "What tea doesn't like" },
      { type: "p", text: "Tea has five enemies: air, moisture, heat, light and strong smells. Each one slowly takes away its aroma and flavour." },
      { type: "h2", text: "Simple ways to keep tea fresh" },
      {
        type: "ul",
        items: [
          "Use an airtight container. After opening, move your tea into a clean, dry glass jar or tin with a tight lid, or seal the packet well.",
          "Keep it dry. Always use a dry spoon. Even a few drops of water can spoil tea.",
          "Keep it away from heat. Don't store tea near the stove, the kettle or a sunny window.",
          "Skip the fridge. The fridge adds moisture, so a cool, dry cupboard is best.",
          "Keep it away from strong smells. Tea easily absorbs smells, so store it away from spices, coffee and onions.",
          "Buy the right size. Choose a pack size you'll finish comfortably, like a 50g packet for smaller homes or a larger pack for big families.",
          "Check the dates. You'll find the manufacturing and expiry dates on the back of every Ranrasa packet.",
        ],
      },
      { type: "h2", text: "For tea bags" },
      { type: "p", text: "Keep the box closed and in a dry place. If you carry a few tea bags with you, keep them in a small sealed bag or container." },
      { type: "p", text: "With these simple habits, every cup you brew will taste just as fresh and pure as it should." },
    ],
  },
];

// Newest first
export const blogPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function readingTime(post: Post) {
  const text = post.body
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : b.caption))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
