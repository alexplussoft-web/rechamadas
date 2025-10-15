import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-10 bg-slate-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6"
      >
        {/* 🧠 Logo ou nome do sistema */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Suporte Analytics
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Painel inteligente de análise de atendimentos
          </p>
        </div>

        {/* 🌐 Links sociais */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/alexfferro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:alexfferro@proton.me"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/alexfferro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </motion.div>

      {/* 🔹 Linha inferior */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500"
      >
        © {new Date().getFullYear()} Desenvolvido por{" "}
        <span className="font-medium text-slate-700 dark:text-slate-300">
          Alex Silva
        </span>
        . Todos os direitos reservados.
      </motion.div>
    </footer>
  );
}
