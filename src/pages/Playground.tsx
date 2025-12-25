import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface PlaygroundItem {
  id: string;
  title: string;
  category: string | null;
  image_url: string | null;
  year: number;
}

const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0 },
};

export default function Playground() {
  const [items, setItems] = useState<PlaygroundItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase.from("playground").select("*").order("year", { ascending: false }).order("order_index", { ascending: true });
      if (!error && data) setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <Layout>
      <section className="min-h-screen px-6 md:px-12 lg:px-24 py-12">
        <motion.div variants={staggerContainer} initial="initial" animate="enter">
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-16">
            <h1 className="text-display-sm mb-4">Playground</h1>
            <p className="text-muted-foreground text-lg">Experimental designs and side projects</p>
          </motion.div>

          {loading ? (
            <motion.div variants={fadeInUp} className="text-muted-foreground">Loading...</motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group card-hover">
                  <div className="aspect-square bg-secondary rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    {item.image_url ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" /> : <span className="font-serif text-6xl text-foreground/10">✦</span>}
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">{item.category}</span>
                      <h3 className="font-serif text-lg group-hover:opacity-70 transition-opacity">{item.title}</h3>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && items.length === 0 && (
            <motion.div variants={fadeInUp} className="text-center py-24">
              <span className="font-serif text-6xl text-muted-foreground/30 block mb-4">✦</span>
              <p className="text-muted-foreground">More experiments coming soon</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}