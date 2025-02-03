import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductCard } from './components/ProductCard';
import { Basket } from './components/Basket';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Product, BasketItem } from './types/stripe';
import { stripePromise, createCheckoutSession, fetchProducts } from './lib/stripe';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { LegalPage } from './pages/LegalPage';
import { ShoppingCart, LeafyGreen } from 'lucide-react';
import {
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

function App() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const removeFromBasket = (productId: string) => {
    setBasketItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const itemCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="flex-column min-h-screen w-[100vw] bg-background">
        {/* Header */}
        <header className="flex fixed z-30 w-[97vw] bg-background h-16 items-center m-2 rounded-3xl px-2 text-primary shadow-sm">
          <div className="w-full flex justify-between items-center p-2">
            <Link to="/" className="flex items-center text-center font-staatliches">
              <img 
                src="/images/marumero-logo.svg" 
                alt="logo de Marumero" 
                className="w-16 h-full object-cover" 
              />
              <h1 className='text-3xl text-dark'>MARUMERO</h1>
            </Link>
            <nav className="flex items-center space-x-6 w-fit cursor-pointer text-dark">
              <Link to="/contacto" className="flex hover:text-primary">Contacto</Link>
              <Link to="/faq" className="flex hover:text-primary">FAQ</Link>
              <button 
                onClick={() => setIsBasketOpen(!isBasketOpen)}
                className="relative items-center content-center bg-primary text-background rounded-3xl pl-3 pt-2 pb-2 pr-3 hover:opacity-60 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-background" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-background text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </header>

        <Basket
          items={basketItems}
          onRemoveItem={removeFromBasket}
          onCheckout={() => {
            const handleCheckout = async () => {
              const stripe = await stripePromise;
              if (!stripe) return;
              try {
                const sessionId = await createCheckoutSession(
                  basketItems.map((item) => ({ 
                    price: item.id, 
                    quantity: item.quantity 
                  }))
                );
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) console.error('Error:', error);
              } catch (err) {
                console.error('Checkout error:', err);
              }
            };
            handleCheckout();
          }}
          isOpen={isBasketOpen}
          onToggle={() => setIsBasketOpen(!isBasketOpen)}
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            } 
          />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/devoluciones" element={<ReturnsPage />} />
          <Route path="/terminos" element={<LegalPage />} />
          <Route path="/privacidad" element={<LegalPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-dark flex text-white pt-12 mt-16">
          <div className="w-[100vw] px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
              <div>
                <h5 className="text-lg font-staatliches mb-4">Marumero</h5>
                <p className="text-background">Tu tienda de textiles pastel-goth</p>
              </div>
              <div>
                <h5 className="text-lg font-staatliches mb-4">Atención al Cliente</h5>
                <ul className="space-y-2">
                  <li><Link to="/contacto" className="text-background hover:text-secondary">Contacto</Link></li>
                  <li><Link to="/faq" className="text-background hover:text-secondary">FAQ</Link></li>
                  <li><Link to="/devoluciones" className="text-background hover:text-secondary">Devoluciones</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-staatliches mb-4">Legal</h5>
                <ul className="space-y-2">
                  <li><Link to="/terminos" className="text-background hover:text-secondary">Términos</Link></li>
                  <li><Link to="/privacidad" className="text-background hover:text-secondary">Privacidad</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-staatliches mb-4">Síguenos</h5>
                <div className="flex-column space-y-4">
                  <a href="#" className="flex text-background hover:text-secondary">Facebook</a>
                  <a href="#" className="flex text-background hover:text-secondary">Instagram</a>
                  <a href="#" className="flex text-background hover:text-secondary">Twitter</a>
                </div>
              </div>
            </div>
            <div className="border-t border-dark py-6 text-center">
              <p className="text-background">
                © {new Date().getFullYear()} Marumero. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage({
  basketItems,
  setBasketItems
}: {
  basketItems: BasketItem[],
  setBasketItems: React.Dispatch<React.SetStateAction<BasketItem[]>>
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const addToBasket = (product: Product, quantity: number) => {
    setBasketItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...currentItems, { ...product, quantity }];
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary h-[100vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/hero-bg1.svg" 
            alt="Nuestra tienda" 
            className="w-full h-screen object-cover opacity-50" 
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent/0 via-background/60 to-background'></div>
        </div>
        <div className="flex relative h-full items-end justify-center">
          <div className="flex flex-col h-fit justify-center text-center text-dark max-w-2xl mb-28">
            <h2 className="text-4xl md:text-6xl font-staatliches mb-6">Bienvenido a Marumero</h2>
            <p className="text-lg md:text-2xl mb-8">Descubre los mejores productos textiles pastel-goth</p>
            <a 
              href="#products" 
              className="bg-primary text-background px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition mx-auto"
            >
              Ver Productos
            </a>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-staatliches text-center mb-12">Nuestras Ventajas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              [TruckIcon, 'Envío Express', 'Recibe tu pedido en 24-48 horas laborales'],
              [ShieldCheckIcon, 'Garantía Total', '2 años de garantía en todos nuestros productos'],
              [CurrencyDollarIcon, 'Precios Bajos', 'Las mejores ofertas garantizadas'],
              [LeafyGreen, 'Sostenibilidad Premium', 'Materiales sostenibles y componentes de primera calidad']
            ].map(([Icon, title, text], index) => (
              <div 
                key={index} 
                className="text-center p-6 hover:bg-primary/10 rounded-lg transition-all"
              >
                <Icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-staatliches mb-2">{title}</h4>
                <p className="text-dark/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="max-w-6xl mx-auto px-8 sm:px-8 lg:px-8 py-12" id="products">
        {loading ? (
          <div className="text-center py-12"><LoadingSpinner /></div>
        ) : error ? (
          <div className="text-center text-red-600 py-12 text-xl">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToBasket={addToBasket} 
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;