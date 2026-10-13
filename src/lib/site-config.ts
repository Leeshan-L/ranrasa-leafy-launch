// Business details used across the site. Edit them here only.
export const siteConfig = {
  whatsappNumber: "94772609457", // international format, digits only
  facebookUrl: "https://www.facebook.com/ranrasatea",
  tiktokUrl: "[YOUR TIKTOK LINK]", // TODO: full https:// TikTok profile URL; the icon stays unlinked until then
  companyName: "Sampatha Products",
  brandLine: "Ranrasa Tea by Sampatha Products",
  address: "49/10, Ananda Vidyala Mawatha, Elpitiya, Sri Lanka",
  email: "hello@ranrasaceylontea.com",
  phoneDisplay: "+94 77 260 9457",
  phoneLink: "+94772609457",
  openingHours: "Mon – Sat, 9:00 AM – 7:00 PM",
  web3formsKey: "[PASTE YOUR KEY HERE]",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;
