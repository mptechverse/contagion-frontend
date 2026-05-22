"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, CreditCard, Users } from "lucide-react";
import { oswald, inter } from "@/lib/fonts";
import { motion, Variants } from "framer-motion";

export default function ContadorPage() {
  const dataEvento = new Date("2026-08-28T00:00:00");

  const calcularTempo = () => {
    const agora = new Date().getTime();
    const diferenca = dataEvento.getTime() - agora;

    if (diferenca <= 0) {
      return { meses: 0, dias: 0, minutos: 0, segundos: 0 };
    }

    const segundosTotal = Math.floor(diferenca / 1000);

    return {
      meses: Math.floor(segundosTotal / (60 * 60 * 24 * 30)),
      dias: Math.floor(
        (segundosTotal % (60 * 60 * 24 * 30)) / (60 * 60 * 24)
      ),
      minutos: Math.floor((segundosTotal % 3600) / 60),
      segundos: segundosTotal % 60,
    };
  };

  const [tempo, setTempo] = useState(calcularTempo());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo(calcularTempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  /* ================= ANIMAÇÕES ================= */

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 70 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="
        min-h-screen
        flex flex-col
        justify-center
        items-center
        bg-black
        text-white
        gap-10 sm:gap-16
        px-4 sm:px-8 md:px-15
        py-12 sm:py-16
        overflow-hidden
      "
    >
      {/* TITULO */}
      <motion.h1
        variants={fadeUp}
        className={`
          ${oswald.className}
          text-[32px]
          sm:text-[40px]
          md:text-[45px]
          font-bold
          text-[#ffc700]
          text-center
          leading-tight
        `}
      >
        CONTAGEM REGRESSIVA
      </motion.h1>

      {/* CONTADOR */}
      <motion.div
        variants={fadeUp}
        className={`
          ${oswald.className}
          flex
          gap-4 sm:gap-6
          flex-wrap
          justify-center
          items-center
          w-full
        `}
      >
        <Card valor={tempo.meses} label="MESES" />
        <Card valor={tempo.dias} label="DIAS" />
        <Card valor={tempo.minutos} label="MINUTOS" />
        <Card valor={tempo.segundos} label="SEGUNDOS" />
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={container}
        className={`
          ${inter.className}
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-5 sm:gap-8
          max-w-4xl
          w-full
          mt-4 sm:mt-8
        `}
      >
        <InfoCard
          icon={<Calendar size={32} className="text-[#ffc700]" />}
          titulo="28, 29 e 30 de Agosto"
          descricao="Sexta a Domingo"
        />

        <InfoCard
          icon={<MapPin size={32} className="text-[#ffc700]" />}
          titulo="Local de Saída"
          descricao="João Pessoa, PB"
        />

        <InfoCard
          icon={<CreditCard size={32} className="text-[#ffc700]" />}
          titulo="Valor do Evento"
          descricao="Aceitamos Pix, Cartão de Crédito e Débito"
        />

        <InfoCard
          icon={<Users size={32} className="text-[#ffc700]" />}
          titulo="Vagas Limitadas"
          descricao="Idade mínima 12 anos"
        />
      </motion.div>
    </motion.section>
  );
}

/* ================= CARD CONTADOR ================= */

function Card({
  valor,
  label,
}: {
  valor: number;
  label: string;
}) {
  return (
    <div
      className="
        w-28 h-28
        sm:w-32 sm:h-32
        md:w-36 md:h-36
        bg-neutral-900
        border border-neutral-700
        rounded-xl
        flex flex-col
        justify-center
        items-center
        shadow-lg
        flex-shrink-0
      "
    >
      <span
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
          text-[#ffc700]
        "
      >
        {valor.toString().padStart(2, "0")}
      </span>

      <span
        className="
          text-[10px]
          sm:text-xs
          md:text-sm
          tracking-widest
          text-neutral-400
        "
      >
        {label}
      </span>
    </div>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({
  icon,
  titulo,
  descricao,
}: {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 },
        },
      }}
      className="
        flex flex-col items-center gap-3
        bg-neutral-900
        px-4 sm:px-6
        py-5 sm:py-6
        rounded-xl
        shadow-lg
        text-center
        transform transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl
      "
    >
      {icon}

      <h3
        className="
          text-lg sm:text-xl
          font-bold
          text-[#ffc700]
          leading-snug
        "
      >
        {titulo}
      </h3>

      <p
        className="
          text-neutral-400
          text-sm
          leading-relaxed
        "
      >
        {descricao}
      </p>
    </motion.div>
  );
}