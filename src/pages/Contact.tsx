import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({ name, email, message });
    if (error) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "Thanks for reaching out." });
      setName(""); setEmail(""); setMessage("");
    }
    setSubmitting(false);
  };

  const socialLinks = [
    { name: "Email", href: "mailto:hello@huyml.co" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Dribbble", href: "https://dribbble.com" },
  ];

  return (
    <Layout>
      <section className="min-h-screen px-6 md:px-12 lg:px-24 py-12">
        <motion.div variants={staggerContainer} initial="initial" animate="enter" className="max-w-4xl">
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-16">
            <h1 className="text-display-sm mb-8">Let's collaborate and make <span className="italic">good sh*t</span> together</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="bg-transparent border-border" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="bg-transparent border-border" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm uppercase tracking-widest text-muted-foreground mb-2 block">Message</label>
                  <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tell me about your project..." rows={5} className="bg-transparent border-border resize-none" />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-foreground text-background hover:bg-foreground/90">
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-12">
              <div>
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Connect</h2>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="block font-serif text-2xl link-underline hover:opacity-70 transition-opacity">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Availability</h2>
                <p className="text-muted-foreground">Currently available for freelance and full-time opportunities.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}