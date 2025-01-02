import { motion } from 'framer-motion';
import React from 'react';

const ContactFormComp = () => {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-light text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Contactez-nous
                </motion.h2>
                <div className="max-w-2xl mx-auto">
                    <motion.form
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <label htmlFor="name" className="block mb-2 text-gray-700">Nom</label>
                            <input type="text" id="name" className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                            <input type="email" id="email" className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-gray-700">Message</label>
                            <textarea id="message" rows={4} className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" required></textarea>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full bg-gold text-white py-2 rounded hover:bg-gray-900 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Envoyer
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}

export default ContactFormComp
