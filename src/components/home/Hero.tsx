"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import "@/styles/Hero.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/* 🔥 LO QUE REALMENTE DEVUELVE SUPABASE */

interface SupabaseRaffle {
  nombre: string;
  premio_principal: string;
  total_premios: string;
  precio: string;
  fecha_sorteo: string;
}

/* 🔥 LO QUE USA REACT */

interface ActiveRaffle {
  nombre: string;
  premio_principal: number;
  total_premios: number;
  precio: number;
  fecha_sorteo: string;
}

export default function Hero() {

  const [raffle, setRaffle] =
    useState<ActiveRaffle | null>(null);

  useEffect(() => {

    const fetchRaffle = async () => {

      const {
        data,
        error
      } = await supabase
        .from("sorteos")
        .select(`
          nombre,
          premio_principal,
          total_premios,
          precio,
          fecha_sorteo
        `)
        .eq("estado", "activo")
        .limit(1)
        .maybeSingle<SupabaseRaffle>();

      if (error) {

        console.error(error);

        return;
      }

      if (!data) return;

      // 🔥 CONVERTIR TIPOS
      setRaffle({

  nombre:
    data.nombre || "",

  premio_principal:
    Number(data.premio_principal || 0),

  total_premios:
    Number(data.total_premios || 0),

  precio:
    Number(data.precio || 0),

  fecha_sorteo:
    data.fecha_sorteo || ""

});
    };

    fetchRaffle();

  }, []);

  // ⏳ LOADING
  if (!raffle) {

    return (
      <section className="hero-loading">
        Cargando dinámica...
      </section>
    );
  }

  return (

    <section className={`
      hero
      ${montserrat.className}
    `}>

      {/* BADGE */}

      <div className="hero-badge">
        🔥 ACTIVO
      </div>

      {/* TITULO */}

      <h1 className="hero-title">

        {raffle.nombre}

      </h1>

      {/* PREMIO PRINCIPAL */}

      <div className="hero-principal">

        <span className="hero-principal-label">

          Premio principal

        </span>

        <h2 className="hero-principal-value">

          $
          {raffle.premio_principal
            .toLocaleString("es-CO")}

        </h2>

      </div>

      {/* STATS */}

      <div className="hero-stats">

        <div className="hero-stat-card">

          <span>
            🎉 Total premios
          </span>

          <strong>

            $
            {raffle.total_premios
              .toLocaleString("es-CO")}

          </strong>

        </div>

        <div className="hero-stat-card">

          <span>
            🎟️ Valor número
          </span>

          <strong>

            $
            {raffle.precio
              .toLocaleString("es-CO")}

          </strong>

        </div>

      </div>

  
      <div className="hero-date">

        ⏳ Sorteo:
        {" "}

        {
          raffle.fecha_sorteo
            ? new Date(
                raffle.fecha_sorteo
              ).toLocaleDateString(
                "es-CO",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }
              )
            : "Próximamente"
        }

      </div>
      
    </section>
  );
}