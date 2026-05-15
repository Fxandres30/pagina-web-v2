"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import "@/styles/VerifySection.css";

interface Ticket {
  id: string;
  numero_boleto: string;
  estado: string;
  premiado: boolean;
  valor_premio: number;
}

interface ActiveRaffle {
  id: string;
  digitos: number;
}

export default function VerifySection() {

  const [query, setQuery] = useState("");

  const [tickets, setTickets] =
    useState<Ticket[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const [raffle, setRaffle] =
    useState<ActiveRaffle | null>(null);

  const handleVerify = async () => {

    const cleanQuery = query.trim();

    if (!cleanQuery) return;

    try {

      setLoading(true);

      // 🔥 BUSCAR EVENTO ACTIVO
      const {
        data: activeRaffle,
        error: raffleError
      } = await supabase
        .from("sorteos")
        .select(`
          id,
          digitos
        `)
        .eq("estado", "activo")
        .limit(1)
        .maybeSingle();

      if (raffleError) {

        console.error(raffleError);

        return;
      }

      if (!activeRaffle) {

        alert("No hay sorteos activos.");

        return;
      }

      setRaffle(activeRaffle);

      // 🔥 BUSCAR NÚMEROS
      const {
        data,
        error
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
        .or(
          `telefono.eq.${cleanQuery},email.eq.${cleanQuery}`
        )
        .order("numero_boleto");

      if (error) {

        console.error(error);

        return;
      }

      setTickets(data || []);

      setSearched(true);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <section className="verify-container">

      <div className="verify-box">

        <h2 className="verify-title">
          🔍 Verifica tus números
        </h2>

        <p className="verify-description">

          Consulta tus números usando
          tu teléfono o correo.

        </p>

        <input
          type="text"
          placeholder="Teléfono o correo"
          className="verify-input"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <button
          className="verify-button"
          onClick={handleVerify}
        >

          {
            loading
              ? "Consultando..."
              : "Consultar números"
          }

        </button>

      </div>

      {/* RESULTADOS */}

      {searched && (

        <div className="verify-results">

          {tickets.length === 0 ? (

            <div className="verify-empty">

              No encontramos números asociados.

            </div>

          ) : (

            <>

              <div className="verify-total">

                🎟️ Números encontrados:
                {" "}
                {tickets.length}

              </div>

              <div className="verify-grid">

                {tickets.map((ticket) => {

                  const formattedNumber = String(
                    ticket.numero_boleto
                  ).padStart(
                    raffle?.digitos || 4,
                    "0"
                  );

                  return (

                    <div
                      key={ticket.id}
                      className={`
                        verify-ticket
                        ${
                          ticket.premiado
                            ? "winner"
                            : ""
                        }
                      `}
                    >

                      <div className="verify-badge">

                        {
                          ticket.premiado
                            ? "GANADOR"
                            : ticket.estado.toUpperCase()
                        }

                      </div>

                      <span className="verify-number">

                        {formattedNumber}

                      </span>

                      {ticket.premiado && (

                        <span className="verify-prize">

                          🏆 $

                          {Number(
                            ticket.valor_premio
                          ).toLocaleString("es-CO")}

                        </span>

                      )}

                    </div>

                  );
                })}

              </div>

            </>
            

          )}

        </div>

      )}

    </section>

  );
}