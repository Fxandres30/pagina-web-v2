type Props = {
  mensaje: string;
  tipo?: string;
  fromMe: boolean;
};

export default function MessageBubble({
  mensaje,
  tipo = "text",
  fromMe
}: Props) {

  let contenido = mensaje;

  if (tipo === "image") {
    contenido = "🖼️ Imagen";
  }

  if (tipo === "audio") {
    contenido = "🎤 Audio";
  }

  if (tipo === "video") {
    contenido = "🎥 Video";
  }

  if (tipo === "sticker") {
    contenido = "😀 Sticker";
  }

  if (tipo === "document") {
    contenido = "📄 Documento";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          fromMe
            ? "flex-end"
            : "flex-start",
        marginBottom: 12
      }}
    >
      <div
        style={{
          background:
            fromMe
              ? "#DCF8C6"
              : "#FFFFFF",
          padding: "10px 14px",
          borderRadius: 12,
          maxWidth: 400,
          boxShadow:
            "0 1px 3px rgba(0,0,0,.08)"
        }}
      >
        {contenido}
      </div>
    </div>
  );
}