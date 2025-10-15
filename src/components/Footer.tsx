"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail, Info } from "lucide-react";
import { Tooltip } from "./Tooltip";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        backdrop-blur-md bg-white/70 dark:bg-slate-800/70
        border border-slate-200/50 dark:border-slate-700/50
        shadow-lg rounded-full
        px-6 py-2 flex items-center gap-4 text-sm
        text-slate-700 dark:text-slate-300
        z-50
      "
    >
      {/* Frase e coração */}
      <span className="flex items-center gap-1">
        Feito com
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-purple-500"
        >
          <Heart className="w-4 h-4 fill-purple-500" />
        </motion.span>
        por
        <span className="font-semibold text-slate-900 dark:text-white">
          Alex Silva
        </span>
      </span>

      {/* Links sociais */}
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/alexfferro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="mailto:alexffero@proton.me"
          className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
        >
          <Mail className="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com/in/alexfferro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Tooltip da versão */}
        <Tooltip content="Versão 1.0.3">
          <Info className="w-4 h-4 text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition" />
        </Tooltip>
      </div>
    </motion.footer>
  );
}
