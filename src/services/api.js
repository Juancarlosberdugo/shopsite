const BASE_URL = 'https://dummyjson.com';

// Autenticación de usuario
export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Credenciales inválidas o error en el servidor.');
  }

  return await response.json();
};

// Obtener catálogo de productos
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('No se pudieron obtener los productos.');
  return await response.json();
};

// Obtener detalle de un producto por ID
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Producto no encontrado.');
  return await response.json();
};

// Búsqueda de productos (Opcional)
export const searchProducts = async (query) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
  if (!response.ok) throw new Error('Error al buscar productos.');
  return await response.json();
};