"use client";

import { motion, Variants } from "framer-motion";
import { inter, oswald } from "@/lib/fonts";

const steps = [
  {
    num: "01",
    title: "Chegada e Acolhimento",
    desc: "Recepção calorosa, organização dos participantes e primeiros momentos de conexão.",
  },
  {
    num: "02",
    title: "Louvor e Palavra",
    desc: "Momentos intensos de adoração e mensagens que fortalecem a fé.",
  },
  {
    num: "03",
    title: "Comunhão e Experiências",
    desc: "Dinâmicas, conversas profundas e atividades que aproximam pessoas.",
  },
  {
    num: "04",
    title: "Transformação",
    desc: "Tempo de oração e entrega que marca vidas de forma permanente.",
  },
];

export default function Trilha() {
  /* =========================
     VARIANTS
  ========================== */

  // controla sequência geral
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25, // aparece um por vez
      },
    },
  };

  // título sobe
  const titleVariant: Variants = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // etapas entram da esquerda → direita
  const stepVariant: Variants = {
    hidden: { x: -80, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white py-15 px-8 flex justify-center"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl w-full">
        {/* HEADER */}
        <motion.div
          variants={titleVariant}
          className="text-center mb-20"
        >
          <h3
            className={`${oswald.className} text-[#ffc700] text-lg tracking-widest uppercase mb-4`}
          >
            A TRILHA
          </h3>

          <h2
            className={`${oswald.className} text-4xl md:text-6xl font-bold`}
          >
            SUA JORNADA NO{" "}
            <span className="text-[#ffc700] animate-text-glow">
              CONTAGION
            </span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={container}
        >
          {/* LINHA CENTRAL */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ffc700]/60 via-[#ffc700]/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={stepVariant}
              className={`relative flex items-start gap-6 mb-14 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* NÚMERO */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#ffc700]/10 border border-[#ffc700]/40 flex items-center justify-center z-10 backdrop-blur-sm">
                <span
                  className={`${oswald.className} text-[#ffc700] font-bold text-lg`}
                >
                  {step.num}
                </span>
              </div>

              {/* CARD */}
              <div
                className={`bg-neutral-800/70 backdrop-blur-md rounded-2xl p-6 flex-1 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,199,0,0.25)] ${
                  i % 2 !== 0 ? "md:text-right" : ""
                }`}
              >
                <h3
                  className={`${oswald.className} text-2xl text-[#ffc700] mb-2`}
                >
                  {step.title}
                </h3>

                <p
                  className={`${inter.className} text-neutral-300 text-sm leading-relaxed`}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}