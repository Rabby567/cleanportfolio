import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border"
    >
      <p className="footer-text">
        Just an ordinary designer
      </p>

      <div className="flex items-center gap-6">
        <span className="footer-text">From Vietnam with love</span>
        <span className="footer-text">© {new Date().getFullYear()}</span>
      </div>
    </motion.footer>
  );
}
