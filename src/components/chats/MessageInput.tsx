"use client";

import "./MessageInput.css";

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

    <div className="message-input-container">

      {archivo && (

        <div className="file-preview">

          <span>
            📎 {archivo.name}
          </span>

        </div>

      )}

      <div className="message-input-row">

        <button
          className="attach-button"
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
          className="message-input"
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {
              enviar();
            }

          }}
        />

        <button
          className="send-button"
          onClick={enviar}
        >
          ➤
        </button>

      </div>

    </div>

  );

}