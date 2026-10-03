"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, CreditCard, Users } from "lucide-react";
import { oswald, inter } from "@/lib/fonts";
import { motion, Variants } from "framer-motion";

const EVENTO_API_URL =
  "https://contagion-backend.onrender.com/api/inscricoes/evento/";

function extrairDataEvento(payload: unknown): Date | null {
  const evento = Array.isArray(payload)
    ? payload.find(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "ativo" in item &&
          item.ativo === true
      )
    : payload;

  if (
    typeof evento !== "object" ||
    evento === null ||
    !("data_evento" in evento) ||
    typeof evento.data_evento !== "string"
  ) {
    return null;
  }

  const data = new Date(evento.data_evento);
  return Number.isNaN(data.getTime()) ? null : data;
}

export default function ContadorPage() {
  const [mounted, setMounted] = useState(false);
  const [dataEvento, setDataEvento] = useState<Date | null>(null);
  const [erroEvento, setErroEvento] = useState(false);
  const [eventoIndisponivel, setEventoIndisponivel] = useState(false);
  const [tempo, setTempo] = useState({
    meses: 0,
    dias: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    let ativo = true;
    setMounted(true);

    async function carregarEvento() {
      try {
        const response = await fetch(EVENTO_API_URL);
        if (response.status === 404) {
          if (ativo) setEventoIndisponivel(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`Erro ao buscar evento: ${response.status}`);
        }

        const data = extrairDataEvento(await response.json());
        if (!data) {
          throw new Error("A API não retornou uma data de evento válida.");
        }

        if (ativo) setDataEvento(data);
      } catch (error) {
        console.error(error);
        if (ativo) setErroEvento(true);
      }
    };

    void carregarEvento();

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!dataEvento) return;

    const atualizarContador = () => {
      const diferenca = dataEvento.getTime() - Date.now();
      const segundosTotal = Math.max(0, Math.floor(diferenca / 1000));

      setTempo({
        meses: Math.floor(segundosTotal / (60 * 60 * 24 * 30)),
        dias: Math.floor(
          (segundosTotal % (60 * 60 * 24 * 30)) / (60 * 60 * 24)
        ),
        minutos: Math.floor((segundosTotal % 3600) / 60),
        segundos: segundosTotal % 60,
      });
    };

    atualizarContador();
    const intervalo = setInterval(atualizarContador, 1000);
    return () => clearInterval(intervalo);
  }, [dataEvento]);

  /* ================= EVITA HYDRATION ERROR ================= */

  if (!mounted) return null;

  /* ================= ANIMAÇÕES ================= */

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 70 },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
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
        {dataEvento ? (
          <>
            <Card valor={tempo.meses} label="MESES" />
            <Card valor={tempo.dias} label="DIAS" />
            <Card valor={tempo.minutos} label="MINUTOS" />
            <Card valor={tempo.segundos} label="SEGUNDOS" />
          </>
        ) : (
          <p className="text-neutral-400">
            {erroEvento
              ? "Não foi possível carregar a data do evento."
              : eventoIndisponivel
                ? "EM BREVE"
                : "Carregando data do evento..."}
          </p>
        )}
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
          titulo={
            dataEvento
              ? new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  timeZone: "America/Sao_Paulo",
                }).format(dataEvento)
              : eventoIndisponivel
                ? "EM BREVE"
                : "Data do evento"
          }
          descricao={
            eventoIndisponivel
              ? "Aguarde a divulgação da próxima data"
              : "Data definida para o evento"
          }
        />

        <InfoCard
          icon={<MapPin size={32} className="text-[#ffc700]" />}
          titulo="Local de Saída"
          descricao="João Pessoa, PB"
        />

        <InfoCard
          icon={<CreditCard size={32} className="text-[#ffc700]" />}
          titulo="Pagamento do Evento"
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

          transition: {
            duration: 0.6,
          },
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