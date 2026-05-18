"use client";

import {
  useEffect,
  useState
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
    setMensajes

  ] = useState<Message[]>([]);

  useEffect(() => {

    obtenerMensajes();

  }, []);

  async function obtenerMensajes() {

    const {

      data

    } = await supabase

      .from("messages")

      .select("*")

      .order(
        "created_at",
        {
          ascending: true
        }
      );

    setMensajes(
      data || []
    );

  }

  return (

    <div
      style={{
        padding: 20
      }}
    >

      <h1>
        WhatsApp Inbox
      </h1>

      {

        mensajes.map(

          (msg) => (

            <div

              key={msg.id}

              style={{

                marginBottom: 12,

                padding: 12,

                border:
                  "1px solid #ccc",

                borderRadius: 10

              }}

            >

              <strong>
                {msg.telefono}
              </strong>

              <p>
                {msg.mensaje}
              </p>

            </div>

          )

        )

      }

    </div>

  );

}