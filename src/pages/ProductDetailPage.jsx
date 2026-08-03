import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, formatCOP } from '../services/api';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError('El producto consultado no existe o no se pudo cargar.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    if (!product) return;
    const existingOrders = JSON.parse(localStorage.getItem('shoppanel_orders')) || [];
    
    const newOrder = {
      orderId: Date.now(),
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      status: 'Pendiente',
      createdAt: new Date().toLocaleDateString('es-CO')
    };

    localStorage.setItem('shoppanel_orders', JSON.stringify([newOrder, ...existingOrders]));
    setAdded(true);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center my-5">
        <div className="alert alert-warning">{error}</div>
        <button onClick={() => navigate('/productos')} className="btn btn-primary">
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <Link to="/productos" className="text-decoration-none mb-3 d-inline-block">
        ← Volver al catálogo
      </Link>
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded bg-light p-3"
            style={{ maxHeight: '300px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-7">
          <span className="badge bg-secondary mb-2 text-capitalize">{product.category}</span>
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          
          <div className="mb-3">
            <span className="fs-3 fw-bold text-success me-3">
              {formatCOP(product.price)}
            </span>
            <span className="text-muted">Marca: <strong>{product.brand || 'Genérica'}</strong></span>
          </div>

          <div className="mb-4">
            <span className="badge bg-warning text-dark me-2">★ {product.rating}</span>
            <span className="small text-muted">Stock disponible: {product.stock} unidades</span>
          </div>

          {added ? (
            <div className="alert alert-success d-flex align-items-center gap-2">
              <span>✓ ¡Producto agregado a tus pedidos con éxito!</span>
              <Link to="/pedidos" className="btn btn-sm btn-success ms-auto">Ver mis pedidos</Link>
            </div>
          ) : (
            <button onClick={handleAddOrder} className="btn btn-primary btn-lg w-100">
              Registrar Pedido (Estado: Pendiente)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};