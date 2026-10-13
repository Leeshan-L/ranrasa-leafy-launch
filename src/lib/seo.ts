// Per-page SEO tags. Site-wide tags (og:image, og:site_name, twitter:card,
// favicons) live in src/routes/__root.tsx; page tags with the same name
// override the root ones.
export const SITE_URL = "https://ranrasaceylontea.com";

export function seo({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}) {
  const url = SITE_URL + path;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
