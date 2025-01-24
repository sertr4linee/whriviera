'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/landing/footer'
import Image from 'next/image'
import { Home, Star, Clock, MessageCircle, Shield, Users } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    {
      number: "50+",
      label: "Propriétés de luxe"
    },
    {
      number: "98%",
      label: "Satisfaction client"
    },
    {
      number: "24/7",
      label: "Service conciergerie"
    },
    {
      number: "200+",
      label: "Clients satisfaits"
    }
  ]

  const values = [
    {
      icon: Home,
      title: "Propriétés d'exception",
      description: "Notre collection exclusive de villas et propriétés de luxe dans le Golfe de Saint-Tropez répond aux plus hautes exigences de confort et d'élégance."
    },
    {
      icon: Star,
      title: "Service personnalisé",
      description: "Chaque client bénéficie d'une attention particulière et d'un service sur mesure pour une expérience unique et mémorable."
    },
    {
      icon: Clock,
      title: "Disponibilité 24/7",
      description: "Notre équipe de conciergerie est à votre disposition 24h/24 et 7j/7 pour répondre à toutes vos demandes et assurer votre confort."
    },
    {
      icon: MessageCircle,
      title: "Communication privilégiée",
      description: "Un dialogue constant et transparent avec nos clients pour comprendre et anticiper leurs besoins tout au long de leur séjour."
    },
    {
      icon: Shield,
      title: "Confidentialité garantie",
      description: "La discrétion et la protection de votre vie privée sont au cœur de nos engagements, pour des séjours en toute sérénité."
    },
    {
      icon: Users,
      title: "Équipe d'experts",
      description: "Notre équipe de professionnels expérimentés s'engage à offrir un service d'excellence et une expérience inoubliable à chaque client."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        {/* First Section */}
        <div className="max-w-4xl mx-auto mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 sm:mb-24"
          >
            <p className="text-blue-300 font-medium mb-3 sm:mb-4">À propos de nous</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Notre histoire
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Découvrez l&apos;excellence et le raffinement qui font la signature de Welkom Home.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/about-gradient.jpg"
                alt="Welkom Home Luxury Experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-4 sm:px-6"
            >
              <p className="text-blue-300 font-medium mb-3 sm:mb-4">Excellence et passion</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">
                L&apos;art de l&apos;hospitalité de luxe
              </h2>

              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                      {stat.number}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Second Section - Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 sm:mb-24"
          >
            <p className="text-blue-300 font-medium mb-3 sm:mb-4">Nos valeurs</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              L&apos;engagement Welkom Home
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Notre philosophie de service repose sur des valeurs fortes qui guident chacune de nos actions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-start bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 p-3 rounded-lg mb-6">
                  <value.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}