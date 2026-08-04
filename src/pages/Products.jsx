import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data.products || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddOrder = (product) => {
    const existingOrders = JSON.parse(localStorage.getItem('shoppanel_orders')) || [];
    const newOrder = {
      orderId: Date.now(),
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      status: 'Pendiente'
    };
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('shoppanel_orders', JSON.stringify(updatedOrders));
    alert(`Pedido registrado como Pendiente para: ${product.title}`);
  };

  if (loading) return <div className="text-center p-10">Cargando productos...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Catálogo de Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddOrder={handleAddOrder} />
        ))}
      </div>
    </div>
  );
}