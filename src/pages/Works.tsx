import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  year: number;
  category: string | null;
  link: string | null;
}

const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0 },
};

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("projects").select("*").order("year", { ascending: false }).order("order_index", { ascending: true });
      if (!error && data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) acc[project.year] = [];
    acc[project.year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  const years = Object.keys(projectsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <Layout>
      <section className="min-h-screen px-6 md:px-12 lg:px-24 py-12">
        <motion.div variants={staggerContainer} initial="initial" animate="enter">
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="mb-16">
            <h1 className="text-display-sm mb-4">Works</h1>
            <p className="text-muted-foreground text-lg">Selected works I have done since 2018</p>
          </motion.div>

          {loading ? (
            <motion.div variants={fadeInUp} className="text-muted-foreground">Loading projects...</motion.div>
          ) : (
            <div className="space-y-24">
              {years.map((year) => (
                <motion.div key={year} variants={fadeInUp} transition={{ duration: 0.6 }}>
                  <div className="flex items-baseline gap-4 mb-8">
                    <h2 className="font-serif text-5xl md:text-6xl">{year}</h2>
                    <span className="text-sm text-muted-foreground">{projectsByYear[Number(year)].length} project{projectsByYear[Number(year)].length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsByYear[Number(year)].map((project, index) => (
                      <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group card-hover">
                        <div className="aspect-[4/3] bg-secondary rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                          {project.image_url ? <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" /> : <span className="font-serif text-4xl text-muted-foreground/30">{project.title.charAt(0)}</span>}
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{project.category}</span>
                          <h3 className="font-serif text-xl mb-2 group-hover:opacity-70 transition-opacity">{project.title}</h3>
                          {project.description && <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && projects.length === 0 && (
            <motion.div variants={fadeInUp} className="text-center py-24">
              <span className="font-serif text-6xl text-muted-foreground/30 block mb-4">∅</span>
              <p className="text-muted-foreground">No projects yet</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}