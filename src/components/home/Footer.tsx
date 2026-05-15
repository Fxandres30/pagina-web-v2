import {
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";

import Link from "next/link";

import LiveViewers
from "@/components/home/LiveViewers";

import "@/styles/Footer.css";

export default function Footer() {

  return (

    <footer className="footer">

      {/* LIVE */}

      <div className="footer-live">

        <LiveViewers />

      </div>

      {/* SOCIAL */}

      <div className="social-icons">

        <Link
          href="https://wa.me/+573106142416"
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

      </div>

      {/* CONTACT */}

      <p className="contact-info">

        <a href="mailto:ventas@inversionesefaat.com">

          𝘷𝘦𝘯𝘵𝘢𝘴@𝘪𝘯𝘷𝘦𝘳𝘴𝘪𝘰𝘯𝘦𝘴𝘦𝘧𝘢𝘢𝘵.𝘤𝘰𝘮

        </a>

      </p>

      {/* COPYRIGHT */}

      <p className="terminos-page">

        © 2025 EFAAT.
        Todos los derechos reservados.

      </p>

    </footer>
  );
}