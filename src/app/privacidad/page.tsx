import "@/styles/LegalPages.css";

import Header from "@/components/home/Header";

export default function PrivacidadPage() {

  return (

    <>

      <Header />

      <main className="legal-page">

        <div className="legal-container">

          <h1>
            Tratamiento de Datos
          </h1>

          <p>
            En EFAAT respetamos y protegemos la privacidad de nuestros usuarios.
          </p>

          <section>

            <h2>
              1. Información recopilada
            </h2>

            <p>
              Podemos recopilar información como nombres, números telefónicos,
              correos electrónicos y datos relacionados con la participación en
              las dinámicas.
            </p>

          </section>

          <section>

            <h2>
              2. Uso de la información
            </h2>

            <p>
              La información será utilizada únicamente para validar pagos,
              gestionar participaciones y mejorar la experiencia dentro de la
              plataforma.
            </p>

          </section>

          <section>

            <h2>
              3. Protección de datos
            </h2>

            <p>
              Implementamos medidas de seguridad razonables para proteger la
              información de nuestros usuarios.
            </p>

          </section>

          <section>

            <h2>
              4. Compartición de información
            </h2>

            <p>
              No compartimos información personal con terceros sin autorización,
              salvo requerimiento legal.
            </p>

          </section>

          <section>

            <h2>
              5. Derechos del usuario
            </h2>

            <p>
              El usuario podrá solicitar actualización o eliminación de sus datos
              personales mediante nuestros canales oficiales.
            </p>

          </section>

        </div>

      </main>

    </>

  );
}