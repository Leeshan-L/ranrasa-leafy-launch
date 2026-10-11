// Business details used across the site. Edit them here only.
export const siteConfig = {
  whatsappNumber: "94772609457", // international format, digits only
  facebookUrl: "#", // TODO: replace with real Facebook page URL
  tiktokUrl: "#", // TODO: replace with real TikTok profile URL
  companyName: "Sampatha Products",
  brandLine: "Ranrasa Tea by Sampatha Products",
  address: "49/10, Ananda Vidyala Mawatha, Elpitiya, Sri Lanka",
  email: "hello@ranrasaceylontea.com",
  phoneDisplay: "+94 77 260 9457",
  phoneLink: "+94772609457",
  openingHours: "Mon – Sat, 9:00 AM – 7:00 PM",
  // TODO: replace with the access key from https://web3forms.com (sent to the email it's registered with)
  web3formsKey: "[WEB3FORMS KEY]",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;
