import { useState, useEffect } from 'react';
import { formatCOP } from '../services/api';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('shoppanel_orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem('shoppanel_orders', JSON.stringify(updated));
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Pendiente': return 'bg-warning text-dark';
      case 'Confirmado': return 'bg-primary';
      case 'Enviado': return 'bg-info text-dark';
      case 'Cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center my-5 p-5 bg-light rounded shadow-sm">
        <h4 className="fw-bold">No tienes pedidos registrados</h4>
        <p className="text-muted">Explora el catálogo y selecciona productos para gestionar tu primer pedido.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 fw-bold">Gestión de Pedidos Registrados</h2>
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Fecha de Registro</th>
              <th>Precio (COP)</th>
              <th>Estado Actual</th>
              <th>Modificar Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>
                  <img
                    src={order.thumbnail}
                    alt={order.title}
                    style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                  />
                </td>
                <td className="fw-bold">{order.title}</td>
                <td className="small text-muted">{order.createdAt}</td>
                <td className="text-success fw-bold">{formatCOP(order.price)}</td>
                <td>
                  <span className={`badge ${getBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    style={{ minWidth: '140px' }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};