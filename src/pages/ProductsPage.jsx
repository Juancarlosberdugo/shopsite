import { useState, useEffect } from 'react';
import { getProducts, formatCOP } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError('Error al conectar con el servidor de productos.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = (product) => {
    const existingOrders = JSON.parse(localStorage.getItem('shoppanel_orders')) || [];
    
    const newOrder = {
      orderId: Date.now(),
      productId: product.id,
      title: product.title,
      price: product.price, // Guardamos el valor base
      thumbnail: product.thumbnail,
      status: 'Pendiente',
      createdAt: new Date().toLocaleDateString('es-CO')
    };

    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('shoppanel_orders', JSON.stringify(updatedOrders));

    setToastMessage(`Pedido registrado: "${product.title}" (${formatCOP(product.price)}) en estado Pendiente.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Cargando catálogo de productos...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center my-4">{error}</div>;
  }

  return (
    <div>
      {toastMessage && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className="toast show bg-success text-white p-3 shadow rounded">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Catálogo de Productos</h2>
        <span className="badge bg-info text-dark fs-6">
          {products.length} productos disponibles
        </span>
      </div>

      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddOrder={handleAddOrder} />
        ))}
      </div>
    </div>
  );
};