'use client'

import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/landing/footer'

export default function HelpPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>('trial')

  const questions = [
    { id: 'trial', question: 'What is the trial period?', answer: 'You can try our service for free for 14 days.' },
    { id: 'plan', question: 'How do I choose a plan?', answer: 'You can select a plan that best suits your needs from our pricing page.' },
    { id: 'cancellation', question: 'What is the cancellation policy?', answer: 'You can cancel your subscription at any time with no penalties.' },
    { id: 'invoice', question: 'How do I get my invoices?', answer: 'You can download your invoices from your account dashboard.' },
    { id: 'billing', question: 'How does billing work?', answer: 'We bill monthly on the date you signed up.' },
    { id: 'email', question: 'How do I change my email?', answer: 'You can update your email address in your account settings.' },
  ]

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header - Premier niveau */}
        <div className="max-w-3xl pt-16 md:pt-20 pb-16">
          <Link href="/" className="text-blue-300 hover:text-cy font-medium mb-4 inline-block">
            Frequently Asked Questions
          </Link>
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-600">Find answers to common questions about our service</p>
        </div>

        {/* Contenu principal - Deuxième niveau */}
        <div className="max-w-3xl mx-auto">
          {/* Support */}
          <div className="mb-12">
            <h2 className="text-blue-300 font-medium mb-4">Support</h2>
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-600">
              Can't find what you're looking for?{' '}
              <Link href="/contact" className="text-blue-300 hover:text-blue-400 underline">
                Chat with our support team
              </Link>
              .
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4 mb-20">
            {questions.map((q) => (
              <div key={q.id} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  onClick={() => toggleQuestion(q.id)}
                >
                  <span className="font-medium text-gray-900">{q.question}</span>
                  {openQuestion === q.id ? (
                    <Minus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openQuestion === q.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Newsletter - Troisième niveau
          <div className="bg-purple-700 rounded-2xl p-8 md:p-12">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{t('help.newsletter.title')}</h2>
              <p className="mb-8">{t('help.newsletter.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('help.newsletter.placeholder')}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg transition-colors font-medium whitespace-nowrap">
                  {t('help.newsletter.button')}
                </button>
              </div>
              <p className="mt-4 text-sm text-purple-200">
                {t('help.newsletter.privacy')}{' '}
                <Link href="/privacy" className="underline hover:text-white">
                  {t('help.newsletter.privacy_link')}
                </Link>
                .
              </p>
            </div>
          </div> */}
        <Footer />
        </div>
      </div>
    </div>
  )
}