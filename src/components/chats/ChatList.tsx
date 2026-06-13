type Props = {
  chats: string[];
  messages: any[];
  selected: string;
  onSelect: (
    telefono: string
  ) => void;
};

export default function ChatList({
  chats,
  messages,
  selected,
  onSelect
}: Props) {

  const safeMessages =
  messages || [];

  return (

    <div
      style={{
        width: 340,
        borderRight: "1px solid #e5e7eb",
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* HEADER */}

      <div
  style={{
    padding: 16,
    background: "#202c33",
    borderBottom: "1px solid #2a3942"
  }}
>

  <h2
    style={{
      margin: 0,
      color: "#e9edef",
      fontSize: 22
    }}
  >
    EFAAT CRM
  </h2>

  <div
    style={{
      marginTop: 4,
      color: "#8696a0",
      fontSize: 13
    }}
  >
    {chats.length} conversaciones
  </div>

  <input
    placeholder="Buscar chat..."
    style={{
      width: "100%",
      marginTop: 14,
      padding: "12px 14px",
      borderRadius: 8,
      border: "none",
      background: "#2a3942",
      color: "#fff",
      outline: "none"
    }}
  />

</div>

      {/* CHATS */}

      <div
        style={{
          flex: 1,
          overflowY: "auto"
        }}
      >

        {chats.map((telefono) => {

          const chatMessages =
            safeMessages.filter(
              (m) =>
                m.telefono === telefono
            );

          const ultimo =
            chatMessages[
              chatMessages.length - 1
            ];

          let preview =
            ultimo?.mensaje || "";

          if (
            ultimo?.tipo === "image"
          ) {
            preview =
              "🖼️ Imagen";
          }

          if (
            ultimo?.tipo === "audio"
          ) {
            preview =
              "🎤 Audio";
          }

          if (
            ultimo?.tipo === "video"
          ) {
            preview =
              "🎥 Video";
          }

          if (
            ultimo?.tipo === "sticker"
          ) {
            preview =
              "😀 Sticker";
          }

          if (
            ultimo?.tipo === "document"
          ) {
            preview =
              "📄 Documento";
          }

          return (

            <div
              key={telefono}
              onClick={() =>
                onSelect(
                  telefono
                )
              }
              style={{
                display: "flex",
                gap: 12,
                padding: 15,
                cursor: "pointer",
                borderBottom:
                  "1px solid #f3f4f6",

                background:
  selected === telefono
    ? "#2a3942"
    : "#111b21"
              }}
            >

              {/* AVATAR */}
<div
  style={{
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "#00a884",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 22,
    flexShrink: 0
  }}
>
  👤
</div>

              {/* INFO */}

              <div
                style={{
                  flex: 1
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between"
                  }}
                >

                  <strong
  style={{
    color: "#e9edef",
    fontSize: 15
  }}
>
  {telefono}
</strong>

                  <span
                    style={{
                      fontSize: 12,
                      color: "#8696a0"
                    }}
                  >
                    {ultimo?.created_at
                      ? new Date(
                          ultimo.created_at
                        ).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute:
                              "2-digit"
                          }
                        )
                      : ""}
                  </span>

                </div>

                <div
                  style={{
                    marginTop: 5,
                    color: "#8696a0",
                    fontSize: 14,
                    overflow:
                      "hidden",
                    whiteSpace:
                      "nowrap",
                    textOverflow:
                      "ellipsis"
                  }}
                >
                  {preview}
                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}