import "./ChatList.css";

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

    <div className="chat-list">

      <div className="chat-list-header">

        <h2 className="chat-list-title">
          EFAAT CRM
        </h2>

        <div className="chat-list-count">
          {chats.length} conversaciones
        </div>

        <input
          className="chat-search"
          placeholder="Buscar chat..."
        />

      </div>

      <div className="chat-list-body">

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
                onSelect(telefono)
              }
              className={`chat-item ${
                selected === telefono
                  ? "active"
                  : ""
              }`}
            >

              <div className="chat-avatar">
                👤
              </div>

              <div className="chat-info">

                <div className="chat-top">

                  <strong className="chat-phone">
                    {telefono}
                  </strong>

                  <span className="chat-time">

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

                <div className="chat-preview">
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