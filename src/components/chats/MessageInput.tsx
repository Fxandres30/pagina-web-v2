"use client";

import { useRef, useState } from "react";

type Props = {
  onSend: (
    mensaje: string,
    file?: File | null
  ) => void;
};

export default function MessageInput({
  onSend
}: Props) {

  const [mensaje, setMensaje] =
    useState("");

  const [archivo, setArchivo] =
    useState<File | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const enviar = () => {

    if (
      !mensaje.trim() &&
      !archivo
    ) {
      return;
    }

    onSend(
      mensaje,
      archivo
    );

    setMensaje("");
    setArchivo(null);

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }

  };

  return (

    <div
      style={{
        padding: 12,
        background: "#f0f2f5",
        borderTop:
          "1px solid #ddd"
      }}
    >

      {archivo && (

        <div
          style={{
            marginBottom: 8,
            padding: 8,
            background: "#fff",
            borderRadius: 8
          }}
        >
          📎 {archivo.name}
        </div>

      )}

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center"
        }}
      >

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          📎
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => {

            const file =
              e.target.files?.[0];

            if (file) {

              setArchivo(file);

            }

          }}
        />

        <input
          value={mensaje}
          onChange={(e) =>
            setMensaje(
              e.target.value
            )
          }
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1
          }}
        />

        <button
          onClick={enviar}
        >
          Enviar
        </button>

      </div>

    </div>

  );

}