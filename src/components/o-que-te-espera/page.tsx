"use client";

import { motion, Variants } from "framer-motion";
import { inter, oswald } from "@/lib/fonts";
import {
  Music,
  BookOpen,
  Users,
  Heart,
  Sun,
  Flame,
} from "lucide-react";

export default function OQueTeEspera() {
  const cards = [
    {
      icon: <Music size={28} className="text-[#ffc700]" />,
      titulo: "Noites de Adoração",
      descricao:
        "Momentos intensos de louvor e adoração que tocam o coração e renovam a alma.",
    },
    {
      icon: <BookOpen size={28} className="text-[#ffc700]" />,
      titulo: "Pregações e Estudos",
      descricao:
        "Mensagens poderosas e ensinamentos bíblicos que desafiam e transformam.",
    },
    {
      icon: <Users size={28} className="text-[#ffc700]" />,
      titulo: "Atividades em Grupo",
      descricao:
        "Dinâmicas, jogos e desafios que fortalecem a comunidade e criam memórias.",
    },
    {
      icon: <Heart size={28} className="text-[#ffc700]" />,
      titulo: "Comunhão e Amizade",
      descricao:
        "Conexões genuínas com pessoas que compartilham da mesma fé e propósito.",
    },
    {
      icon: <Flame size={28} className="text-[#ffc700]" />,
      titulo: "Experiência Espiritual",
      descricao:
        "Momentos de oração e busca pela presença de Deus que marcam para sempre.",
    },
    {
      icon: <Sun size={28} className="text-[#ffc700]" />,
      titulo: "Momentos ao Ar Livre",
      descricao:
        "Atividades em meio à natureza que conectam corpo, mente e espírito.",
    },
  ];

  /* =========================
     VARIANTS (ANIMAÇÕES)
  ========================== */

  // Container geral (controla sequência)
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // um card após o outro
      },
    },
  };

  // Texto sobe
  const textVariant: Variants = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Card sobe individualmente
  const cardVariant: Variants = {
    hidden: { y: 80, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-8 py-15"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* SUBTITULO */}
      <motion.h3
        variants={textVariant}
        className={`${oswald.className} text-yellow-500 font-bold text-lg uppercase tracking-widest mb-2`}
      >
        O QUE TE ESPERA
      </motion.h3>

      {/* TITULO */}
      <motion.h1
        variants={textVariant}
        className={`${oswald.className} text-4xl md:text-5xl font-extrabold text-[#ffffff] mb-12`}
      >
        UMA NOITE{" "}
        <span className="text-[#ffc700] animate-text-glow">
          INESQUECÍVEL
        </span>
      </motion.h1>

      {/* GRID */}
      <motion.div
        className={`${inter.className} grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full`}
        variants={container}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            whileHover={{ y: -10 }}
            className="flex flex-col md:flex-row items-start gap-4 bg-neutral-800 p-6 rounded-xl shadow-lg"
          >
            <div>
              <p className="flex-shrink-0 mb-2">{card.icon}</p>

              <h4 className="text-xl font-bold text-[#ffc700] mb-2">
                {card.titulo}
              </h4>

              <p className="text-neutral-300 text-sm leading-relaxed">
                {card.descricao}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}