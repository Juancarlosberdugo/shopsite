const BASE_URL = 'https://dummyjson.com';

export const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);

const productTranslations = {
  'Essence Mascara Lash Princess': {
    title: 'Máscara de Pestañas Princess',
    description: 'Rímel de volumen intenso para pestañas largas, definidas y sin grumos.'
  },
  'Eyeshadow Palette with Mirror': {
    title: 'Paleta de Sombras con Espejo',
    description: 'Paleta de sombras versátil con tonos neutros para looks diarios y de noche.'
  },
  'Powder Canister': {
    title: 'Polvera Compacta',
    description: 'Elegante polvera compacta para retoques rápidos y acabado mate duradero.'
  },
  'Red Lipstick': {
    title: 'Labial Rojo Intenso',
    description: 'Labial rojo vibrante con acabado cremoso y alta duración.'
  },
  'Red Nail Polish': {
    title: 'Esmalte de Uñas Rojo',
    description: 'Esmalte rojo clásico con brillo duradero para uñas impecables.'
  },
  'Calvin Klein CK One': {
    title: 'Perfume CK One',
    description: 'Fragancia unisex fresca y moderna para el uso diario.'
  },
  'Chanel Coco Noir Eau De': {
    title: 'Perfume Chanel Coco Noir',
    description: 'Aroma elegante y seductor con notas orientales y sofisticadas.'
  },
  "Dior J'adore": {
    title: 'Perfume Dior J’adore',
    description: 'Fragancia floral premium para una impresión femenina y refinada.'
  },
  'Dolce Shine Eau de': {
    title: 'Perfume Dolce Shine',
    description: 'Aroma luminoso y dulce con estilo refinado.'
  },
  'Gucci Bloom Eau de': {
    title: 'Perfume Gucci Bloom',
    description: 'Fragancia floral intensa y moderna con carácter italiano.'
  },
  'Annibale Colombo Bed': {
    title: 'Cama Annibale Colombo',
    description: 'Cama de diseño elegante y confortable para un dormitorio moderno.'
  },
  'Annibale Colombo Sofa': {
    title: 'Sofá Annibale Colombo',
    description: 'Sofá sofisticado con líneas limpias y gran comodidad.'
  },
  'Bedside Table African Cherry': {
    title: 'Mesa de Noche African Cherry',
    description: 'Mesa de noche de madera oscura con un diseño clásico y elegante.'
  },
  'Knoll Saarinen Executive Conference Chair': {
    title: 'Silla Ejecutiva Knoll Saarinen',
    description: 'Silla de oficina ergonómica con estilo ejecutivo y soporte premium.'
  },
  'Wooden Bathroom Sink With Mirror': {
    title: 'Lavabo de Madera con Espejo',
    description: 'Lavabo decorativo con base de madera y espejo integrado para baños modernos.'
  },
  'Apple': {
    title: 'Manzana',
    description: 'Fruta fresca y crujiente perfecta para snacks saludables.'
  },
  'Beef Steak': {
    title: 'Bistec de Res',
    description: 'Corte de carne jugoso ideal para asados y comidas especiales.'
  },
  'Cat Food': {
    title: 'Comida para Gatos',
    description: 'Alimento balanceado para el cuidado diario de tu gato.'
  },
  'Chicken Meat': {
    title: 'Carne de Pollo',
    description: 'Carne de pollo fresca, suave y versátil para muchas recetas.'
  },
  'Cooking Oil': {
    title: 'Aceite de Cocina',
    description: 'Aceite para cocinar de uso diario, ideal para freír y saltear.'
  },
  'Cucumber': {
    title: 'Pepino',
    description: 'Pepino fresco con textura crujiente ideal para ensaladas.'
  },
  'Dog Food': {
    title: 'Comida para Perros',
    description: 'Alimento nutritivo para el bienestar de tu perro.'
  },
  'Eggs': {
    title: 'Huevos',
    description: 'Huevos frescos para desayunos, repostería y platos caseros.'
  },
  'Fish Steak': {
    title: 'Filete de Pescado',
    description: 'Filete de pescado fresco y suave, perfecto para preparaciones saludables.'
  },
  'Green Bell Pepper': {
    title: 'Pimiento Verde',
    description: 'Pimiento verde fresco con sabor suave para ensaladas y guisos.'
  },
  'Green Chili Pepper': {
    title: 'Ají Verde',
    description: 'Ají verde picante para dar sabor intenso a tus platos.'
  },
  'Honey Jar': {
    title: 'Tarro de Miel',
    description: 'Miel natural para endulzar bebidas y recetas saludables.'
  },
  'Ice Cream': {
    title: 'Helado',
    description: 'Helado cremoso para disfrutar como postre frío y dulce.'
  }
};

const defaultCategoryDescription = (category) => {
  switch (category) {
    case 'smartphones':
      return 'Smartphone moderno con gran desempeño y múltiples funciones.';
    case 'fragrances':
      return 'Fragancia elegante para uso diario o ocasiones especiales.';
    case 'skincare':
    case 'makeup':
      return 'Producto de cuidado personal para lucir radiante y fresco.';
    case 'groceries':
      return 'Alimento cotidiando, fresco y listo para preparar en casa.';
    case 'home-decoration':
      return 'Elemento de decoración para mejorar cualquier espacio del hogar.';
    case 'furniture':
      return 'Mueble cómodo y funcional con diseño contemporáneo.';
    default:
      return 'Producto de alta calidad para tu hogar y estilo de vida.';
  }
};

const translateProduct = (product) => ({
  ...product,
  title: productTranslations[product.title]?.title || product.title,
  description: productTranslations[product.title]?.description || defaultCategoryDescription(product.category)
});

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
  const data = await response.json();
  return {
    ...data,
    products: data.products.map(translateProduct)
  };
};

// Obtener detalle de un producto por ID
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Producto no encontrado.');
  const product = await response.json();
  return translateProduct(product);
};

// Búsqueda de productos (Opcional)
export const searchProducts = async (query) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
  if (!response.ok) throw new Error('Error al buscar productos.');
  return await response.json();
};