"use client"

import Hero from '@/components/hero/page';
import Contador from '@/components/contador/page'
import QuemSomos from '@/components/quem-somos/page'
import OQueTeEspera from '@/components/o-que-te-espera/page';
import Trilha from '@/components/trilha/page';
import Depoimentos from '@/components/depoimentos/page';
import Final from '@/components/botão-final/page';
import Footer from '@/components/rodape/page';
import { useEffect, useState } from "react"

export default function Home() {
   const [mensagem, setMensagem] = useState("Carregando...")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then(res => res.json())
      .then(data => {
        setMensagem(data.status)
      })
      .catch(() => {
        setMensagem("Erro ao conectar servidor")
      })
  }, [])

  return (
    <main>
      
      <Hero />
      <Contador/>
      <QuemSomos/>
      <OQueTeEspera/>
      <Trilha/>
      <Depoimentos/>
      <Final/>
      <Footer/>
    </main>
  );
}
