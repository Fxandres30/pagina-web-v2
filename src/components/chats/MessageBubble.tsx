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
  marginBottom: 10,
});

const bubbleStyle = (fromMe: boolean) => ({
  background: fromMe ? "#d9fdd3" : "#ffffff",
  padding: 8,
  borderRadius: 12,
  maxWidth: 420,
  boxShadow: "0 1px 2px rgba(0,0,0,.12)",
  overflowWrap: "break-word" as const,
});

const mediaStyle = {
  borderRadius: 12,
  maxWidth: 320,
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
    alt="Imagen"
    style={{
      ...mediaStyle,
      cursor: "pointer"
    }}
    loading="lazy"
  />
)}

{tipo === "sticker" && media_id && (
  <img
    src={mediaSrc}
    alt="Sticker"
    style={{
      width: 180,
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
      width: 280,
      display: "block"
    }}
  />
)}

{tipo === "video" && media_id && (
  <video
    controls
    src={mediaSrc}
    style={{
      maxWidth: 320,
      borderRadius: 12,
      display: "block"
    }}
  />
)}

        {tipo === "document" && media_url && (
  <a
    href={media_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      padding: "10px 14px",
      background: "#f3f4f6",
      borderRadius: 10,
      textDecoration: "none",
      color: "#111827",
      fontWeight: 600
    }}
  >
    📄 Abrir documento
  </a>
)}

      </div>

    </div>
  );
}
