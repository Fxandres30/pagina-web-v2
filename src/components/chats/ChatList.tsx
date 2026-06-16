"use client";

import { useState } from "react";
import "./ChatList.css";

type Message = {
  telefono: string;
  mensaje?: string;
  tipo?: string;
  from_me?: boolean;
  estado?: string;
  leido?: boolean;
  created_at?: string;
};

type Props = {
  chats: string[];
  messages: Message[];
  selected: string;
  onSelect: (telefono: string) => void;
  onNewChat: () => void;
};

export default function ChatList({
  chats,
  messages,
  selected,
  onSelect,
  onNewChat,
}: Props) {

  const [menuOpen, setMenuOpen] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const safeMessages =
    messages || [];

  const filteredChats = chats.filter(
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

      const texto = (
        telefono +
        " " +
        (ultimo?.mensaje || "")
      ).toLowerCase();

      return texto.includes(
        search.toLowerCase()
      );
    }
  );

  const handleArchive = (telefono: string) => {
  console.log("Archivar:", telefono);

  // aquí luego llamas tu API
};

const handleFavorite = (telefono: string) => {
  console.log("Favorito:", telefono);
};

const handleMute = (telefono: string) => {
  console.log("Silenciar:", telefono);
};

const handleDelete = (telefono: string) => {
  const ok = confirm(
    `¿Eliminar conversación ${telefono}?`
  );

  if (!ok) return;

  console.log("Eliminar:", telefono);
};

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2 className="chat-list-title">
          EFAAT CRM
        </h2>
        <button
  className="new-chat-btn"
  onClick={onNewChat}
>
  + Nueva conversación
</button>

        <div className="chat-list-count">
          {filteredChats.length} conversaciones
        </div>

        <input
          className="chat-search"
          placeholder="Buscar número o mensaje..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
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

const unreadCount =
  chatMessages.filter(
    (m) =>
      !m.from_me &&
      !m.leido
  ).length;

let preview =
  ultimo?.mensaje || "";

            switch (ultimo?.tipo) {
              case "image":
                preview = "🖼️ Imagen";
                break;
              case "audio":
                preview = "🎤 Audio";
                break;
              case "video":
                preview = "🎥 Video";
                break;
              case "sticker":
                preview = "😀 Sticker";
                break;
              case "document":
                preview = "📄 Documento";
                break;
            }

            if (ultimo?.from_me) {
              preview = "" + preview;
            }

            return (
  <div
    key={telefono}
    className={`chat-item ${
      selected === telefono
        ? "active"
        : ""
    }`}
    onClick={() =>
      onSelect(telefono)
    }
  >
    <div className="chat-avatar">
      {telefono.slice(-2)}
    </div>

    <div className="chat-content">

      <div className="chat-top">

        <strong className="chat-phone">
          {telefono}
        </strong>

        <div className="chat-right">

          <span className="chat-time">
            {ultimo?.created_at
              ? new Date(
                  ultimo.created_at
                ).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : ""}
          </span>

          <div className="chat-actions">

            <button
              className="chat-menu-btn"
              onClick={(e) => {
                e.stopPropagation();

                setMenuOpen(
                  menuOpen === telefono
                    ? null
                    : telefono
                );
              }}
            >
              ⋮
            </button>

            {menuOpen ===
              telefono && (
              <div
  className="chat-menu"
  onClick={(e) =>
    e.stopPropagation()
  }
>
  <button
    onClick={() =>
      handleArchive(telefono)
    }
  >
    📦 Archivar
  </button>

  <button
    onClick={() =>
      handleFavorite(telefono)
    }
  >
    ⭐ Favorito
  </button>

  <button
    onClick={() =>
      handleMute(telefono)
    }
  >
    🔕 Silenciar
  </button>

  <button
    onClick={() =>
      handleDelete(telefono)
    }
  >
    🗑 Eliminar
  </button>
</div>
            )}
          </div>

        </div>

      </div>

    <div className="chat-bottom">

  <div className="chat-preview">
    {preview}
  </div>

  {unreadCount > 0 ? (

    <div className="chat-badge">
      {unreadCount}
    </div>

  ) : (

    ultimo?.from_me && (
      <div
        className={`chat-status ${
          ultimo.estado === "read"
            ? "read"
            : ""
        }`}
      >
        {ultimo.estado === "sent" &&
          "✓"}

        {ultimo.estado ===
          "delivered" &&
          "✓✓"}

        {ultimo.estado ===
          "read" &&
          "✓✓"}
      </div>
    )

  )}

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