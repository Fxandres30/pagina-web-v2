"use client";

import { useState } from "react";

type Props = {
  onSend: (
    mensaje: string
  ) => void;
};

export default function MessageInput({
  onSend
}: Props) {

  const [mensaje, setMensaje] =
    useState("");

  const enviar = () => {

    if (!mensaje.trim())
      return;

    onSend(mensaje);

    setMensaje("");

  };

  return (

    <div
      style={{
        padding: 12,
        background: "#f0f2f5",
        borderTop:
          "1px solid #ddd",
        display: "flex",
        gap: 10,
        alignItems: "center"
      }}
    >

      <input

        value={mensaje}

        onChange={(e) =>
          setMensaje(
            e.target.value
          )
        }

        onKeyDown={(e) => {

          if (
            e.key === "Enter"
          ) {
            enviar();
          }

        }}

        placeholder="Escribe un mensaje..."

        style={{
          flex: 1,
          padding: 12,
          borderRadius: 25,
          border:
            "1px solid #ddd",
          outline: "none",
          fontSize: 14
        }}

      />

      <button

        onClick={enviar}

        style={{
          background:
            "#25D366",
          color: "#fff",
          border: "none",
          borderRadius: 25,
          padding:
            "12px 20px",
          cursor: "pointer",
          fontWeight: 600
        }}

      >

        Enviar

      </button>

    </div>

  );

}