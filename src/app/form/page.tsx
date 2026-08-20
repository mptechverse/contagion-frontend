"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { inter, oswald } from "@/lib/fonts";

export default function Formulario() {

  const [copiado, setCopiado] = useState(false);

  const chavePix = "contagion@pix.com.br";

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const participaIgreja = watch("igreja");

  const tipoSelecionado = watch("tipo");

  const valorInscricao =
    tipoSelecionado === "servo"
      ? "R$ 100,00"
      : tipoSelecionado === "primeira_vez"
      ? "R$ 150,00"
      : "Selecione o tipo de inscrição";

  async function copiarPix() {

    try {

      await navigator.clipboard.writeText(chavePix);

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);

    } catch (error) {

      console.error(error);

      alert("Erro ao copiar chave PIX");
    }
  }

  async function onSubmit(data: any) {

    try {

      const response = await fetch(
        "https://contagion-backend.onrender.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            tipo: data.tipo,

            nome_completo: data.nome,

            data_nascimento: data.nascimento,

            telefone: data.telefone,

            email: data.email,

            igreja: data.igreja
              ? data.nomeIgreja
              : "",

            cidade: data.cidade,

            estado: data.estado,

            quer_servir: data.querServir || false,

            tamanho_camisa: data.camisa,

            participa_igreja: data.igreja || false,

            pastor_lider: data.lider || "",

            telefone_lider: data.telefoneLider || "",

            tempo_igreja: data.tempoIgreja || "",

            responsavel_nome: data.emergenciaNome,

            telefone_responsavel: data.emergenciaTel,

            parentesco: data.relacao || "",

            alergias: data.alergias || "",

            doencas_pre_existentes: data.doencas || "",

            medicamentos_continuos: data.medicamentos || "",

            restricoes_alimentares: data.restricoes || "",

            observacoes_medicas: data.obsMedicas || "",

            como_conheceu: data.origem || "",

            autoriza_imagem: data.imagem || false,

          }),
        }
      );

      if (!response.ok) {

        const erro = await response.json();

        console.log(erro);

        alert("Erro ao enviar inscrição");

        return;
      }

      const resultado = await response.json();

      console.log(resultado);

      alert("Inscrição realizada com sucesso!");

    } catch (error) {

      console.error(error);

      alert("Erro na conexão com o servidor");
    }
  }

  /* ======================
     ANIMAÇÕES
  =======================*/

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /* ======================
     INPUT STYLE PADRÃO
  =======================*/

  const input =
    "w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ffc700] transition";

  const label = "text-sm text-neutral-300 mb-1";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto flex flex-col gap-10"
      >

        {/* VOLTAR */}
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-[#ffc700] transition"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>
        </motion.div>

        {/* HEADER */}
        <motion.div variants={fadeUp} className="text-center">

          <h1 className={`${oswald.className} text-4xl md:text-6xl font-bold`}>
            CONFIRME SUA <span className="text-[#ffc700]">INSCRIÇÃO</span>
          </h1>

          <p className={`${inter.className} text-neutral-400 mt-4`}>
            Preencha os dados abaixo para garantir sua vaga no Acampamento
          </p>

        </motion.div>

        {/* ======================
           DADOS PESSOAIS
        =======================*/}

        <motion.div
          variants={fadeUp}
          className="bg-neutral-800/60 p-8 rounded-2xl space-y-6"
        >

          <h2 className={`${oswald.className} text-2xl text-[#ffc700]`}>
            Dados pessoais
          </h2>

          {/* NOME */}
          <div>
            <label className={label}>
              Nome completo *
            </label>

            <input
              {...register("nome", { required: true })}
              className={input}
            />
          </div>

          {/* NASCIMENTO / TELEFONE / EMAIL */}
          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className={label}>
                Data de nascimento *
              </label>

              <input
                type="date"
                {...register("nascimento", { required: true })}
                className={input}
              />
            </div>

            <div>
              <label className={label}>
                Telefone *
              </label>

              <input
                {...register("telefone", { required: true })}
                className={input}
              />
            </div>

            <div>
              <label className={label}>
                Email *
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                className={input}
              />
            </div>

          </div>

          {/* CIDADE / ESTADO / CAMISA */}
          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className={label}>
                Cidade *
              </label>

              <input
                {...register("cidade", { required: true })}
                className={input}
                placeholder="Sua cidade"
              />
            </div>

            <div>
              <label className={label}>
                Estado *
              </label>

              <select
                {...register("estado", { required: true })}
                className={input}
                defaultValue=""
              >

                <option value="" disabled>
                  Selecione
                </option>

                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>

              </select>
            </div>

            <div>
              <label className={label}>
                Tamanho da camisa *
              </label>

              <select
                {...register("camisa", { required: true })}
                className={input}
                defaultValue=""
              >

                <option value="" disabled>
                  Selecione
                </option>

                <option value="PP">PP</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="XG">XG</option>

              </select>
            </div>

          </div>

          {/* TIPO */}
          <div>

            <label className={label}>
              Tipo de inscrição *
            </label>

            <select
              {...register("tipo", { required: true })}
              className={input}
              defaultValue=""
            >

              <option value="" disabled>
                Selecione
              </option>

              <option value="primeira_vez">
                Primeira vez
              </option>

              <option value="servo">
                Servo
              </option>

            </select>

          </div>

          {/* QUER SERVIR */}
          <label className="flex gap-3 items-center">

            <input
              type="checkbox"
              {...register("querServir")}
            />

            Deseja servir durante o evento?

          </label>

          {/* CHECK IGREJA */}
          <label className="flex gap-3 items-center">

            <input
              type="checkbox"
              {...register("igreja")}
            />

            Faz parte de uma igreja ou comunidade local?

          </label>

          {/* CAMPOS CONDICIONAIS */}
          {participaIgreja && (

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >

              <div>

                <label className={label}>
                  Nome da igreja
                </label>

                <input
                  {...register("nomeIgreja")}
                  className={input}
                />

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className={label}>
                    Pastor / Líder
                  </label>

                  <input
                    {...register("lider")}
                    className={input}
                  />

                </div>

                <div>

                  <label className={label}>
                    Telefone do líder
                  </label>

                  <input
                    {...register("telefoneLider")}
                    className={input}
                  />

                </div>

              </div>

              <div>

                <label className={label}>
                  Há quanto tempo participa?
                </label>

                <input
                  {...register("tempoIgreja")}
                  className={input}
                />

              </div>

            </motion.div>
          )}

        </motion.div>

        {/* ======================
           INFORMAÇÕES ADICIONAIS
        =======================*/}

        <motion.div
          variants={fadeUp}
          className="bg-neutral-800/60 p-8 rounded-2xl space-y-6"
        >

          <h2 className={`${oswald.className} text-2xl text-[#ffc700]`}>
            Informações adicionais
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              placeholder="Contato emergência (nome) *"
              {...register("emergenciaNome", { required: true })}
              className={input}
            />

            <input
              placeholder="Telefone emergência *"
              {...register("emergenciaTel", { required: true })}
              className={input}
            />

            <select
              {...register("relacao")}
              className={input}
              defaultValue=""
            >

              <option value="" disabled>
                Selecione
              </option>

              <option>Pai</option>
              <option>Mãe</option>
              <option>Responsável legal</option>
              <option>Parente</option>
              <option>Amigo</option>
              <option>Líder</option>
              <option>Outro</option>

            </select>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Alergias"
              {...register("alergias")}
              className={input}
            />

            <input
              placeholder="Doenças pré-existentes"
              {...register("doencas")}
              className={input}
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Medicamentos contínuos"
              {...register("medicamentos")}
              className={input}
            />

            <input
              placeholder="Restrições alimentares"
              {...register("restricoes")}
              className={input}
            />

          </div>

          <textarea
            placeholder="Observações médicas"
            {...register("obsMedicas")}
            className={`${input} min-h-[120px]`}
          />

          <select
            {...register("origem")}
            className={input}
            defaultValue=""
          >

            <option value="" disabled>
              Como conheceu o CONTAGION 2026?
            </option>

            <option>Instagram</option>
            <option>Igreja</option>
            <option>Amigo</option>
            <option>Líder</option>
            <option>Grupo de WhatsApp</option>
            <option>Outro</option>

          </select>

        </motion.div>

        

        {/* ======================
           PAGAMENTO
        =======================*/}

        <motion.div
          variants={fadeUp}
          className="bg-neutral-800/60 p-8 rounded-2xl space-y-6 border border-[#ffc700]/20"
        >

          <h2 className={`${oswald.className} text-2xl text-[#ffc700]`}>
            Pagamento da inscrição
          </h2>

          <div className="  rounded-xl p-6 space-y-6">

            <div>

              <p className="text-neutral-300 leading-relaxed">
                Mande o valor correspondente da inscrição para o PIX abaixo:
              </p>

            </div>

            <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">

              <p className="text-sm text-neutral-400 mb-2">
                Valor da inscrição
              </p>

              <p className="text-3xl font-bold text-[#ffc700]">
                {valorInscricao}
              </p>

            </div>

            <div>

              <p className="text-sm text-neutral-400 mb-2">
                Chave PIX
              </p>

              <div className="flex flex-col md:flex-row gap-3">

                <div
                  className="
                    flex-1
                    bg-neutral-900
                    border
                    border-neutral-700
                    rounded-lg
                    px-4
                    py-3
                    break-all
                  "
                >
                  {chavePix}
                </div>

                <button
                  type="button"
                  onClick={copiarPix}
                  className="
                    bg-[#ffc700]
                    text-black
                    font-bold
                    px-5
                    py-3
                    rounded-lg
                    hover:scale-105
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  {copiado ? (
                    <>
                      <Check size={18} />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copiar
                    </>
                  )}

                </button>

              </div>

            </div>

            <div className="bg-[#ffc700]/10 border border-[#ffc700]/20 rounded-xl p-4">

              <p className="text-neutral-200 leading-relaxed">
               Após realizar o pagamento, envie:<br/>
                • o comprovante<br/>
                • seu nome completo<br/><br/>

                para o número abaixo:
              </p>

              <p className="text-[#ffc700] font-bold mt-2 text-lg">
                (83) 91234-5678
              </p>

            </div>

          </div>

        </motion.div>

        {/* AUTORIZAÇÕES */}
        <motion.div
          variants={fadeUp}
          className="space-y-3"
        >

          <label className="flex gap-3">

            <input
              type="checkbox"
              {...register("termos")}
              required
            />

            Aceito os termos de participação e autorizo o uso dos dados fornecidos.

          </label>

          <label className="flex gap-3">

            <input
              type="checkbox"
              {...register("imagem")}
            />

            Autorizo o uso da minha imagem em fotos e vídeos.

          </label>

        </motion.div>
        {/* BOTÃO */}
        <motion.button
          variants={fadeUp}
          type="submit"
          className={`
            ${inter.className}
            bg-[#ffc700]
            text-black
            py-[20px]
            px-[40px]
            rounded-xl
            font-bold
            text-lg
            hover:scale-105
            transition
          `}
        >
          GARANTIR MINHA VAGA
        </motion.button>


      </motion.form>
    </div>
  );
}