import "@/styles/LegalPages.css";

import Header from "@/components/home/Header";

export default function TerminosPage() {

  return (

    <>

      <Header />

      <main className="legal-page">

        <div className="legal-container">

          <h1>
            Términos y Condiciones
          </h1>

          <p>
            Bienvenido a EFAAT. Al participar en nuestras dinámicas digitales,
            aceptas los siguientes términos y condiciones.
          </p>

          <section>

            <h2>
              1. Participación
            </h2>

            <p>
              Las dinámicas realizadas dentro de la plataforma son de carácter
              recreativo y promocional.
            </p>

          </section>

          <section>

            <h2>
              2. Compra de números
            </h2>

            <p>
              Cada usuario podrá adquirir los números disponibles según las
              condiciones activas en la dinámica publicada.
            </p>

          </section>

          <section>

            <h2>
              3. Verificación de pagos
            </h2>

            <p>
              Todos los pagos serán revisados manualmente antes de validar la
              participación.
            </p>

          </section>

          <section>

            <h2>
              4. Disponibilidad
            </h2>

            <p>
              Los números están sujetos a disponibilidad en tiempo real.
            </p>

          </section>

          <section>

            <h2>
              5. Responsabilidad
            </h2>

            <p>
              EFAAT podrá modificar dinámicas, condiciones o fechas cuando sea
              necesario para garantizar el correcto funcionamiento del sistema.
            </p>

          </section>

          <section>

            <h2>
              6. Contacto
            </h2>

            <p>
              Para cualquier consulta puedes comunicarte mediante nuestros canales
              oficiales.
            </p>

          </section>

        </div>

      </main>

    </>

  );
}