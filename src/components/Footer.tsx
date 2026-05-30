"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-[#FF6B6B] animate-pulse" />
            <span>
              by <span className="text-white font-medium">Kishan Patel</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://flexypdf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6C63FF] transition-colors"
            >
              FlexYPDF
            </a>
            <a
              href="https://munafalab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4AA] transition-colors"
            >
              MunafaLab
            </a>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="glow-line mt-8" />

        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; {new Date().getFullYear()} Kishan Patel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
