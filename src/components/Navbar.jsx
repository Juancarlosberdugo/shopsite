import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/productos">
          🛒 ShopPanel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/productos">
                Catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/pedidos">
                Mis Pedidos
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center text-light gap-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src={user?.image || 'https://via.placeholder.com/35'}
                alt={user?.username}
                className="rounded-circle border"
                style={{ width: '35px', height: '35px', objectFit: 'cover' }}
              />
              <span className="small">Hola, <strong>{user?.firstName || user?.username}</strong></span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};