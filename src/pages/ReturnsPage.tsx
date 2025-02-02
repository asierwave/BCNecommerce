export const ReturnsPage = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-staatliches mb-8 text-center">Devoluciones</h2>
          <div className="prose max-w-3xl mx-auto">
            <p className="text-dark/80">Ofrecemos devoluciones gratuitas dentro de los 30 días posteriores a la compra.</p>
            <ol className="list-decimal pl-6 mt-4 space-y-4">
              <li className="text-dark/80">Contacta a nuestro servicio al cliente</li>
              <li className="text-dark/80">Empaqueta el producto original</li>
              <li className="text-dark/80">Envía el paquete a nuestra dirección</li>
            </ol>
          </div>
        </div>
      </div>
    );
  };