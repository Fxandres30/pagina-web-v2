import MessageBubble from "./MessageBubble";

type Props = {
  messages: any[];
  selected?: string;
};

export default function ChatWindow({
  messages,
  selected
}: Props) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5"
      }}
    >
      {/* HEADER */}

      <div
        style={{
          height: 70,
          background: "#fff",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          fontWeight: 600,
          fontSize: 18
        }}
      >
        📱 {selected || "Selecciona un chat"}
      </div>

      {/* MENSAJES */}

      <div
        style={{
          flex: 1,
          padding: 20,
          overflowY: "auto"
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: 100,
              color: "#888"
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
      </div>
    </div>
  );
}