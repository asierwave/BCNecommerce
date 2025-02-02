export const LegalPage = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-staatliches mb-8 text-center">Avisos Legales</h2>
          <div className="space-y-12 max-w-3xl mx-auto">
            <section>
              <h3 className="text-2xl font-staatliches mb-4">Términos y Condiciones</h3>
              <p className="text-dark/80">Texto de ejemplo de términos y condiciones...</p>
            </section>
            <section>
              <h3 className="text-2xl font-staatliches mb-4">Política de Privacidad</h3>
              <p className="text-dark/80">Texto de ejemplo de política de privacidad...</p>
            </section>
          </div>
        </div>
      </div>
    );
  };