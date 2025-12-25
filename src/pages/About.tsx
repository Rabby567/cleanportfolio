import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  name: string;
  tagline: string | null;
  bio: string | null;
  hobbies: string | null;
  experience: string | null;
  location: string | null;
}

const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0 },
};

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase.from("profile").select("*").maybeSingle();
      if (!error && data) setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const processSteps = [
    { number: "01", title: "Direction", description: "Understanding the problem and defining the strategy" },
    { number: "02", title: "Design", description: "Crafting the visual language and user experience" },
    { number: "03", title: "Development", description: "Bringing designs to life with clean code" },
  ];

  return (
    <Layout>
      <section className="min-h-screen px-6 md:px-12 lg:px-24 py-12">
        <motion.div variants={staggerContainer} initial="initial" animate="enter" className="max-w-4xl">
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-24">
            <h1 className="text-display-sm mb-8">{loading ? "Loading..." : profile?.name || "Huy ML"}</h1>
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light">
              {profile?.bio || "A passionate digital designer focused on creating beautiful and functional experiences."}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                <span className="font-serif text-4xl text-muted-foreground/30">✦</span>
              </div>
            ))}
          </motion.div>

          {profile?.hobbies && (
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-24">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">When I'm not designing</h2>
              <p className="font-serif text-3xl md:text-4xl leading-relaxed">
                {profile.hobbies.split(", ").map((hobby, index, arr) => (
                  <span key={hobby}><span className="italic">{hobby}</span>{index < arr.length - 1 && <span className="text-muted-foreground"> • </span>}</span>
                ))}
              </p>
            </motion.div>
          )}

          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-24">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">My Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {processSteps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                  <span className="font-serif text-5xl text-muted-foreground/30 block mb-4">{step.number}</span>
                  <h3 className="font-serif text-2xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="border-t border-border pt-12">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div>
                <span className="text-sm uppercase tracking-widest text-muted-foreground block mb-2">Based in</span>
                <span className="font-serif text-2xl">{profile?.location || "Vietnam"}</span>
              </div>
              <div>
                <span className="text-sm uppercase tracking-widest text-muted-foreground block mb-2">Available for</span>
                <span className="font-serif text-2xl">Freelance & Full-time</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}