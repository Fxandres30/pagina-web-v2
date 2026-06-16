"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase";

interface Message {

  id: number;

  telefono: string;

  mensaje: string;

  from_me: boolean;

  created_at: string;

}

export default function AdminPage() {

  const [
    mensajes,
    setMensajes,
  ] = useState<Message[]>([]);

  useEffect(() => {

    obtenerMensajes();

  }, []);

  async function obtenerMensajes() {

    try {

      const {
        data,
        error,
      } = await supabase
        .from("messages")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        console.error(
          error
        );

        return;

      }

      setMensajes(
        data || []
      );

    } catch (err) {

      console.error(
        err
      );

    }

  }

  return (

    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#111b21",
        color: "white",
      }}
    >

      <h1>
        WhatsApp Inbox
      </h1>

      <p>
        {
          mensajes.length
        } mensajes
      </p>

      {

        mensajes.map(
          (msg) => (

            <div
              key={msg.id}
              style={{

                background:
                  "#202c33",

                border:
                  "1px solid #2a3942",

                borderRadius:
                  "12px",

                padding:
                  "14px",

                marginBottom:
                  "12px",

              }}
            >

              <div
                style={{
                  fontWeight:
                    "bold",
                  marginBottom:
                    "6px",
                }}
              >
                {
                  msg.telefono
                }
              </div>

              <div>
                {
                  msg.mensaje
                }
              </div>

              <div
                style={{
                  marginTop:
                    "8px",

                  fontSize:
                    "12px",

                  color:
                    "#8696a0",
                }}
              >
                {
                  new Date(
                    msg.created_at
                  ).toLocaleString(
                    "es-CO"
                  )
                }
              </div>

            </div>

          )
        )

      }

    </div>

  );

}