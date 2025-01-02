'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Users, Home, Star, ArrowRight, Lightbulb, Rocket, TrendingUp, Award } from 'lucide-react'
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
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gold/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-lg">
                <span className="text-white font-semibold">17</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
                Conception
              </h4>
              <Lightbulb className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Début de l&apos;étude de marché et conception du projet Welkom Home au cœur du Golfe de Saint-Tropez.
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
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gold/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-lg">
                <span className="text-white font-semibold">18</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
                Lancement
              </h4>
              <Rocket className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Lancement officiel de Welkom Home. Notre politique de service, la sélection des partenaires et le dynamisme de nos équipes nous permettent de devenir rapidement une référence qualité.
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
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gold/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-lg">
                <span className="text-white font-semibold">20</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
                Expansion
              </h4>
              <TrendingUp className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Élargissement de notre réseau de partenaires et de propriétés. Notre concept privilégiant la proximité, la disponibilité et la réactivité limite volontairement notre périmètre d&apos;intervention.
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
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gold/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-lg">
                <span className="text-white font-semibold">23</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-gold transition-colors">
                Référence locale
              </h4>
              <Award className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Welkom Home devient une référence qualité locale dans le domaine très spécifique de l&apos;intendance au service des particuliers et des locataires.
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </motion.div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <Navbar />
      
      {/* Hero Section */}
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
              alt="Welkom Home Luxury"
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
        {/* Story Section */}
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
            <div className="relative h-[200px] rounded-2xl overflow-hidden">
              <Image
                src="/logoAbout.png"
                alt="Notre Histoire"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Timeline Section avec animation améliorée */}
        <motion.div
          className="py-20 bg-white/50 dark:bg-neutral-800/50 rounded-3xl my-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Timeline data={timelineData} />
        </motion.div>

        {/* Values Section avec design moderne */}
        <motion.div
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-center mb-16 text-gray-800 dark:text-white">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: "Disponibilité", description: "Service personnalisé 24/7" },
              { icon: Users, title: "Proximité", description: "Une approche sur mesure" },
              { icon: Home, title: "Confort", description: "Excellence et bien-être" },
              { icon: Star, title: "Excellence", description: "Qualité irréprochable" }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-16 h-16 mb-6 mx-auto">
                  <div className="absolute inset-0 bg-gold/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-xl">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center dark:text-white group-hover:text-gold transition-colors">
                  {value.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Citation Section */}
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