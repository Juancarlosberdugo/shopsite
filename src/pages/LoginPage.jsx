import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';

export const LoginPage = () => {
  const [username, setUsername] = useState('emilys'); // Usuario de prueba de DummyJSON
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación de campos vacíos
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(username, password);
      login(data);
      navigate('/productos');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center align-items-center vh-100 m-0">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h3 className="text-center fw-bold text-primary mb-3">ShopPanel</h3>
            <p className="text-center text-muted small mb-4">Ingresa tus credenciales para acceder</p>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. emilys"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 fw-bold py-2"
                disabled={loading}
              >
                {loading ? 'Validando...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="mt-3 text-center">
              <small className="text-muted">
                Credencial de prueba: <strong>emilys</strong> / <strong>emilyspass</strong>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};