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
          
          <h5 className="card-title text-truncate fs-6">{product.title}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description}
          </p>
          <div className="mb-3">
            <span className="fs-6 fw-bold text-success">
              {formatCOP(product.price)}
            </span>
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