// Business details used across the site. Edit them here only.
export const siteConfig = {
  // TODO: international format, digits only (e.g. 94771234567)
  whatsappNumber: "[WHATSAPP NUMBER]",
  facebookUrl: "#", // TODO: replace with real Facebook page URL
  tiktokUrl: "#", // TODO: replace with real TikTok profile URL
  companyName: "[COMPANY NAME]",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
