"use client";

import Image from "next/image";
import styles from "@/styles/Bienvenido.module.css";
import Reseñas from "@/components/Reseñas";
import ClientesSatisfechos from "@/components/ClientesSatisfechos";
import Dinamicas from "@/components/Dinamicas";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "@/styles/Dinamicas2Cifras.css";
import QuienesSomos from "@/components/QuienesSomos";
import { FaInstagram, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa"; 
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function BienvenidoPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className={`${styles.page} ${poppins.className}`}>
  <header className={styles["bienvenido-header"]}>
    <div className={styles["image-container"]}>
      <Image src="/titulo.png" alt="Título" width={250} height={70} />
    </div>

    {/* Botón menú hamburguesa */}
    <button
      className={styles["menu-btn"]}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>

    <nav className={`${styles["side-menu"]} ${menuOpen ? styles.open : ""}`}>
  <h2>También encontrarás</h2>
  <hr />
  <Link href="https://www.inversionesefaat.com/dinamica-activa" onClick={() => setMenuOpen(false)}>Dinámica Activa</Link>
  <Link href="https://www.inversionesefaat.com/elijetusnumeros" onClick={() => setMenuOpen(false)}>Selecciona tus números gratis</Link>
</nav>
  </header>

      <section className={styles.container}>
        <h2>Juega hoy, cobra hoy</h2>
        <Link
          href="https://chat.whatsapp.com/Cr5lOx38jpa2jTZ2aaGUAq"
          target="_blank"
          rel="noopener noreferrer"
          className="boton-grupo-whatsapp"
        >
          🤝 Únete a nuestro grupo de WhatsApp.
        </Link>
      </section>
      
      <Dinamicas />
      <ClientesSatisfechos />
      <QuienesSomos />
      <Reseñas />

      <footer className="footer">
        <div className="social-icons">
          <Link href="https://wa.me/+573014123951" className="icon whatsapp" target="_blank">
            <FaWhatsapp /> 
          </Link>
          <Link href="https://www.instagram.com/efaatdinamicas" className="icon instagram" target="_blank">
            <FaInstagram />
          </Link>
        </div>
        <p className="contact-info">
          <a href="mailto:ventas@inversionesefaat.com">ventas@inversionesefaat.com</a>
        </p>
        <p className='terminos-page'>© 2025 EFAAT. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
