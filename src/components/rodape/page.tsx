import Image from "next/image"
import { inter, oswald } from "@/lib/fonts"

export default function Footer() {
  return (
    <footer className=" w-full bg-black text-white border-t border-[#f5f5f526] px-6 py-10 flex justify-center">
      <div className="max-w-6xl w-full flex  items-center gap-6 text-center justify-between">

        {/* LOGO + NOME */}
        <div className="flex items-center gap-3">
          <Image src="/images/logo/logoico.PNG" alt="Contagion Brasil" width={40} height={40} className="object-contain" />
          <h2 className={`${oswald.className} text-xl md:text-2xl font-bold tracking-wide`}>
            CONTAGION BRASIL
          </h2>
        </div>

        {/* FRASE */}
        <p className={`${inter.className} text-neutral-300 text-xs md:text-base `}>
          CONTAGION 2026 — O amor que contagia.
        </p>

        {/* DIREITOS */}
        <p className={`${inter.className} text-neutral-500 text-xs`}>
          &copy; Todos os direitos reservados
        </p>

      </div>
    </footer>
  )
}