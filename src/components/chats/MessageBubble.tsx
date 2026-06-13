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
  background:
    fromMe
      ? "#d9fdd3"
      : "#202c33",

  color:
    fromMe
      ? "#111"
      : "#e9edef",

  padding: 6,

  borderRadius: 12,

  maxWidth: 420,

  boxShadow:
    "0 1px 2px rgba(0,0,0,.25)"
});

const mediaStyle = {
  borderRadius: 10,
  maxWidth: 320,
  display: "block",
  width: "100%",
  objectFit: "cover" as const
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

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}
  >

    <img
      src={mediaSrc}
      alt="Imagen"
      style={mediaStyle}
      loading="lazy"
    />

    {mensaje && (

      <div
        style={{
          padding: "0 4px 4px",
          fontSize: 14,
          color: "#111827",
          lineHeight: 1.4
        }}
      >
        {mensaje}
      </div>

    )}

  </div>

)}

{tipo === "sticker" && media_id && (
  <img
    src={mediaSrc}
    alt="Sticker"
    style={{
  width: "100%",
  maxWidth: 320,
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
      width: 280,
      display: "block"
    }}
  />
)}

{tipo === "video" && media_id && (

  <div>

    <video
      controls
      src={mediaSrc}
      style={{
        maxWidth: 320,
        borderRadius: 12,
        display: "block"
      }}
    />

    {mensaje && (

      <p
        style={{
  width: "100%",
  maxWidth: 320,
  borderRadius: 10,
  display: "block"
}}
      >
        {mensaje}
      </p>

    )}

  </div>

)}

        {tipo === "document" && media_url && (
  <a
    href={media_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: 12,
  background: "#F3F4F6",
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
