export const ContactPage = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-staatliches mb-8 text-center">Contacto</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-lg mb-2">Nombre</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-lg mb-2">Email</label>
                <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-lg mb-2">Mensaje</label>
                <textarea className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-primary" />
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-staatliches text-lg">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };