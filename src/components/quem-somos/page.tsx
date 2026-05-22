"use client";

import { motion } from "framer-motion";
import { inter } from "@/lib/fonts";

export default function QuemSomos() {
  return (
    <div className="p-15 flex justify-center items-center bg-black text-white px-8">
      <div className="flex flex-col md:flex-row max-w-6xl w-full gap-8 items-center">

        {/* IMAGEM — esquerda → direita */}
        <motion.div
          className="md:w-1/2 w-full"
          initial={{ x: -120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/images/quemSomos.jpg"
            alt="Quem Somos"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </motion.div>

        {/* TEXTO — baixo → cima */}
        <motion.div
          className="md:w-1/2 w-full flex flex-col justify-center gap-4 text-left"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={`${inter.className} text-yellow-500 text-lg uppercase tracking-widest`}>
            Sobre o acampamento
          </h3>

          <h1 className={`${inter.className} text-4xl font-extrabold`}>
            O que é o Contagion Brasil?
          </h1>

          <p className={`${inter.className} text-base text-neutral-300 leading-relaxed`}>
            O Contagion existe para cumprir uma missão: refletir Jesus,
            viver o evangelho na prática e conduzir pessoas a um encontro
            real com Ele.
            <br /><br />
            Cada história transformada e cada testemunho vivo confirmam
            que Deus esteve no centro de tudo ao longo de todos esses anos.
          </p>
        </motion.div>

      </div>
    </div>
  );
}