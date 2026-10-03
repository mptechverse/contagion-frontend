"use client";

import { useEffect, useState } from "react";

const EVENTO_API_URL =
  "https://contagion-backend.onrender.com/api/inscricoes/evento/";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function possuiEventoAtivo(payload: unknown): boolean {
  const eventoUnico = !Array.isArray(payload);
  const eventos = eventoUnico ? [payload] : payload;

  return eventos.some((evento) => {
    if (!isRecord(evento) || typeof evento.data_evento !== "string") {
      return false;
    }

    if (Number.isNaN(Date.parse(evento.data_evento))) return false;

    return "ativo" in evento ? evento.ativo === true : eventoUnico;
  });
}

export function useEventoAtivo() {
  const [eventoAtivo, setEventoAtivo] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function verificarEvento() {
      try {
        const response = await fetch(EVENTO_API_URL);
        if (!response.ok) return;

        const payload: unknown = await response.json();
        if (mounted) setEventoAtivo(possuiEventoAtivo(payload));
      } catch {
        if (mounted) setEventoAtivo(false);
      }
    }

    void verificarEvento();

    return () => {
      mounted = false;
    };
  }, []);

  return eventoAtivo;
}