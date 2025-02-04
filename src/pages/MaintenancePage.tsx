import { AlertTriangleIcon } from 'lucide-react';

function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-center p-4">
      <div className="max-w-md space-y-6 justify-center items-center flex-row">
      <div className="flex space-x-[16px] items-center justify-center mx-auto">
        <img src="/images/marumerologoyellow.svg" className='w-[120px]' alt="logo Marumero" />
        <AlertTriangleIcon className="h-24 w-24 text-white animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-white font-staatliches">
          Sitio en Mantenimiento
        </h1>
        <p className="text-lg text-white/90 leading-relaxed">
          Estamos realizando mejoras para ofrecerte una mejor experiencia. 
          Por favor, vuelve a visitarnos más tarde. <br></br> ¡Disculpa las molestias!
        </p>
      </div>
    </div>
  );
}

export default MaintenancePage;










// import { Link } from 'react-router-dom';
// import { TruckIcon, ShieldCheckIcon, CurrencyIcon, LeafyGreen } from 'lucide-react';

// function MaintenancePage() {
//   return (
//     <>
//       {/* Hero Section de Mantenimiento */}
//       <section className="relative bg-primary h-[100vh]">
//         <div className="absolute inset-0 overflow-hidden">
//           <img 
//             src="/images/hero-bg1.svg" 
//             alt="Sitio en mantenimiento" 
//             className="w-full h-screen object-cover opacity-50" 
//           />
//           <div className='absolute inset-0 bg-gradient-to-b from-transparent/0 via-background/60 to-background'></div>
//         </div>
//         <div className="flex relative h-full items-end justify-center">
//           <div className="flex flex-col h-fit justify-center text-center text-dark max-w-2xl mb-28">
//             <h2 className="text-4xl md:text-6xl font-staatliches mb-6">¡Volvemos pronto!</h2>
//             <p className="text-lg md:text-2xl mb-8">
//               Estamos realizando mejoras para ofrecerte una mejor experiencia. 
//               Disculpa las molestias.
//             </p>
//             <Link 
//               to="/contacto"
//               className="bg-primary text-background px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition mx-auto"
//             >
//               Contacto de Emergencia
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Values Section (Mismo que HomePage para mantener consistencia) */}
//       <section className="py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h3 className="text-3xl font-staatliches text-center mb-12">Nuestras Ventajas</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               [TruckIcon, 'Envío Express', 'Recibe tu pedido en 24-48 horas laborales'],
//               [ShieldCheckIcon, 'Garantía Total', '2 años de garantía en todos nuestros productos'],
//               [CurrencyIcon, 'Precios Bajos', 'Las mejores ofertas garantizadas'],
//               [LeafyGreen, 'Sostenibilidad Premium', 'Materiales sostenibles y componentes de primera calidad']
//             ].map(([Icon, title, text], index) => (
//               <div 
//                 key={index} 
//                 className="text-center p-6 hover:bg-primary/10 rounded-lg transition-all"
//               >
//                 <Icon className="h-12 w-12 mx-auto text-primary mb-4" />
//                 <h4 className="text-xl font-staatliches mb-2">{title}</h4>
//                 <p className="text-dark/80">{text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mensaje de Mantenimiento */}
//       <main className="max-w-4xl mx-auto px-8 py-16 text-center">
//         <div className="bg-background/80 p-8 rounded-3xl shadow-lg">
//           <h3 className="text-3xl font-staatliches mb-4">¿Qué estamos haciendo?</h3>
//           <p className="text-lg text-dark/80 mb-6">
//             Actualización del sistema de inventarios<br/>
//             Mejoras en la experiencia de compra<br/>
//             Implementación de nuevas funcionalidades
//           </p>
//           <div className="flex justify-center space-x-4">
//             <a href="mailto:soporte@marumero.com" className="text-primary hover:text-primary/70">
//               soporte@marumero.com
//             </a>
//             <span className="text-dark/50">|</span>
//             <a href="tel:+123456789" className="text-primary hover:text-primary/70">
//               +34 123 456 789
//             </a>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default MaintenancePage;