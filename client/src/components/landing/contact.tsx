'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

const ContactComp = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-4xl font-bold mb-8">
                            Contactez-nous
                        </h2>
                        <h3 className="text-2xl font-light mb-6">Contactez-nous</h3>
                        <p className="text-gray-600 mb-12">
                            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans votre projet.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href="mailto:contact@welkomhome.com" className="text-gray-600 hover:text-gold">
                                        contact@welkomhome.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <p className="font-medium">Téléphone</p>
                                    <a href="tel:+33622423754" className="text-gray-600 hover:text-gold">
                                        +33 6 22 42 37 54
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <p className="font-medium">Adresse</p>
                                    <p className="text-gray-600">
                                        123 Avenue des Champs-Élysées, 75008 Paris
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactComp
