import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ranrasa — We'd Love to Hear From You" },
      { name: "description", content: "Get in touch with the Ranrasa team. Questions, wholesale, partnerships — we reply within one business day." },
    ],
  }),
  component: Contact,
});

const details = [
  { icon: MapPin, title: "Visit", lines: ["42 Highland Road", "Nuwara Eliya, Sri Lanka"] },
  { icon: Mail, title: "Email", lines: ["hello@ranrasa.tea", "wholesale@ranrasa.tea"] },
  { icon: Phone, title: "Call", lines: ["+94 52 222 1234", "Mon–Sat · 9am–6pm"] },
];

function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 700);
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
              Our team is based in the misty highlands of Sri Lanka — we reply within one business day.
            </p>

            <div className="space-y-5 pt-2">
              {details.map((d) => (
                <div key={d.title} className="flex items-start gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-gold">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{d.title}</p>
                    {d.lines.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-lg border border-border bg-background p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl font-bold">Send a Message</h2>
            <span className="gold-divider mt-3" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required placeholder="How can we help?" />
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} placeholder="Tell us a little more..." />
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
