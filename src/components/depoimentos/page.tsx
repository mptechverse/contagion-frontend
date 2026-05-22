"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { inter, oswald } from "@/lib/fonts";

const testimonials = [
  {
    name: "Lucas Oliveira",
    role: "Participante 2024",
    text:
      "O Contagion mudou minha vida. Foi lá que eu realmente entendi o que significa viver uma fé genuína.",
  },
  {
    name: "Mariana Santos",
    role: "Líder de Jovens",
    text:
      "Levar meu grupo foi a melhor decisão. Cada jovem voltou com o coração transformado.",
  },
  {
    name: "Pedro Henrique",
    role: "Participante 2023",
    text:
      "As noites de adoração são indescritíveis. A presença de Deus é real.",
  },
  {
    name: "Ana Clara",
    role: "Participante 2022",
    text:
      "Nunca imaginei viver algo tão forte espiritualmente. Foi marcante.",
  },
  {
    name: "João Victor",
    role: "Voluntário",
    text:
      "Servir no Contagion fortaleceu minha fé e mudou minha visão de propósito.",
  },
];

export default function Depoimentos() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visible = 3;

  function next() {
    if (index + visible < testimonials.length) {
      setDirection(1);
      setIndex((prev) => prev + 1);
    }
  }

  function prev() {
    if (index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
    }
  }

  /* ======================
     ANIMAÇÕES
  =======================*/

  // textos sobem
  const fadeUp: Variants = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // animação lateral do carrossel
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`${oswald.className} text-[#ffc700] tracking-widest uppercase mb-4`}>
            Depoimentos
          </p>

          <h2 className={`${oswald.className} text-4xl md:text-6xl font-bold`}>
            VIDAS{" "}
            <span className="text-[#ffc700] animate-text-glow">
              TRANSFORMADAS
            </span>
          </h2>
        </motion.div>

        {/* CARROSSEL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* SETA ESQUERDA */}
          {index > 0 && (
            <button
              onClick={prev}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-[#ffc700] text-black p-3 rounded-full hover:scale-110 transition"
            >
              <ChevronLeft />
            </button>
          )}

          {/* GRID ANIMADO */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid md:grid-cols-3 gap-6"
              >
                {testimonials
                  .slice(index, index + visible)
                  .map((t, i) => (
                    <div
                      key={i}
                      className="bg-neutral-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="mb-5">
                        <Quote className="w-8 h-8 text-[#ffc700]" />
                      </div>

                      <p className={`${inter.className} text-neutral-300 text-sm italic leading-relaxed mb-6`}>
                        "{t.text}"
                      </p>

                      <div>
                        <p className={`${oswald.className} text-lg`}>
                          {t.name}
                        </p>
                        <p className={`${inter.className} text-xs text-neutral-400`}>
                          {t.role}
                        </p>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SETA DIREITA */}
          {index + visible < testimonials.length && (
            <button
              onClick={next}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-[#ffc700] text-black p-3 rounded-full hover:scale-110 transition"
            >
              <ChevronRight />
            </button>
          )}
        </motion.div>

        {/* ========================= */}
        {/* CARROSSEL IMAGENS (SEM ANIMAÇÃO DE ENTRADA) */}
        {/* ========================= */}

        <div className="mt-20 overflow-hidden">
          <div className="flex gap-6 animate-scroll-images">
            {[...Array(2)].map((_, loop) => (
              <div key={loop} className="flex gap-6">
                {[
                  "/images/imagens-evento/1.png",
                  "/images/imagens-evento/2.png",
                  "/images/imagens-evento/3.png",
                  "/images/imagens-evento/4.png",
                  "/images/imagens-evento/5.png",
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="h-[150px] w-[225px] object-cover rounded-xl"
                    alt="Evento"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}