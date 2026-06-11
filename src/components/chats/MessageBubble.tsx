type Props = {
  mensaje: string;
  fromMe: boolean;
};

export default function MessageBubble({
  mensaje,
  fromMe
}: Props) {
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
          background: fromMe
            ? "#DCF8C6"
            : "#FFFFFF",
          padding: "10px 14px",
          borderRadius: 12,
          maxWidth: 400,
          boxShadow:
            "0 1px 3px rgba(0,0,0,.08)"
        }}
      >
        {mensaje}
      </div>
    </div>
  );
}