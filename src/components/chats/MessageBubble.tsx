type Props = {
  mensaje: string;
  tipo?: string;
  media_url?: string | null;
  media_id?: string | null;
  fromMe: boolean;
};

const containerStyle = (fromMe: boolean) => ({
  display: "flex",
  justifyContent: fromMe ? "flex-end" : "flex-start",
  marginBottom: 12,
});

const bubbleStyle = (fromMe: boolean) => ({
  background: fromMe ? "#DCF8C6" : "#FFFFFF",
  padding: 12,
  borderRadius: 16,
  maxWidth: 400,
  boxShadow: "0 1px 3px rgba(0,0,0,.12)",
  overflowWrap: "break-word" as const,// evita que textos largos rompan diseño
});

const mediaStyle = {
  borderRadius: 10,
  maxWidth: 300,
  display: "block",
};

export default function MessageBubble({
  mensaje,
  tipo = "text",
  media_url,
  media_id,
  fromMe,
}: Props) {

  const mediaSrc =
  media_id
    ? `https://efaat.com/media/${media_id}`
    : media_url || "";

    console.log({
  tipo,
  media_id,
  media_url
});

  return (
    <div style={containerStyle(fromMe)}>

      <div style={bubbleStyle(fromMe)}>

        {tipo === "text" && (
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {mensaje}
          </p>
        )}

        {tipo === "image" && media_id && (
  <img
    src={mediaSrc}
    alt={mensaje || "Imagen"}
    style={mediaStyle}
    loading="lazy"
  />
)}

{tipo === "sticker" && media_id && (
  <img
    src={mediaSrc}
    alt="Sticker"
    style={{
      width: 150,
      borderRadius: 10,
      display: "block"
    }}
    loading="lazy"
  />
)}

{tipo === "audio" && media_id && (
  <audio
    controls
    src={mediaSrc}
    style={{
      width: "100%"
    }}
  />
)}

{tipo === "video" && media_id && (
  <video
    controls
    src={mediaSrc}
    style={{
      maxWidth: 300,
      borderRadius: 10
    }}
  />
)}

        {tipo === "document" && media_url && (
          <a href={media_url} target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc", textDecoration: "underline" }}>
            📄 Abrir documento
          </a>
        )}

      </div>

    </div>
  );
}
