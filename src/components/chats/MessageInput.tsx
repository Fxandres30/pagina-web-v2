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

  return (
    <div
      style={{
        padding: 10,
        borderTop:
          "1px solid #ddd"
      }}
    >
      <input
        value={mensaje}
        onChange={(e) =>
          setMensaje(
            e.target.value
          )
        }
        placeholder="Escribe..."
        style={{
          width: "80%",
          padding: 10
        }}
      />

      <button
        onClick={() => {
          onSend(mensaje);
          setMensaje("");
        }}
      >
        Enviar
      </button>
    </div>
  );
}