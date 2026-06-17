import "./MessageBubble.css";

type Props = {
  mensaje: string;
  tipo?: string;
  media_url?: string | null;
  media_id?: string | null;
  fromMe: boolean;
  estado?: string | null;
  createdAt?: string;
  onImageClick?: (src: string) => void;
};

export default function MessageBubble({
  mensaje,
  tipo = "text",
  media_url,
  media_id,
  fromMe,
  estado,
  createdAt,
  onImageClick,
}: Props) {

  const mediaSrc =
    media_id
      ? `https://efaat.com/media/${media_id}`
      : media_url || "";

  const formattedTime =
    createdAt
      ? new Date(
          createdAt
        ).toLocaleTimeString(
          "es-CO",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "";

  const getStatusIcon = () => {

    if (!fromMe) return null;

    if (estado === "read") {
      return (
        <span className="status-read">
          ✓✓
        </span>
      );
    }

    if (estado === "delivered") {
      return "✓✓";
    }

    if (estado === "sent") {
      return "✓";
    }

    return "";
  };

  return (

    <div
      className={`message-container ${
        fromMe
          ? "message-right"
          : "message-left"
      }`}
    >

      <div
        className={`message-bubble ${
          fromMe
            ? "message-me"
            : "message-other"
        }`}
      >

        {tipo === "text" && (

          <div className="message-content">

            <p className="message-text">
              {mensaje}
            </p>

            <div className="message-meta">

              <span className="message-time">
                {formattedTime}
              </span>

              <span className="message-status">
                {getStatusIcon()}
              </span>

            </div>

          </div>

        )}

        {tipo === "image" && (media_url || media_id) && (

          <div className="media-wrapper">

            <img
  src={mediaSrc}
  alt="Imagen"
  className="message-image"
  loading="lazy"
  onClick={() =>
    onImageClick?.(mediaSrc)
  }
/>

            {mensaje && (
              <div className="media-caption">
                {mensaje}
              </div>
            )}

          </div>

        )}

        {tipo === "sticker" && media_id && (

          <img
            src={mediaSrc}
            alt="Sticker"
            className="message-sticker"
            loading="lazy"
          />

        )}

        {tipo === "audio" && media_id && (

          <audio
            controls
            src={mediaSrc}
            className="message-audio"
          />

        )}

        {tipo === "video" && media_id && (

          <div className="media-wrapper">

            <video
              controls
              src={mediaSrc}
              className="message-video"
            />

            {mensaje && (
              <div className="media-caption">
                {mensaje}
              </div>
            )}

          </div>

        )}

        {tipo === "document" && media_url && (

          <a
            href={media_url}
            target="_blank"
            rel="noopener noreferrer"
            className="message-document"
          >
            📄 Abrir documento
          </a>

        )}

      </div>

    </div>

  );

}