'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import { Timeline } from '@/components/timeline'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function AboutPage() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  const timelineData = [
    {
      title: "2017",
      content: (
        <motion.div 
          className="bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
              {t('about.timeline.2017.title')}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.timeline.2017.cont')}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
      ),
    },
    {
      title: "2018",
      content: (
        <motion.div 
          className="bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
              {t('about.timeline.2018.title')}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.timeline.2018.cont')}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
      ),
    },
    {
      title: "2020",
      content: (
        <motion.div 
          className="bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
              {t('about.timeline.2020.title')}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.timeline.2020.cont')}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
      ),
    },
    {
      title: "2023",
      content: (
        <motion.div 
          className="bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
              {t('about.timeline.2023.title')}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.timeline.2023.cont')}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <Navbar />
      
      <div className="relative h-[70vh] overflow-hidden rounded-b-[2rem] shadow-xl">
        <motion.div
          style={{ y }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ scale }}
            className="relative w-full h-full"
          >
            <Image
              src="/backgroundAbout.png"
              alt={t('about.hero.title')}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-black/30 rounded-b-[2rem]"
          style={{ opacity }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-center text-white z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-4">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <main className="px-6 md:px-12 lg:px-24">
        <motion.div 
          className="max-w-4xl mx-auto py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                {t('about.story.p1')}
              </p>
              <p className="leading-relaxed">
                {t('about.story.p2')}
              </p>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-full hover:bg-gold/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('about.story.cta')}
                <ArrowRight size={16} />
              </motion.button>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/logoAbout.png"
                alt={t('about.hero.title')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="py-20 bg-white/50 dark:bg-neutral-800/50 rounded-3xl my-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Timeline data={timelineData} />
        </motion.div>

        <motion.div 
          className="py-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white max-w-4xl mx-auto">
            {t('about.quote.text')}
            <footer className="mt-6 text-xl text-gold">
              {t('about.quote.author')}
            </footer>
          </blockquote>
        </motion.div>
      </main>
    </div>
  )
}