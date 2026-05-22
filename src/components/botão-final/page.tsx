"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Swords } from "lucide-react";
import { inter, oswald } from "@/lib/fonts";

export default function Final() {

  /* ======================
     VARIANTS
  =======================*/

  // container controla delay automático dos filhos
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25, // entra um após o outro
      },
    },
  };

  // animação bottom -> up
  const fadeUp: Variants = {
    hidden: {
      y: 60,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center px-6 text-center bg-black text-white py-25">

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl flex flex-col items-center gap-8"
      >

        {/* SUBTÍTULO */}
        <motion.p
          variants={fadeUp}
          className={`${oswald.className}
          text-sm md:text-base
          uppercase tracking-[0.3em]
          text-[#ffc700]`}
        >
          Chegou o momento da decisão
        </motion.p>

        {/* TÍTULO */}
        <motion.h1
          variants={fadeUp}
          className={`${oswald.className}
          text-4xl md:text-6xl lg:text-7xl
          font-bold leading-tight`}
        >
          Você vai apenas resistir…
          <br />
          ou{" "}
          <span className="text-[#ffc700] relative inline-block group cursor-default animate-text-glow">
            escolher se fortalecer
            <span className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition duration-500 bg-[#D7AF3C]/40 rounded-lg"></span>
          </span>
          ?
        </motion.h1>

        {/* PARÁGRAFO */}
        <motion.p
          variants={fadeUp}
          className={`${inter.className}
          text-neutral-300 max-w-2xl text-base md:text-lg leading-relaxed`}
        >
          Início em <span className="text-[#ffc700] font-semibold">28 de agosto</span>.
          Um final de semana preparado para transformar sua caminhada.
          <span className="text-[#ffc700] font-semibold"> Vagas limitadas.</span>
        </motion.p>

        {/* BOTÃO */}
        <motion.div variants={fadeUp}>
          <Link href="/form">
            <button
              className={`
                ${inter.className}
                font-semibold
                bg-[#ffc700]
                text-white
                animate-button-glow
                px-10 py-5
                rounded-xl
                flex items-center gap-3
                text-lg
                transition-all duration-300
                hover:scale-110
                hover:shadow-[0_0_35px_rgba(215,175,60,0.7)]
                active:scale-95
              `}
            >
              <Swords size={22} />
              QUERO ME FORTALECER
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}