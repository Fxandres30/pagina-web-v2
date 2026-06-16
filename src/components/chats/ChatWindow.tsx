"use client";

import "./ChatWindow.css";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

type Props = {
  messages: any[];
  selected?: string;
  onBack?: () => void;
};

export default function ChatWindow({
  messages,
  selected,
  onBack,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  const images = messages
    .filter((m) => m.tipo === "image")
    .map((m) =>
      m.media_id
        ? `https://efaat.com/media/${m.media_id}`
        : m.media_url
    )
    .filter(Boolean);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

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

    if (lastMessage.from_me === false) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="chat-window">
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
              {selected ||
                "Selecciona un chat"}
            </div>

            <div className="chat-header-status">
              WhatsApp Business
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-chat">
              No hay mensajes
            </div>
          )}

          {messages.map((msg) => {
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
    </>
  );
}