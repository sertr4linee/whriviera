'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/landing/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-300 font-medium mb-4">Privacy Policy</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We care about your privacy
            </h1>
            <p className="text-gray-600 text-lg mb-12">
              Your privacy is important to us at Welkom Home. We respect your privacy regarding any information we may collect from you across our website.
            </p>

            <div className="flex gap-4 mb-12">
              <button className="px-4 py-2 bg-white rounded-full shadow-sm font-medium">
                Legal version
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-white/50 rounded-full transition-colors">
                Simple version
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Chez Welkom Home, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">
                Quelles informations collectons-nous ?
              </h2>

              <p className="text-gray-600 mb-6">
                Nous collectons uniquement les informations nécessaires pour vous fournir nos services de la meilleure qualité possible :
              </p>

              <ul className="list-disc list-inside text-gray-600 mb-8">
                <li className="mb-2">Informations de contact (nom, email, téléphone)</li>
                <li className="mb-2">Préférences de réservation et historique</li>
                <li className="mb-2">Informations de paiement sécurisées</li>
                <li>Commentaires et retours d&apos;expérience</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">
                Comment utilisons-nous ces informations ?
              </h2>

              <p className="text-gray-600 mb-6">
                Vos informations sont utilisées exclusivement pour :
              </p>

              <ul className="list-disc list-inside text-gray-600 mb-8">
                <li className="mb-2">Gérer vos réservations et séjours</li>
                <li className="mb-2">Personnaliser votre expérience</li>
                <li className="mb-2">Améliorer nos services</li>
                <li>Communiquer avec vous concernant nos offres</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">
                Protection de vos données
              </h2>

              <p className="text-gray-600 mb-8">
                Nous mettons en œuvre des mesures de sécurité strictes pour protéger vos informations personnelles. Vos données sont stockées de manière sécurisée et ne sont jamais vendues à des tiers.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">
                Vos droits
              </h2>

              <p className="text-gray-600 mb-8">
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Vous pouvez exercer ces droits en nous contactant à privacy@welkomhome.com.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}