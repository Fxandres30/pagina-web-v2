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

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#0b141a",

        height: "100%",
        overflow: "hidden",
        minHeight: 0
      }}
    >

      {/* HEADER */}

      <div
        style={{
          height: 70,
          minHeight: 70,
          background: "#202c33",
          borderBottom:
            "1px solid #2a3942",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          color: "#e9edef",
          fontWeight: 600,
          fontSize: 16
        }}
      >
        📱 {selected || "Selecciona un chat"}
      </div>

      {/* MENSAJES */}

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",

          padding: 20,

          backgroundImage:
            "url('https://i.imgur.com/Yqz6F4N.png')",

          backgroundSize: "cover",
          backgroundPosition: "center",

          scrollbarWidth: "thin"
        }}
      >

        {messages.length === 0 && (

          <div
            style={{
              textAlign: "center",
              marginTop: 100,
              color: "#8696a0"
            }}
          >
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