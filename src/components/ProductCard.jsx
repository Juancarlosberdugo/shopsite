import { Link } from 'react-router-dom';
import { formatCOP } from '../services/api';

export const ProductCard = ({ product, onAddOrder }) => {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={product.thumbnail}
          className="card-img-top p-3 bg-light"
          alt={product.title}
          style={{ height: '180px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 align-self-start text-capitalize">
            {product.category}
          </span>
          <h5 className="card-title text-truncate fs-6">{product.title}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description.substring(0, 60)}...
          </p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Muestra el precio en COP */}
            <span className="fs-6 fw-bold text-success">
              {formatCOP(product.price)}
            </span>
            <span className="small text-warning">★ {product.rating}</span>
          </div>
          <div className="d-grid gap-2">
            <Link to={`/productos/${product.id}`} className="btn btn-outline-primary btn-sm">
              Ver Detalle
            </Link>
            <button
              onClick={() => onAddOrder(product)}
              className="btn btn-primary btn-sm"
            >
              + Agregar a Pedidos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};