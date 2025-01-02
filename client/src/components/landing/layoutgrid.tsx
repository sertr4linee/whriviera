"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={cn(
              card.className,
              "relative h-[300px] md:h-[400px] rounded-xl overflow-hidden cursor-pointer"
            )}
            layoutId={`card-${card.id}`}
            onClick={() => setSelected(card)}
          >
            <motion.img
              layoutId={`image-${card.id}`}
              src={card.thumbnail.src}
              alt={card.thumbnail.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                {card.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              layoutId={`card-${selected.id}`}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-50 rounded-xl overflow-hidden"
            >
              <motion.img
                layoutId={`image-${selected.id}`}
                src={selected.thumbnail.src}
                alt={selected.thumbnail.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {selected.content}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
