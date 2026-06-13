type Props = {
  mensaje: string;
  tipo?: string;
  media_url?: string | null;
  media_id?: string | null;
  fromMe: boolean;
};

export default function MessageBubble({
  mensaje,
  tipo = "text",
  media_url,
  media_id,
  fromMe
}: Props) {

  console.log(
    "MEDIA:",
    tipo,
    media_url
  );

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

          padding: 10,
          borderRadius: 12,
          maxWidth: 400,

          boxShadow:
            "0 1px 3px rgba(0,0,0,.08)"
        }}
      >

        {tipo === "text" && (
          <div>
            {mensaje}
          </div>
        )}

       
{tipo === "image" &&
  media_id && (

  <>
    <img
      src={`http://209.38.77.179:3001/media/${media_id}`}
      alt="imagen"
      style={{
        maxWidth: 300,
        borderRadius: 10
      }}
      onError={() =>
        console.log(
          "ERROR IMG",
          media_id
        )
      }
      onLoad={() =>
        console.log(
          "LOAD IMG",
          media_id
        )
      }
    />

    <div
      style={{
        fontSize: 10
      }}
    >
      {media_id}
    </div>

  </>

)}

        {tipo === "sticker" &&
          media_url && (

          <img
            src={media_url}
            alt="sticker"
            style={{
              width: 150
            }}
          />

        )}

        {tipo === "audio" &&
          media_url && (

          <audio
            controls
            src={media_url}
          />

        )}

        {tipo === "video" &&
          media_url && (

          <video
            controls
            src={media_url}
            style={{
              maxWidth: 300,
              borderRadius: 10
            }}
          />

        )}

        {tipo === "document" &&
          media_url && (

          <a
            href={media_url}
            target="_blank"
          >
            📄 Abrir documento
          </a>

        )}

      </div>

    </div>

  );

}