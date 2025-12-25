import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Works", path: "/works" },
  { name: "About", path: "/about" },
  { name: "Playground", path: "/playground" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between bg-background/80 backdrop-blur-sm"
    >
      <Link 
        to="/" 
        className="font-serif text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity"
      >
        Huy ML
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
          >
            <Link
              to={link.path}
              className={cn(
                "nav-link link-underline",
                location.pathname === link.path && "active"
              )}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden flex flex-col gap-1.5 p-2">
        <span className="w-6 h-px bg-foreground" />
        <span className="w-6 h-px bg-foreground" />
      </button>
    </motion.nav>
  );
}
