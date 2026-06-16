import "./ReactionBubble.css";

type Props = {
  emoji?: string;
  fromMe: boolean;
};

export default function ReactionBubble({
  emoji = "👍",
  fromMe,
}: Props) {
  return (
    <div
      className={`reaction-container ${
        fromMe
          ? "reaction-right"
          : "reaction-left"
      }`}
    >
      <div className="reaction-bubble">
        {emoji}
      </div>
    </div>
  );
}