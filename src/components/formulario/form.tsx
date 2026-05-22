"use client";

import { useForm } from "react-hook-form";

export default function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        {...register("nome", { required: "Nome obrigatório" })}
        placeholder="Nome"
      />
      {errors.nome && <p>{errors.nome.message as string}</p>}

      <input
        {...register("email", { required: "Email obrigatório" })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message as string}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
}