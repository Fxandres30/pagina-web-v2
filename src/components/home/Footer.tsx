import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane
} from "react-icons/fa";

import Link from "next/link";

import "@/styles/Footer.css";

export default function Footer() {

  return (

    <footer className="footer">


      {/* BRAND */}

      <div className="footer-brand">

        <h2>EFAAT</h2>

        <p>
  Plataforma de dinámicas y experiencias
  digitales con interacción en tiempo real.
</p>

      </div>

      {/* SOCIAL */}

      <div className="social-icons">

  <Link
    href="https://wa.me/573009760087"
    className="icon whatsapp"
    target="_blank"
  >
    <FaWhatsapp />
  </Link>

  <Link
    href="https://www.instagram.com/fxandres30"
    className="icon instagram"
    target="_blank"
  >
    <FaInstagram />
  </Link>

  <Link
    href="https://facebook.com/TU_PAGINA"
    className="icon facebook"
    target="_blank"
  >
    <FaFacebookF />
  </Link>

  <Link
    href="https://t.me/EfaatOficial"
    className="icon telegram"
    target="_blank"
  >
    <FaTelegramPlane />
  </Link>

</div>

      {/* CONTACT */}

      <p className="contact-info">
  
  <a href="mailto:contacto@efaat.com">

    contacto@efaat.com

  </a>

</p>

      {/* LINKS */}

      {/* LINKS */}

<div className="footer-links">

  <Link href="/terminos">
    Términos y condiciones
  </Link>

  <Link href="/privacidad">
    Tratamiento de datos
  </Link>

  <Link href="/pagos">
    Pagos y reembolsos
  </Link>

</div>

      {/* COPYRIGHT */}

      <p className="footer-copy">

        © {new Date().getFullYear()} EFAAT
        Todos los derechos reservados.

      </p>

    </footer>
  );
}