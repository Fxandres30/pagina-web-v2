type Props = {
  chats: string[];
  selected: string;
  onSelect: (telefono: string) => void;
};

export default function ChatList({
  chats,
  selected,
  onSelect
}: Props) {
  return (
    <div
      style={{
        width: 320,
        borderRight: "1px solid #ddd",
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* HEADER */}

      <div
        style={{
          padding: 20,
          borderBottom: "1px solid #ddd"
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22
          }}
        >
          💬 EFAAT CRM
        </h2>

        <p
          style={{
            marginTop: 5,
            color: "#777",
            fontSize: 14
          }}
        >
          {chats.length} conversaciones
        </p>

        <input
          placeholder="🔍 Buscar chat..."
          style={{
            width: "100%",
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        />
      </div>

      {/* CHATS */}

      <div
        style={{
          overflowY: "auto",
          flex: 1
        }}
      >
        {chats.map((telefono) => (
          <div
            key={telefono}
            onClick={() =>
              onSelect(telefono)
            }
            style={{
              padding: 15,
              cursor: "pointer",
              borderBottom:
                "1px solid #f0f0f0",

              background:
                selected === telefono
                  ? "#f5f5f5"
                  : "#fff"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between"
              }}
            >
              <strong>
                👤 Cliente
              </strong>

              <span
                style={{
                  fontSize: 12,
                  color: "#888"
                }}
              >
                Ahora
              </span>
            </div>

            <div
              style={{
                marginTop: 5,
                fontSize: 14
              }}
            >
              📱 {telefono}
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                color: "#666"
              }}
            >
              Último mensaje...
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#22c55e"
              }}
            >
              🟢 Activo
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}