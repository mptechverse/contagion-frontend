"use client";

import { inter, oswald } from "@/lib/fonts";
import Link from "next/link";
import { Flame } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {

  // animação individual (baixo → cima)
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // animação em sequência
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center text-center overflow-hidden">

      {/* IMAGEM */}
      <div className="absolute inset-0 bg-[url('/images/fundoHero1.jpg')] bg-cover bg-center bg-no-repeat" />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-20% to-transparent" />

      {/* CONTEÚDO */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="
          relative z-10
          flex flex-col
          items-center
          justify-center
          gap-3
          h-auto
          w-full
          max-w-[900px]
          px-6 sm:px-8
          text-center
          mx-auto
        "
      >
        {/* SUBTITULO TOPO */}
        <motion.h2
          variants={fadeUp}
          className={`
            ${inter.className}
            text-sm sm:text-base
            font-normal
            text-neutral-400
            tracking-[0.3em]
            mb-4 sm:mb-[20px]
          `}
        >
          CONTAGION BRASIL 2026
        </motion.h2>

        {/* TITULO */}
        <motion.h1
          variants={fadeUp}
          className={`
            ${oswald.className}
            text-[56px]
            sm:text-[80px]
            md:text-[128px]
            font-bold
            text-[#ffc700]
            leading-none
            w-full
            max-w-[700px]
            mx-auto
            mb-3 sm:mb-[10px]
            animate-text-glow
          `}
        >
          O AMOR CONTAGIA
        </motion.h1>

        {/* SUBTITULO */}
        <motion.h2
          variants={fadeUp}
          className={`
            ${inter.className}
            text-[16px]
            sm:text-[18px]
            md:text-[22px]
            text-neutral-300
            w-full
            mb-6 sm:mb-[32px]
            leading-relaxed
          `}
        >
          VENHA SER CONTAGIADO PELO AMOR DE DEUS.
        </motion.h2>

        {/* BOTÃO */}
        <motion.div
          variants={fadeUp}
          className="w-full flex justify-center"
        >
          <Link href="/form" className="w-full sm:w-auto">
            <button
              className={`
                ${inter.className}
                font-bold
                text-white
                bg-[#ffc700]
                w-full sm:w-auto
                px-6 sm:px-[40px]
                py-4 sm:py-[20px]
                flex items-center justify-center
                gap-3
                rounded-lg
                hover:opacity-90
                transition
                mb-6 sm:mb-[30px]
                animate-float
                animate-button-glow
                text-sm sm:text-base
              `}
            >
              <Flame size={22} />
              QUERO VIVER MEU MELHOR FINAL DE SEMANA!
            </button>
          </Link>
        </motion.div>

        {/* DATA */}
        <motion.p
          variants={fadeUp}
          className={`
            ${inter.className}
            text-sm sm:text-base
            text-neutral-400
            tracking-[0.25em]
          `}
        >
          28, 29 E 30 DE AGOSTO
        </motion.p>
      </motion.div>
    </div>
  );
}