import Image from "next/image"
import { inter, oswald } from "@/lib/fonts"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-[#f5f5f526] px-6 py-10 flex justify-center">
      <div className="max-w-6xl w-full">

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left justify-between">

          {/* LOGO + NOME */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/logoico.PNG"
              alt="Contagion Brasil"
              width={40}
              height={40}
              className="object-contain"
            />

            <h2
              className={`${oswald.className} text-xl md:text-2xl font-bold tracking-wide`}
            >
              CONTAGION BRASIL
            </h2>
          </div>

          {/* FRASE */}
          <p
            className={`${inter.className} text-neutral-300 text-xs md:text-base`}
          >
            CONTAGION 2026 — O amor que contagia.
          </p>

          {/* DIREITOS */}
          <p
            className={`${inter.className} text-neutral-500 text-xs`}
          >
            &copy; Todos os direitos reservados
          </p>

        </div>

        {/* LINHA + FEITO POR */}
        <div className="mt-8 pt-5 border-t border-gray-400/30 text-center">
          <p
            className={`${inter.className} text-sm text-neutral-500`}
          >
            Feito por{" "}
            <a
              href="https://site-mp-rah7.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 font-medium transition-colors duration-300 hover:text-white"
            >
              MP Technologies
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}