import "./ChatWindow.css";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type Props = {
  messages: any[];
  selected?: string;
};

export default function ChatWindow({
  messages,
  selected
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
        📱 {selected || "Selecciona un chat"}
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
          />

        ))}

        <div ref={bottomRef} />

      </div>

    </div>

  );

}