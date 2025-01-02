import { testimonials } from '@/lib/constant';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React from 'react';

const CustomersComp = () => {
    return (
        <section id="témoignages" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.div>
                    <motion.h2
                        className="text-3xl md:text-4xl font-light text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Avis Clients
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{testimonial.name}</span>
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="text-gold" size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CustomersComp
