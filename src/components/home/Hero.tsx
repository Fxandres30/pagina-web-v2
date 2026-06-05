"use client";

import {
Flame,
Trophy,
Ticket,
CalendarDays,
BadgeDollarSign,
Dice5
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import "@/styles/Hero.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
subsets: ["latin"],
weight: ["400", "500", "600", "700", "800"],
});

interface SupabaseRaffle {
  nombre: string;
  premio_principal: string;
  invertido: string;
  precio: string;
  fecha_sorteo: string;
  loteria: string;
}

interface ActiveRaffle {
  nombre: string;
  premio_principal: number;
  invertido: number;
  precio: number;
  fecha_sorteo: string;
  loteria: string;
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
  invertido,
  precio,
  fecha_sorteo,
  loteria
`)
    .eq("estado", "activo")
    .limit(1)
    .maybeSingle<SupabaseRaffle>();

  if (error) {

    console.error(error);

    return;

  }

  if (!data) return;

  setRaffle({

  nombre: data.nombre || "",

  premio_principal:
    Number(data.premio_principal || 0),

  invertido:
    Number(data.invertido || 0),

  precio:
    Number(data.precio || 0),

  fecha_sorteo:
    data.fecha_sorteo || "",

  loteria:
    data.loteria || ""

});

};

fetchRaffle();

}, []);

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

  <div className="hero-badge">

    <Flame size={16} />

    ACTIVO

  </div>

  <h1 className="hero-title">

    {raffle.nombre}

  </h1>

  <div className="hero-principal">

    <span className="hero-principal-label">

      <Trophy size={18} />

      Premio principal

    </span>

    <h2 className="hero-principal-value">

      $
      {raffle.premio_principal
        .toLocaleString("es-CO")}

    </h2>

    <div className="hero-invested">

      <BadgeDollarSign size={18} />

      <span>
        Invertido
      </span>

      <strong>

        $
        {raffle.invertido
          .toLocaleString("es-CO")}

      </strong>

    </div>

  </div>

  <div className="hero-stats">

    <div className="hero-stat-card">

      <span>

        <Ticket size={16} />

        Valor número

      </span>

      <strong>

        $
        {raffle.precio
          .toLocaleString("es-CO")}

      </strong>

    </div>

  </div>

  <div className="hero-date">

  <CalendarDays size={18} />

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

{
  raffle.loteria && (

    <div className="hero-lottery">

      🎲 {raffle.loteria}

    </div>

  )
}

</section>


);

}
