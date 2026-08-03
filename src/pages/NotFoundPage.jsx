import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="text-center my-5 p-5">
      <h1 className="display-1 fw-bold text-secondary">404</h1>
      <h2>Página no encontrada</h2>
      <p className="text-muted">La ruta a la que intentas acceder no existe o fue movida.</p>
      <Link to="/productos" className="btn btn-primary mt-3">
        Regresar al Inicio
      </Link>
    </div>
  );
};