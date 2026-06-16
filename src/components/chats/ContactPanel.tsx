"use client";

import "./ContactPanel.css";

type Props = {
  telefono: string;
  cliente?: any;
};

export default function ContactPanel({
  telefono,
  cliente,
}: Props) {
  return (
    <aside className="contact-panel">

      <div className="contact-header">

        <div className="contact-avatar">
          {telefono?.slice(-2) || "👤"}
        </div>

        <h2>
          {cliente?.nombre ||
            "Cliente"}
        </h2>

        <span className="contact-phone">
          {telefono}
        </span>

      </div>

      <div className="contact-section">

        <h4>Información</h4>

        <div className="contact-row">
          <span>📧</span>
          <span>
            {cliente?.email ||
              "Sin correo"}
          </span>
        </div>

        <div className="contact-row">
          <span>🏢</span>
          <span>
            {cliente?.empresa ||
              "Sin empresa"}
          </span>
        </div>

        <div className="contact-row">
          <span>📍</span>
          <span>
            {cliente?.ciudad ||
              "Sin ciudad"}
          </span>
        </div>

      </div>

      <div className="contact-section">

        <h4>Etiquetas</h4>

        <div className="contact-tags">

          <span className="tag">
            Cliente
          </span>

          <span className="tag">
            WhatsApp
          </span>

        </div>

      </div>

      <div className="contact-section">

        <h4>Notas internas</h4>

        <textarea
          className="contact-notes"
          defaultValue={
            cliente?.notas || ""
          }
          placeholder="Escribe notas sobre este cliente..."
        />

      </div>

    </aside>
  );
}