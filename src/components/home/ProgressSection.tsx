"use client";

import { useState, useEffect } from "react";

import "@/styles/ProgressSection.css";

export default function ProgressSection() {

  const [progreso, setProgreso] = useState(0);

  useEffect(() => {

  const fetchData = async () => {

    try {

      const response = await fetch(
        "/api/progreso-boletos"
      );

      const data = await response.json();

      let porcentaje = parseFloat(
        data.porcentaje
      );

      // SI YA NO HAY DISPONIBLES
      if (
        porcentaje >= 99.10 &&
        data.boletosDisponibles === 0
      ) {

        porcentaje = 100;

      } else {

        porcentaje =
          Math.round(
            porcentaje * 100
          ) / 100;
      }

      setProgreso(porcentaje);

    } catch (error) {

      console.error(
        "Error obteniendo el progreso:",
        error
      );
    }
  };

  // 🔥 SOLO UNA VEZ

  fetchData();

}, []);
   
  return (
    <section className="progress-section">

      <div className="progress-bar">

  <div
    className="progress-fill"
    style={{
      width: `${progreso}%`,
    }}
  />

  <div className="progress-number">
    {progreso}%
  </div>

</div>

      <Leyenda progreso={progreso} />

    </section>
  );
}


// ✨ Leyenda dinámica
function Leyenda({ progreso }: { progreso: number }) {
  let mensaje = "🔒 Actividad en preparación. Pronto se activará.";

  if (progreso === 0) {
    mensaje = "🎯 ¡Sé quien inicie esta nueva dinámica!";
  } else if (progreso <= 3) {
    mensaje = "🟢 Las primeros numeros ya están en juego.";
  } else if (progreso <= 6) {
    mensaje = "👀 Ya hay movimiento. ¡Explora tus numeros!";
  } else if (progreso <= 9) {
    mensaje = "🧩 Se empiezan a formar numeros unicos.";
  } else if (progreso <= 12) {
    mensaje = "🔍 El interés esta en aumento. ¡Ya activastes tus numeros!";
  } else if (progreso <= 15) {
    mensaje = "📊 Ya hay flujo en la dinámica. ¡No esperes mas!";
  } else if (progreso <= 18) {
    mensaje = "💬 Los numeros comienzan a multiplicarse.";
  } else if (progreso <= 21) {
    mensaje = "✨ Momento ideal para integrarte a la dinámica. ¡Actúa ya!";
  } else if (progreso <= 24) {
    mensaje = "📈 Esto se está encendiendo. ¡No pierdas tu lugar, actúa ahora!";
  } else if (progreso <= 27) {
    mensaje = "🚶‍♂️ Todos están entrando en acción. ¿Y tú? ¡No te quedes mirando!";
  } else if (progreso <= 30) {
    mensaje = "🔁 La rotación de numeros acelera.";
  } else if (progreso <= 33) {
    mensaje = "🚀 El avance es constante. ¡Aún puedes sumarte!";
  } else if (progreso <= 36) {
    mensaje = "🔥 La energía sube. No te quedes fuera de la dinámica.";
  } else if (progreso <= 39) {
    mensaje = "🧠 Algunos numeros ya han sido generados.";
  } else if (progreso <= 42) {
    mensaje = "💡 Los numeros están en pleno uso. ¡No te quedes atrás!";
  } else if (progreso <= 44) {
    mensaje = "🕵️‍♀️ Se mueven fichas clave. ¡Este es tu momento!";
  } else if (progreso <= 46) {
    mensaje = "📌 A mitad del flujo. ¡Es buen momento para actuar!";
  } else if (progreso <= 48) {
    mensaje = "⏳ El ritmo se mantiene firme.";
  } else if (progreso <= 51) {
    mensaje = "⚙️ Los numeros siguen fluyendo activamente.";
  } else if (progreso <= 54) {
    mensaje = "🏃‍♀️ Se acelera el uso de los numeros.";
  } else if (progreso <= 57) {
    mensaje = "🔄 El sistema se encuentra en plena actividad. ¡Que esperas!";
  } else if (progreso <= 60) {
    mensaje = "📡 Alta interacción detectada en los numeros.";
  } else if (progreso <= 63) {
    mensaje = "🚧 Más de la mitad ya fueron activados.¡Ya tienes los tuyos!";
  } else if (progreso <= 66) {
    mensaje = "📦 Quedan menos opciones para combinar.";
  } else if (progreso <= 69) {
    mensaje = "⚠️ Los numeros disponibles se reducen.¡No esperes mas!";
  } else if (progreso <= 72) {
    mensaje = "💨 Se están agotando rápidamente.";
  } else if (progreso <= 75) {
    mensaje = "🧨 Se acerca la fase final de la dinamica.¡Ya tienes los tuyos!";
  } else if (progreso <= 78) {
    mensaje = "🔄 ¡Todo en marcha! No lo pienses más, ¡es ahora o nunca!";
  } else if (progreso <= 80) {
    mensaje = "🚨 Últimos tramos disponibles.¡Aún puedes sumarte!";
  } else if (progreso <= 85) {
    mensaje = "🆘 La disponibilidad es mínima.¡Que esperas!";
  } else if (progreso <= 90) {
    mensaje = "💣 ¡Última llamada! Se cierran codigos pronto. ¿Tienes los tuyos?";
  } else if (progreso <= 95) {
    mensaje = "📉 Se están yendo los últimos. ¡Aprovecha antes del cierre total!";
  } else if (progreso < 100) {
    mensaje = "⚠️ Cierre inminente. Últimos numeros en circulación.";
  } else {
    mensaje = "✅ Dinámica completa. Todas los numeros han sido vendidos.";
  }


  return (
    <p className="progress-text">
      {mensaje}
    </p>
  );
}
