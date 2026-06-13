"use client";

import { useState } from "react";
import "./ChatList.css";

type Props = {
  chats: string[];
  messages: any[];
  selected: string;
  onSelect: (telefono: string) => void;
};

export default function ChatList({
  chats,
  messages,
  selected,
  onSelect
}: Props) {

  const [search, setSearch] =
    useState("");

  const safeMessages =
    messages || [];

  const filteredChats =
    chats.filter((telefono) => {

      const chatMessages =
        safeMessages.filter(
          (m) =>
            m.telefono === telefono
        );

      const ultimo =
        chatMessages[
          chatMessages.length - 1
        ];

      const texto =
        (
          telefono +
          " " +
          (ultimo?.mensaje || "")
        ).toLowerCase();

      return texto.includes(
        search.toLowerCase()
      );

    });

  return (

    <div className="chat-list">

      <div className="chat-list-header">

        <h2 className="chat-list-title">
          EFAAT CRM
        </h2>

        <div className="chat-list-count">
          {filteredChats.length}
          {" "}conversaciones
        </div>

        <input
          className="chat-search"
          placeholder="Buscar número o mensaje..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="chat-list-body">

        {filteredChats.map(
          (telefono) => {

            const chatMessages =
              safeMessages.filter(
                (m) =>
                  m.telefono === telefono
              );

            const ultimo =
              chatMessages[
                chatMessages.length - 1
              ];

            let preview =
              ultimo?.mensaje || "";

            if (
              ultimo?.tipo === "image"
            ) {
              preview =
                "🖼️ Imagen";
            }

            if (
              ultimo?.tipo === "audio"
            ) {
              preview =
                "🎤 Audio";
            }

            if (
              ultimo?.tipo === "video"
            ) {
              preview =
                "🎥 Video";
            }

            if (
              ultimo?.tipo === "sticker"
            ) {
              preview =
                "😀 Sticker";
            }

            if (
              ultimo?.tipo === "document"
            ) {
              preview =
                "📄 Documento";
            }

            if (
              ultimo?.from_me
            ) {
              preview =
                "✓ " + preview;
            }

            return (

              <div
                key={telefono}
                onClick={() =>
                  onSelect(
                    telefono
                  )
                }
                className={`chat-item ${
                  selected === telefono
                    ? "active"
                    : ""
                }`}
              >

                <div className="chat-avatar">
                  {telefono.slice(-2)}
                </div>

                <div className="chat-info">

                  <div className="chat-top">

                    <strong className="chat-phone">
                      {telefono}
                    </strong>

                    <span className="chat-time">

                      {ultimo?.created_at
                        ? new Date(
                            ultimo.created_at
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit"
                            }
                          )
                        : ""}

                    </span>

                  </div>

                  <div className="chat-preview">
                    {preview}
                  </div>

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}