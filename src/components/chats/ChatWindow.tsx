"use client";

import "./ChatWindow.css";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type Props = {
  messages: any[];
  selected?: string;
  onBack?: () => void;
};

export default function ChatWindow({
  messages,
  selected,
  onBack
}: Props) {

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  return (

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

        {messages.map((msg) => (

          <MessageBubble
  key={msg.id}
  mensaje={msg.mensaje}
  tipo={msg.tipo}
  media_url={msg.media_url}
  media_id={msg.media_id}
  fromMe={msg.from_me}
  estado={msg.estado}
  createdAt={msg.created_at}
/>

        ))}

        <div ref={bottomRef} />

      </div>

    </div>

  );

}