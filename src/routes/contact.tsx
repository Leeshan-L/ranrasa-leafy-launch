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

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(fd: FormData): Errors {
  const errors: Errors = {};
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!message) errors.message = "Please enter a message.";
  return errors;
}

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
    if (siteConfig.web3formsKey.startsWith("[")) return failed();

    const subject = String(fd.get("subject") ?? "").trim();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: siteConfig.web3formsKey,
          from_name: "Ranrasa Website",
          subject: subject ? `New message from Ranrasa website: ${subject}` : "New message from Ranrasa website",
          name: String(fd.get("name")).trim(),
          email: String(fd.get("email")).trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          message: String(fd.get("message")).trim(),
          botcheck: fd.has("botcheck"),
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message ?? `HTTP ${res.status}`);
      toast.success("Thank you! We'll get back to you soon.");
      form.reset();
    } catch (err) {
      console.error(err);
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
                <Input id="name" name="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby="name-error" />
                <FieldError id="name-error" message={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby="email-error" />
                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Input id="phone" name="phone" type="tel" placeholder="07X XXX XXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Input id="subject" name="subject" placeholder="How can we help?" />
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
