import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";
import { siteConfig, mapsLink } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ranrasa — We'd Love to Hear From You" },
      { name: "description", content: `Contact ${siteConfig.brandLine} in Elpitiya, Sri Lanka. Call, email or WhatsApp us about orders, pack sizes and delivery.` },
    ],
  }),
  component: Contact,
});

const details = [
  { icon: MapPin, title: "Visit", text: siteConfig.address, href: mapsLink, external: true },
  { icon: Mail, title: "Email", text: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, title: "Call", text: siteConfig.phoneDisplay, href: `tel:${siteConfig.phoneLink}` },
  { icon: Clock, title: "Hours", text: siteConfig.openingHours },
];

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

const field = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

// Accepts 0771234567, 077 123 4567, +94771234567, +94 77 123 4567 (spaces/dashes ok), 9–15 digits.
export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").length;
  return /^\+?[\d\s-]+$/.test(phone) && digits >= 9 && digits <= 15;
}

function validate(fd: FormData): Errors {
  const errors: Errors = {};
  const phone = field(fd, "phone");
  const email = field(fd, "email");
  if (!field(fd, "name")) errors.name = "Please enter your name.";
  if (!phone) errors.phone = "Please enter your mobile number.";
  else if (!isValidPhone(phone)) errors.phone = "Please enter a valid mobile number, e.g. 077 123 4567 or +94 77 123 4567.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address, or leave it empty.";
  if (!field(fd, "message")) errors.message = "Please enter a message.";
  return errors;
}

// A Web3Forms access key is a UUID. Catches the placeholder and keys pasted with [ ] or quotes.
const isValidAccessKey = (key: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key);

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="text-sm text-destructive">{message}</p>;
}

function Contact() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const found = validate(fd);
    setErrors(found);
    if (Object.keys(found).length) return;

    const failed = () =>
      toast.error(`Sorry, your message couldn't be sent. Please call or WhatsApp us on ${siteConfig.phoneDisplay}.`);

    const key = siteConfig.web3formsKey.trim();
    if (!isValidAccessKey(key)) {
      console.error(
        `[Contact form] Web3Forms access key is missing or invalid: "${siteConfig.web3formsKey}". ` +
          "Paste only the key into src/lib/site-config.ts, without [ ] brackets.",
      );
      return failed();
    }

    const email = field(fd, "email");
    const subject = field(fd, "subject");
    const data: Record<string, string | boolean> = {
      access_key: key,
      from_name: "Ranrasa Website",
      subject: subject ? `New message from Ranrasa website: ${subject}` : "New message from Ranrasa website",
      name: field(fd, "name"),
      phone: field(fd, "phone"),
      message: field(fd, "message"),
    };
    if (email) {
      data.email = email;
      data.replyto = email;
    }
    // Honeypot: only real users leave it unticked. Send it only if a bot ticked it, so Web3Forms drops the spam.
    if (fd.has("botcheck")) data.botcheck = true;

    setLoading(true);
    try {
      // Sent from the browser: the Web3Forms free plan blocks server-side submissions.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (json?.success !== true) {
        console.error("[Contact form] Web3Forms rejected the message:", res.status, json);
        return failed();
      }
      toast.success("Thank you! We'll get back to you soon.");
      form.reset();
      setErrors({});
    } catch (err) {
      console.error("[Contact form] Could not reach Web3Forms:", err);
      failed();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="border-b border-border bg-cream">
        <div className="container-tea py-16 text-center md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Let's Talk Tea</h1>
          <span className="gold-divider mx-auto mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Whether it's a question about brewing, wholesale, or just to say hello — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container-tea py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="font-display text-2xl font-bold">Get in Touch</h2>
            <span className="gold-divider" />
            <p className="text-muted-foreground">
              Questions about our tea, pack sizes or delivery? Call, email or WhatsApp us — we're happy to help.
            </p>

            <div className="space-y-5 pt-2">
              {details.map((d) => (
                <div key={d.title} className="flex items-start gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-gold">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{d.title}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        {...(d.external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="break-words text-sm text-muted-foreground transition-colors hover:text-deep-red"
                      >
                        {d.text}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{d.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-lg border border-border bg-background p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl font-bold">Send a Message</h2>
            <span className="gold-divider mt-3" />

            {/* Honeypot: hidden from people, bots fill it in */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby="name-error" />
                <FieldError id="name-error" message={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="077 123 4567" aria-invalid={!!errors.phone} aria-describedby="phone-error" />
                <FieldError id="phone-error" message={errors.phone} />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby="email-error" />
                <FieldError id="email-error" message={errors.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Input id="subject" name="subject" autoComplete="off" placeholder="How can we help?" />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={6} placeholder="Tell us a little more..." aria-invalid={!!errors.message} aria-describedby="message-error" />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <Button type="submit" variant="brand" size="lg" disabled={loading} className="mt-6 w-full sm:w-auto">
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
