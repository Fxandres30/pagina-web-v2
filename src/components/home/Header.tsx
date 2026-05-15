import Image from "next/image";
import "@/styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="image-container">
        <Image
          src="/titulo.png"
          alt="EFAAT"
          width={260}
          height={70}
          priority
        />
      </div>
    </header>
  );
}