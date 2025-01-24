'use client'

import { Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      className="border-t bg-white/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-semibold">Welkom</span>
              <span className="text-xl font-light">Home</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              © {currentYear} Welkom Home. Tous droits réservés.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <Link href="/help" className="text-gray-500 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <a
              href="mailto:contact@welkomhome.com"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/welkomhome"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
} 