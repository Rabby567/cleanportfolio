import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <motion.div variants={staggerContainer} initial="initial" animate="enter" className="max-w-5xl">
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-8">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">Digital Designer</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-display mb-8">
            <span className="block">Huy ML</span>
          </motion.h1>

          <motion.p variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light leading-relaxed">
            Creating beautiful and functional digital experiences. Focused on design systems, branding, and user interfaces.
          </motion.p>

          <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-8">
            <Link to="/works" className="group flex items-center gap-3 text-lg hover:opacity-70 transition-opacity">
              <span className="link-underline">View Works</span>
              <span className="text-muted-foreground">→</span>
            </Link>
            <Link to="/about" className="group flex items-center gap-3 text-lg hover:opacity-70 transition-opacity">
              <span className="link-underline">About Me</span>
              <span className="text-muted-foreground">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute right-12 bottom-24 hidden lg:block">
          <div className="w-64 h-64 rounded-full border border-border flex items-center justify-center">
            <div className="text-center">
              <span className="block font-serif text-6xl mb-2">✦</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Est. 2018</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
            <div className="w-px h-8 bg-border" />
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}