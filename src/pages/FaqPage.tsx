export const FaqPage = () => {
    const faqs = [
      { question: "¿Cómo realizo un pedido?", answer: "Selecciona los productos y procede al checkout." },
      { question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos todas las tarjetas principales y PayPal." },
      { question: "¿Cuánto tardan los envíos?", answer: "Entre 24-48 horas laborables." },
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-staatliches mb-12 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-staatliches mb-2">{faq.question}</h3>
              <p className="text-dark/80">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };