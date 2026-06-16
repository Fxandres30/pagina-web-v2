"use client";

import "./ChatWindow.css";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ReactionBubble from "./ReactionBubble";

type Props = {
  messages: any[];
  selected?: string;
  cliente?: any;
  onBack?: () => void;
};

export default function ChatWindow({
  messages,
  selected,
  cliente,
  onBack,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

    const [showContact, setShowContact] =
  useState(false);

  const images = messages
    .filter((m) => m.tipo === "image")
    .map((m) =>
      m.media_id
        ? `https://efaat.com/media/${m.media_id}`
        : m.media_url
    )
    .filter(Boolean);

  useEffect(() => {
    if (firstLoad.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
      });

      firstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    if (!messages.length) return;

    const lastMessage =
      messages[messages.length - 1];

    if (!lastMessage.from_me) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="chat-window">
        {/* HEADER */}
        <div className="chat-header">
          <button
            className="back-button"
            onClick={onBack}
          >
            ←
          </button>

          <div className="chat-header-avatar">
            {selected
              ? selected.slice(-2)
              : "💬"}
          </div>

          <div className="chat-header-info">
            <div className="chat-header-phone">
              {cliente?.nombre ||
                selected ||
                "Selecciona un chat"}
            </div>

            <div className="chat-header-status">
              {selected}
              {cliente?.empresa &&
                ` • ${cliente.empresa}`}
            </div>
          </div>

          <button
  className="contact-info-btn"
  title="Información del cliente"
  onClick={() =>
    setShowContact(true)
  }
>
  ℹ️
</button>
        </div>

        {/* MENSAJES */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-chat">
              No hay mensajes
            </div>
          )}

          {messages.map((msg) => {

  if (msg.tipo === "reaction") {

    return (
      <ReactionBubble
        key={msg.id}
        emoji={msg.emoji}
        fromMe={msg.from_me}
      />
    );

  }

  const mediaSrc =
    msg.media_id
      ? `https://efaat.com/media/${msg.media_id}`
      : msg.media_url || "";

  return (
    <MessageBubble
      key={msg.id}
      mensaje={msg.mensaje}
      tipo={msg.tipo}
      media_url={msg.media_url}
      media_id={msg.media_id}
      fromMe={msg.from_me}
      estado={msg.estado}
      createdAt={msg.created_at}
      onImageClick={() => {
        const index =
          images.indexOf(mediaSrc);

        if (index >= 0) {
          setSelectedIndex(index);
        }
      }}
    />
  );

})}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* VISOR DE IMÁGENES */}
      {selectedIndex !== null && (
        <div
          className="image-viewer"
          onClick={() =>
            setSelectedIndex(null)
          }
        >
          <button
            className="viewer-nav viewer-prev"
            onClick={(e) => {
              e.stopPropagation();

              setSelectedIndex((prev) =>
                prev === 0
                  ? images.length - 1
                  : (prev ?? 0) - 1
              );
            }}
          >
            ❮
          </button>

          <img
            src={images[selectedIndex]}
            alt="Preview"
            onClick={(e) =>
              e.stopPropagation()
            }
            
          />

          <button
            className="viewer-nav viewer-next"
            onClick={(e) => {
              e.stopPropagation();

              setSelectedIndex((prev) =>
                prev === images.length - 1
                  ? 0
                  : (prev ?? 0) + 1
              );
            }}
          >
            ❯
          </button>

          <button
            className="image-close"
            onClick={() =>
              setSelectedIndex(null)
            }
          >
            ✕
          </button>

          <div className="viewer-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
      {showContact && (

  <div
    className="contact-modal-overlay"
    onClick={() =>
      setShowContact(false)
    }
  >

    <div
      className="contact-modal"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <button
        className="contact-close"
        onClick={() =>
          setShowContact(false)
        }
      >
        ✕
      </button>

      <div className="contact-avatar-large">
        {selected?.slice(-2)}
      </div>

      <h2>
        {cliente?.nombre ||
          "Sin nombre"}
      </h2>

      <p>{selected}</p>

      <div className="contact-info-row">
        📧 {cliente?.email || "-"}
      </div>

      <div className="contact-info-row">
        🏢 {cliente?.empresa || "-"}
      </div>

      <div className="contact-info-row">
        📍 {cliente?.ciudad || "-"}
      </div>

      <div className="contact-info-row">
        📝 {cliente?.notas || "-"}
      </div>

    </div>

  </div>

)}
    </>
  );
}