'use client'

import React from 'react'
import { motion } from 'framer-motion'

const CustomersComp = () => {
    const testimonials = [
        {
            text: 'Service exceptionnel et personnel très attentionné. Notre séjour était parfait.',
            name: 'Sophie M.'
        },
        {
            text: 'Une expérience inoubliable dans une villa magnifique. Merci à toute l\'équipe !',
            name: 'Pierre L.'
        },
        {
            text: 'Welkom Home a rendu notre séjour magique. Nous reviendrons certainement.',
            name: 'Marie D.'
        }
    ]

    // Dupliquer les témoignages pour l'effet de défilement infini
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Témoignages de nos clients
                </h2>
                <div className="relative">
                    <motion.div
                        className="flex gap-8"
                        animate={{
                            x: [0, -1050] // 3 cards × 350px width
                        }}
                        transition={{
                            duration: 15,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[350px] bg-white p-8 rounded-xl shadow-lg"
                            >
                                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                                <p className="font-medium">{testimonial.name}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CustomersComp
