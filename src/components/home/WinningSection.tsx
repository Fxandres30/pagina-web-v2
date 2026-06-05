"use client";

import {
  Trophy,
  Gift,
  Ticket,
  BadgeDollarSign
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import "@/styles/WinningSection.css";

interface WinnerTicket {
  id: string;
  numero_boleto: string;
  estado: string;
  premiado: boolean;
  valor_premio: number;
}

interface ActiveRaffle {
  id: string;
  nombre: string;
  digitos: number;
}

const WinningNumbers: React.FC = () => {

  const [winners, setWinners] =
    useState<WinnerTicket[]>([]);

  const [raffle, setRaffle] =
    useState<ActiveRaffle | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        // 🔥 BUSCAR SORTEO ACTIVO
        const {
          data: activeRaffle,
          error: raffleError
        } = await supabase
          .from("sorteos")
          .select(`
            id,
            nombre,
            digitos
          `)
          .eq("estado", "activo")
          .limit(1)
          .maybeSingle();

        // ❌ ERROR
        if (raffleError) {

          console.error(
            "❌ Error obteniendo sorteo:",
            raffleError
          );

          return;
        }

        // ⚠️ NO EXISTE
        if (!activeRaffle) {

          console.warn(
            "⚠️ No hay sorteos activos"
          );

          setRaffle(null);
          setWinners([]);

          return;
        }

        // ✅ GUARDAR SORTEO
        setRaffle(activeRaffle);

        // 🔥 BUSCAR PREMIADOS
        const {
          data: winnersData,
          error: winnersError
        } = await supabase
          .from("boletos")
          .select(`
            id,
            numero_boleto,
            estado,
            premiado,
            valor_premio
          `)
          .eq("sorteo_id", activeRaffle.id)
          .eq("premiado", true)
          .order("valor_premio", {
            ascending: false
          });

        if (winnersError) {

          console.error(
            "❌ Error obteniendo ganadores:",
            winnersError
          );

          return;
        }

        // ✅ GUARDAR PREMIADOS
        setWinners(winnersData || []);

      } catch (error) {

        console.error(
          "❌ Error inesperado:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    // 🚀 SOLO CARGA UNA VEZ
    fetchData();

  }, []);

  // ⏳ LOADING
  if (loading) {
    

    return (
      <div className="loading-box">
        Cargando números premiados...
      </div>
    );
  }

  // ⚠️ NO HAY EVENTO
  if (!raffle) {

    return (
      <div className="loading-box">
        No hay dinamica activa.
      </div>
    );
  }

  return (

    <section className="winning-wrapper">

      <div className="winning-header">

        <h2 className="winning-numbers-title">

  <Trophy size={28} />

  Tarjetas Bendecidas

</h2>

        <p className="winning-numbers-dinamica">
          {raffle.nombre}
        </p>

        <div className="winning-stats">

          <span>

  <Gift size={20} />

  Bendecidos: {winners.length}

</span>

        </div>

      </div>

      <div className="winning-numbers-container">

        {winners.length === 0 ? (

          <div className="loading-box">
            Aún no hay números premiados.
          </div>

        ) : (

          winners.map((winner) => {

            const formattedNumber = String(
              winner.numero_boleto
            ).padStart(
              raffle.digitos,
              "0"
            );

            return (

              <div
                key={winner.id}
                className={`
                  winning-ticket
                  ${
                    winner.estado === "vendido"
                      ? "vendido"
                      : "disponible"
                  }
                `}
              >

                <div className="ticket-badge">

                  {
                    winner.estado === "vendido"
                      ? "VENDIDO"
                      : "DISPONIBLE"
                  }

                </div>

                <span className="ticket-number">
                  {formattedNumber}
                </span>

                <span className="ticket-prize">

                  $
                  {Number(
                    winner.valor_premio || 0
                  ).toLocaleString("es-CO")}

                </span>

              </div>

            );
          })

        )}

      </div>

    </section>

  );
};

export default WinningNumbers;