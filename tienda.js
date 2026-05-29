// ===== DEFAULT PRODUCTS (fallback cuando no hay datos guardados) =====
const DEFAULT_PRODUCTS = [
  // Frutas y Verduras
  { id: 1, name: 'Manzana Roja x kg', category: 'frutas', price: 6.50, emoji: '🍎', desc: 'Manzanas rojas frescas, dulces y crujientes. Perfectas para jugos o consumo directo.', badge: 'Oferta' },
  { id: 2, name: 'Plátano de Seda x kg', category: 'frutas', price: 4.20, emoji: '🍌', desc: 'Plátanos dulces y suaves, ideales para postres o desayunos.' },
  { id: 3, name: 'Papaya x kg', category: 'frutas', price: 5.00, emoji: '🍈', desc: 'Papaya jugosa y dulce, rica en vitamina C.', badge: 'Nuevo' },
  { id: 4, name: 'Fresas x 500g', category: 'frutas', price: 7.50, emoji: '🍓', desc: 'Fresas frescas importadas, perfectas para postres y jugos.' },
  { id: 5, name: 'Limón x kg', category: 'frutas', price: 3.80, emoji: '🍋', desc: 'Limones frescos, ideales para ceviche y bebidas.' },
  { id: 6, name: 'Cebolla Roja x kg', category: 'frutas', price: 3.20, emoji: '🧅', desc: 'Cebolla roja nacional, ideal para ensaladas y guisos.' },
  { id: 7, name: 'Papa Amarilla x kg', category: 'frutas', price: 4.00, emoji: '🥔', desc: 'Papa amarilla peruana, perfecta para puré y sopas.' },
  { id: 8, name: 'Tomate Italiano x kg', category: 'frutas', price: 4.50, emoji: '🍅', desc: 'Tomates frescos y carnosos, ideales para salsas y ensaladas.' },
  { id: 9, name: 'Aguacate x unidad', category: 'frutas', price: 3.00, emoji: '🥑', desc: 'Aguacates maduros y cremosos.', badge: 'Oferta' },
  // Lácteos
  { id: 10, name: 'Leche Fresca x 1L', category: 'lacteos', price: 5.50, emoji: '🥛', desc: 'Leche fresca pasteurizada, cremosa y nutritiva.' },
  { id: 11, name: 'Yogurt Natural x 1L', category: 'lacteos', price: 7.00, emoji: '🫗', desc: 'Yogurt natural sin azúcar, ideal para desayunos saludables.' },
  { id: 12, name: 'Queso Fresco x 250g', category: 'lacteos', price: 6.00, emoji: '🧀', desc: 'Queso fresco artesanal, suave y delicioso.' },
  { id: 13, name: 'Mantequilla x 200g', category: 'lacteos', price: 8.50, emoji: '🧈', desc: 'Mantequilla cremosa, ideal para untar y hornear.' },
  { id: 14, name: 'Huevos de Granja x 30', category: 'lacteos', price: 14.00, emoji: '🥚', desc: 'Huevos frescos de granja, ricos en proteínas.', badge: 'Oferta' },
  { id: 15, name: 'Crema de Leche x 200ml', category: 'lacteos', price: 6.50, emoji: '🥛', desc: 'Crema de leche espesa, ideal para cocina y postres.' },
  // Panadería
  { id: 16, name: 'Pan Molde Integral x 500g', category: 'panaderia', price: 7.50, emoji: '🍞', desc: 'Pan integral suave y nutritivo, rico en fibra.' },
  { id: 17, name: 'Pan Francés x unidad', category: 'panaderia', price: 1.50, emoji: '🥖', desc: 'Pan francés crujiente, horneado diariamente.' },
  { id: 18, name: 'Tortillas de Harina x 6', category: 'panaderia', price: 5.00, emoji: '🫓', desc: 'Tortillas suaves, perfectas para wraps y tacos.' },
  { id: 19, name: 'Galletas de Avena x 200g', category: 'panaderia', price: 6.00, emoji: '🍪', desc: 'Galletas caseras de avena con pasas.' },
  // Bebidas
  { id: 20, name: 'Agua Mineral x 1.5L', category: 'bebidas', price: 3.00, emoji: '💧', desc: 'Agua mineral natural, hidratación pura.' },
  { id: 21, name: 'Gaseosa Cola x 2L', category: 'bebidas', price: 7.00, emoji: '🥤', desc: 'Gaseosa cola para compartir en familia.' },
  { id: 22, name: 'Jugo de Naranja x 1L', category: 'bebidas', price: 8.00, emoji: '🍊', desc: 'Jugo de naranja natural, sin azúcar añadida.', badge: 'Nuevo' },
  { id: 23, name: 'Cerveza Artesanal x 330ml', category: 'bebidas', price: 12.00, emoji: '🍺', desc: 'Cerveza artesanal local, sabor único.' },
  { id: 24, name: 'Inca Kola x 2L', category: 'bebidas', price: 7.50, emoji: '🥤', desc: 'La gaseosa peruana más tradicional.' },
  { id: 25, name: 'Café Molido x 250g', category: 'bebidas', price: 15.00, emoji: '☕', desc: 'Café peruano de altura, molido y aromático.', badge: 'Oferta' },
  // Despensa
  { id: 26, name: 'Arroz Extra x 5kg', category: 'despensa', price: 18.50, emoji: '🍚', desc: 'Arroz extra premium, el mejor para tu mesa.', badge: 'Oferta' },
  { id: 27, name: 'Fideos Spaghetti x 500g', category: 'despensa', price: 4.00, emoji: '🍝', desc: 'Fideos de pasta dura, cocción perfecta.' },
  { id: 28, name: 'Aceite Vegetal x 1L', category: 'despensa', price: 9.00, emoji: '🫒', desc: 'Aceite vegetal puro, ideal para cocinar.' },
  { id: 29, name: 'Azúcar Blanca x 2kg', category: 'despensa', price: 7.00, emoji: '🍬', desc: 'Azúcar blanca refinada, endulza tus comidas.' },
  { id: 30, name: 'Sal de Mesa x 500g', category: 'despensa', price: 2.00, emoji: '🧂', desc: 'Sal de mesa fina, yodada.' },
  { id: 31, name: 'Lentejas x 500g', category: 'despensa', price: 5.50, emoji: '🫘', desc: 'Lentejas seleccionadas, ricas en hierro.' },
  { id: 32, name: 'Atún en Lata x 170g', category: 'despensa', price: 5.00, emoji: '🥫', desc: 'Atún en aceite vegetal, práctico y delicioso.' },
  { id: 33, name: 'Salsa de Tomate x 500g', category: 'despensa', price: 6.50, emoji: '🥫', desc: 'Salsa de tomate casera, lista para usar.' },
  // Limpieza
  { id: 34, name: 'Detergente Líquido x 1L', category: 'limpieza', price: 12.00, emoji: '🧴', desc: 'Detergente líquido concentrado, fresco aroma.' },
  { id: 35, name: 'Lavavajillas x 750ml', category: 'limpieza', price: 8.00, emoji: '🧼', desc: 'Lavavajillas líquido con poder desengrasante.' },
  { id: 36, name: 'Lejía x 1L', category: 'limpieza', price: 4.50, emoji: '🧪', desc: 'Lejía concentrada, desinfección total.' },
  { id: 37, name: 'Papel Higiénico x 12 rollos', category: 'limpieza', price: 16.00, emoji: '🧻', desc: 'Papel higiénico suave, triple hoja.', badge: 'Oferta' },
  { id: 38, name: 'Esponja Multiusos x 3', category: 'limpieza', price: 4.00, emoji: '🧽', desc: 'Esponjas resistentes para limpieza general.' },
  // Snacks
  { id: 39, name: 'Papas Fritas x 150g', category: 'snacks', price: 5.00, emoji: '🍟', desc: 'Papas fritas crocantes, sabor original.' },
  { id: 40, name: 'Chocolate con Leche x 100g', category: 'snacks', price: 7.00, emoji: '🍫', desc: 'Chocolate cremoso con leche, irresistible.' },
  { id: 41, name: 'Mix de Frutos Secos x 200g', category: 'snacks', price: 12.00, emoji: '🥜', desc: 'Mix de almendras, nueces y pasas.', badge: 'Nuevo' },
  { id: 42, name: 'Chizitos x 200g', category: 'snacks', price: 4.50, emoji: '🫘', desc: 'Snack crocante de maíz, sabor queso.' },
  // Carnes y Pollo
  { id: 43, name: 'Pollo Entero x 2kg', category: 'carnes', price: 22.00, emoji: '🍗', desc: 'Pollo fresco de corral, criado sin hormonas.', badge: 'Oferta' },
  { id: 44, name: 'Carne Molida x 500g', category: 'carnes', price: 15.00, emoji: '🥩', desc: 'Carne molida de res, 90% magra.' },
  { id: 45, name: 'Pechuga de Pollo x 500g', category: 'carnes', price: 13.00, emoji: '🍗', desc: 'Pechuga de pollo fresca, sin piel.' },
  { id: 46, name: 'Chorizo Parrillero x 400g', category: 'carnes', price: 14.00, emoji: '🌭', desc: 'Chorizo artesanal para parrilla, especias únicas.' },
  { id: 47, name: 'Pescado Fresco x 500g', category: 'carnes', price: 18.00, emoji: '🐟', desc: 'Filete de pescado fresco del día.', badge: 'Nuevo' }
];

const CATEGORIES = [
  { id: 'frutas', name: 'Frutas y Verduras', icon: 'fa-solid fa-apple-whole', color: '#E74C3C', bg: '#FDEDEC' },
  { id: 'lacteos', name: 'Lácteos', icon: 'fa-solid fa-cow', color: '#3498DB', bg: '#EBF5FB' },
  { id: 'panaderia', name: 'Panadería', icon: 'fa-solid fa-bread-slice', color: '#E67E22', bg: '#FEF5E7' },
  { id: 'bebidas', name: 'Bebidas', icon: 'fa-solid fa-wine-bottle', color: '#9B59B6', bg: '#F4ECF7' },
  { id: 'despensa', name: 'Despensa', icon: 'fa-solid fa-wheat-awn', color: '#F39C12', bg: '#FEF9E7' },
  { id: 'limpieza', name: 'Limpieza', icon: 'fa-solid fa-soap', color: '#1ABC9C', bg: '#E8F6F3' },
  { id: 'snacks', name: 'Snacks', icon: 'fa-solid fa-cookie', color: '#E91E63', bg: '#FCE4EC' },
  { id: 'carnes', name: 'Carnes y Pollo', icon: 'fa-solid fa-drumstick-bite', color: '#D35400', bg: '#FAE5D3' }
];

// ===== PRODUCT MANAGER (Catálogo Dinámico) =====
class ProductManager {
  constructor() {
    this._products = [];
    this._nextId = 1;
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.getAll()));
  }

  getAll() {
    return [...this._products];
  }

  getById(id) {
    return this._products.find(p => p.id === id);
  }

  getByCategory(categoryId) {
    return this._products.filter(p => p.category === categoryId);
  }

  search(term) {
    const t = term.toLowerCase();
    return this._products.filter(p =>
      p.name.toLowerCase().includes(t) || p.desc.toLowerCase().includes(t)
    );
  }

  add(data) {
    const product = {
      id: this._nextId++,
      name: data.name.trim(),
      category: data.category,
      price: parseFloat(data.price) || 0,
      emoji: data.emoji || '📦',
      desc: data.desc ? data.desc.trim() : '',
      badge: data.badge || ''
    };
    this._products.push(product);
    this._save();
    this._notify();
    return product;
  }

  update(id, data) {
    const idx = this._products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const product = this._products[idx];
    if (data.name !== undefined) product.name = data.name.trim();
    if (data.category !== undefined) product.category = data.category;
    if (data.price !== undefined) product.price = parseFloat(data.price) || 0;
    if (data.emoji !== undefined) product.emoji = data.emoji || '📦';
    if (data.desc !== undefined) product.desc = data.desc.trim();
    if (data.badge !== undefined) product.badge = data.badge;
    this._save();
    this._notify();
    return product;
  }

  delete(id) {
    this._products = this._products.filter(p => p.id !== id);
    this._save();
    this._notify();
  }

  getNextId() {
    return this._nextId;
  }

  get count() {
    return this._products.length;
  }

  _load() {
    try {
      const stored = localStorage.getItem('mdj_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._products = parsed;
          this._nextId = Math.max(...parsed.map(p => p.id), 0) + 1;
          return;
        }
      }
    } catch {}
    // Fallback to defaults
    this._products = DEFAULT_PRODUCTS.map(p => ({ ...p }));
    this._nextId = Math.max(...this._products.map(p => p.id), 0) + 1;
    this._save();
  }

  _save() {
    try {
      localStorage.setItem('mdj_products', JSON.stringify(this._products));
    } catch {}
  }
}

// ===== ORDER HISTORY =====
class OrderHistory {
  constructor() {
    this._orders = [];
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.getAll()));
  }

  addOrder(orderData) {
    const order = {
      id: 'MDJ-' + String(this._nextOrderNum()).padStart(4, '0'),
      ...orderData,
      status: 'pending',
      createdAt: Date.now()
    };
    this._orders.unshift(order);
    this._save();
    this._notify();
    return order;
  }

  getAll() {
    return [...this._orders];
  }

  getById(id) {
    return this._orders.find(o => o.id === id);
  }

  updateStatus(id, newStatus) {
    const order = this._orders.find(o => o.id === id);
    if (!order) return false;
    order.status = newStatus;
    this._save();
    this._notify();
    return true;
  }

  get totalRevenue() {
    return this._orders.reduce((sum, o) => sum + (o.total || 0), 0);
  }

  get uniqueClients() {
    return new Set(this._orders.map(o => o.phone)).size;
  }

  get count() {
    return this._orders.length;
  }

  _nextOrderNum() {
    if (this._orders.length === 0) return 1;
    const nums = this._orders.map(o => {
      const match = o.id.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    });
    return Math.max(...nums, 0) + 1;
  }

  _load() {
    try {
      const stored = localStorage.getItem('mdj_orders');
      if (stored) {
        this._orders = JSON.parse(stored);
      }
    } catch {}
  }

  _save() {
    try {
      localStorage.setItem('mdj_orders', JSON.stringify(this._orders));
    } catch {}
  }
}

// ===== CART MANAGER =====
class Cart {
  constructor() {
    this.items = [];
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.items));
  }

  add(productId, quantity = 1) {
    const existing = this.items.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
    this._save();
    this._notify();
    return true;
  }

  remove(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this._save();
    this._notify();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this._save();
      this._notify();
    }
  }

  clear() {
    this.items = [];
    this._save();
    this._notify();
  }

  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal() {
    return this.items.reduce((sum, item) => {
      const product = productManager.getById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  get shipping() {
    return this.subtotal >= 50 ? 0 : 8;
  }

  get total() {
    return this.subtotal + this.shipping;
  }

  getItems() {
    return this.items.map(item => ({
      ...item,
      product: productManager.getById(item.productId)
    })).filter(item => item.product !== undefined);
  }

  _save() {
    try {
      localStorage.setItem('mdj_cart', JSON.stringify(this.items));
    } catch {}
  }

  _load() {
    try {
      const stored = localStorage.getItem('mdj_cart');
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch {}
  }
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(amount) {
  return 'S/ ' + amount.toFixed(2);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getCategoryName(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id);
}

// ===== STATE =====
const productManager = new ProductManager();
const orderHistory = new OrderHistory();
const cart = new Cart();
let currentCategory = 'all';
let currentSearch = '';
let adminLoggedIn = false;

// ===== DOM REFERENCES =====
// Navigation
const headerLinks = document.querySelectorAll('.header-link');
const heroSection = document.getElementById('hero');
const categoriesSection = document.getElementById('categories');
const featuredSection = document.getElementById('featured');
const allProductsSection = document.getElementById('allProducts');
const contactSection = document.getElementById('contactSection');

// Products
const featuredGrid = document.getElementById('featuredGrid');
const productsGrid = document.getElementById('productsGrid');
const productsEmpty = document.getElementById('productsEmpty');
const filterChips = document.getElementById('filterChips');
const categoriesGrid = document.getElementById('categoriesGrid');

// Search
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');

// Cart
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartEmpty = document.getElementById('cartEmpty');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShipping = document.getElementById('cartShipping');
const cartTotal = document.getElementById('cartTotal');
const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
const cartWhatsAppBtn = document.getElementById('cartWhatsAppBtn');
const cartEmptyBtn = document.getElementById('cartEmptyBtn');

// Checkout
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutClose = document.getElementById('checkoutClose');
const checkoutFormEl = document.getElementById('checkoutForm');
const checkoutSuccessEl = document.getElementById('checkoutSuccess');
const checkoutName = document.getElementById('checkoutName');
const checkoutPhone = document.getElementById('checkoutPhone');
const checkoutAddress = document.getElementById('checkoutAddress');
const checkoutDistrict = document.getElementById('checkoutDistrict');
const checkoutPayment = document.getElementById('checkoutPayment');
const checkoutNotes = document.getElementById('checkoutNotes');
const checkoutItemsEl = document.getElementById('checkoutItems');
const checkoutSubtotal = document.getElementById('checkoutSubtotal');
const checkoutShipping = document.getElementById('checkoutShipping');
const checkoutTotal = document.getElementById('checkoutTotal');
const checkoutSubmit = document.getElementById('checkoutSubmit');
const checkoutError = document.getElementById('checkoutError');
const orderId = document.getElementById('orderId');
const orderPhone = document.getElementById('orderPhone');
const orderAddress = document.getElementById('orderAddress');
const orderPayment = document.getElementById('orderPayment');
const checkoutNewOrder = document.getElementById('checkoutNewOrder');

// Toast
const toast = document.getElementById('toast');

// Others
const heroWhatsApp = document.getElementById('heroWhatsApp');
const whatsappFloat = document.getElementById('whatsappFloat');

// Admin
const adminLink = document.getElementById('adminLink');
const adminOverlay = document.getElementById('adminOverlay');
const adminModal = document.getElementById('adminModal');
const adminClose = document.getElementById('adminClose');
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLoginError = document.getElementById('adminLoginError');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const adminLoggedUser = document.getElementById('adminLoggedUser');
const adminTabs = document.querySelectorAll('.admin-tab');
const adminTabContents = document.querySelectorAll('.admin-tab-content');
const adminProductsBody = document.getElementById('adminProductsBody');
const adminOrdersBody = document.getElementById('adminOrdersBody');
const adminOrdersEmpty = document.getElementById('adminOrdersEmpty');
const adminOrdersTableContainer = document.getElementById('adminOrdersTableContainer');
const adminAddProductBtn = document.getElementById('adminAddProductBtn');
const statProducts = document.getElementById('statProducts');
const statOrders = document.getElementById('statOrders');
const statRevenue = document.getElementById('statRevenue');
const statClients = document.getElementById('statClients');

// Admin Form
const adminFormOverlay = document.getElementById('adminFormOverlay');
const adminFormModal = document.getElementById('adminFormModal');
const adminFormClose = document.getElementById('adminFormClose');
const adminFormCancel = document.getElementById('adminFormCancel');
const adminFormTitle = document.getElementById('adminFormTitle');
const adminFormProductId = document.getElementById('adminFormProductId');
const adminFormName = document.getElementById('adminFormName');
const adminFormCategory = document.getElementById('adminFormCategory');
const adminFormPrice = document.getElementById('adminFormPrice');
const adminFormEmoji = document.getElementById('adminFormEmoji');
const adminFormDesc = document.getElementById('adminFormDesc');
const adminFormBadge = document.getElementById('adminFormBadge');
const adminFormSave = document.getElementById('adminFormSave');
const adminFormError = document.getElementById('adminFormError');

// Order History (client)
const orderHistoryLink = document.getElementById('orderHistoryLink');
const orderHistoryOverlay = document.getElementById('orderHistoryOverlay');
const orderHistoryModal = document.getElementById('orderHistoryModal');
const orderHistoryClose = document.getElementById('orderHistoryClose');
const orderHistoryEmpty = document.getElementById('orderHistoryEmpty');
const orderHistoryList = document.getElementById('orderHistoryList');
const orderHistoryItems = document.getElementById('orderHistoryItems');

// ===== TOAST =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== RENDER FUNCTIONS =====

// Categories
function renderCategories() {
  categoriesGrid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const count = productManager.getByCategory(cat.id).length;
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.category = cat.id;
    card.innerHTML = `
      <div class="category-card-icon" style="background:${cat.bg};color:${cat.color}">
        <i class="${cat.icon}"></i>
      </div>
      <div class="category-card-name">${escapeHtml(cat.name)}</div>
      <div class="category-card-count">${count} productos</div>
    `;
    card.addEventListener('click', () => {
      currentCategory = cat.id;
      showPage('products');
      updateFilterChips();
      renderProducts();
      allProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    categoriesGrid.appendChild(card);
  });
}

// Products
function renderFeatured() {
  const all = productManager.getAll();
  const featured = [...all].sort(() => Math.random() - 0.5).slice(0, 8);
  featuredGrid.innerHTML = '';
  featured.forEach((product, i) => {
    featuredGrid.appendChild(createProductCard(product, i));
  });
}

function renderProducts() {
  let filtered = productManager.getAll();

  if (currentSearch) {
    filtered = productManager.search(currentSearch);
  }

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    productsEmpty.classList.remove('hidden');
    return;
  }

  productsEmpty.classList.add('hidden');
  productsGrid.innerHTML = '';
  filtered.forEach((product, i) => {
    productsGrid.appendChild(createProductCard(product, i));
  });
}

function createProductCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.animationDelay = `${(index % 12) * 0.05}s`;
  card.dataset.productId = product.id;

  const badgeHtml = product.badge
    ? `<span class="product-card-badge ${product.badge === 'Nuevo' ? 'new' : ''}">${product.badge === 'Oferta' ? '🔥 ' : '✨ '}${product.badge}</span>`
    : '';

  const cartItem = cart.items.find(i => i.productId === product.id);
  const inCart = cartItem ? cartItem.quantity : 0;

  card.innerHTML = `
    <div class="product-card-image">
      <span class="product-emoji">${product.emoji || '📦'}</span>
      ${badgeHtml}
    </div>
    <div class="product-card-body">
      <div class="product-card-category">${getCategoryName(product.category)}</div>
      <div class="product-card-name">${escapeHtml(product.name)}</div>
      <div class="product-card-desc">${escapeHtml(product.desc)}</div>
      <div class="product-card-footer">
        <div class="product-card-price">
          ${formatPrice(product.price)}
        </div>
        <button class="product-card-add ${inCart > 0 ? 'added' : ''}" data-action="add" title="${inCart > 0 ? 'Agregar otro' : 'Agregar al carrito'}">
          <i class="fa-solid ${inCart > 0 ? 'fa-check' : 'fa-plus'}"></i>
        </button>
      </div>
    </div>
  `;

  const addBtn = card.querySelector('[data-action="add"]');
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cart.add(product.id);
    showToast(`${product.name} agregado al carrito`);
    addBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    addBtn.classList.add('added');
    setTimeout(() => {
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
      addBtn.classList.remove('added');
    }, 800);
  });

  return card;
}

// Filter chips
function renderFilterChips() {
  filterChips.innerHTML = '';
  const allChip = document.createElement('button');
  allChip.className = `filter-chip ${currentCategory === 'all' ? 'active' : ''}`;
  allChip.dataset.category = 'all';
  allChip.textContent = 'Todos';
  allChip.addEventListener('click', () => {
    currentCategory = 'all';
    updateFilterChips();
    renderProducts();
  });
  filterChips.appendChild(allChip);

  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `filter-chip ${currentCategory === cat.id ? 'active' : ''}`;
    chip.dataset.category = cat.id;
    chip.textContent = cat.name;
    chip.addEventListener('click', () => {
      currentCategory = cat.id;
      updateFilterChips();
      renderProducts();
    });
    filterChips.appendChild(chip);
  });
}

function updateFilterChips() {
  filterChips.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.category === currentCategory);
  });
}

// ===== CART UI =====
function updateCartUI() {
  const count = cart.count;
  if (count > 0) {
    cartBadge.textContent = count;
    cartBadge.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
  }
}

function renderCartSidebar() {
  const items = cart.getItems();

  if (items.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartItems.classList.add('hidden');
    cartFooter.classList.add('hidden');
    return;
  }

  cartEmpty.classList.add('hidden');
  cartItems.classList.remove('hidden');
  cartFooter.classList.remove('hidden');

  cartItems.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-image">${item.product.emoji || '📦'}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHtml(item.product.name)}</div>
        <div class="cart-item-price">${formatPrice(item.product.price)}</div>
        <div class="cart-item-quantity">
          <button class="cart-item-qty-btn" data-action="dec" data-id="${item.productId}">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="cart-item-qty-btn" data-action="inc" data-id="${item.productId}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="cart-item-remove" data-action="remove" data-id="${item.productId}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

    el.querySelector('[data-action="inc"]').addEventListener('click', () => {
      cart.updateQuantity(item.productId, item.quantity + 1);
    });
    el.querySelector('[data-action="dec"]').addEventListener('click', () => {
      cart.updateQuantity(item.productId, item.quantity - 1);
    });
    el.querySelector('[data-action="remove"]').addEventListener('click', () => {
      cart.remove(item.productId);
      showToast(`${item.product.name} eliminado del carrito`);
    });

    cartItems.appendChild(el);
  });

  cartSubtotal.textContent = formatPrice(cart.subtotal);
  cartShipping.textContent = cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping);
  cartTotal.textContent = formatPrice(cart.total);
}

// ===== CHECKOUT =====
function renderCheckoutSummary() {
  const items = cart.getItems();
  checkoutItemsEl.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'checkout-item';
    el.innerHTML = `
      <span>${escapeHtml(item.product.name)} x${item.quantity}</span>
      <span>${formatPrice(item.product.price * item.quantity)}</span>
    `;
    checkoutItemsEl.appendChild(el);
  });

  checkoutSubtotal.textContent = formatPrice(cart.subtotal);
  checkoutShipping.textContent = cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping);
  checkoutTotal.textContent = formatPrice(cart.total);
}

function openCheckout() {
  if (cart.count === 0) {
    showToast('Agrega productos al carrito primero');
    return;
  }
  closeCart();
  checkoutFormEl.classList.remove('hidden');
  checkoutSuccessEl.classList.add('hidden');
  checkoutError.textContent = '';
  checkoutSubmit.disabled = false;
  checkoutSubmit.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirmar pedido';
  checkoutName.value = '';
  checkoutPhone.value = '';
  checkoutAddress.value = '';
  checkoutDistrict.value = '';
  checkoutPayment.value = '';
  checkoutNotes.value = '';
  checkoutOverlay.classList.remove('hidden');
  checkoutModal.classList.remove('hidden');
  renderCheckoutSummary();
  setTimeout(() => checkoutName.focus(), 200);
}

function closeCheckout() {
  checkoutOverlay.classList.add('hidden');
  checkoutModal.classList.add('hidden');
}

function handleCheckout() {
  const name = checkoutName.value.trim();
  const phone = checkoutPhone.value.trim();
  const address = checkoutAddress.value.trim();
  const district = checkoutDistrict.value;
  const payment = checkoutPayment.value;
  const notes = checkoutNotes.value.trim();

  if (!name) { checkoutError.textContent = 'Por favor ingresa tu nombre'; checkoutName.focus(); return; }
  if (!phone) { checkoutError.textContent = 'Por favor ingresa tu teléfono'; checkoutPhone.focus(); return; }
  if (!address) { checkoutError.textContent = 'Por favor ingresa tu dirección'; checkoutAddress.focus(); return; }
  if (!district) { checkoutError.textContent = 'Por favor selecciona tu distrito'; checkoutDistrict.focus(); return; }
  if (!payment) { checkoutError.textContent = 'Por favor selecciona tu método de pago'; checkoutPayment.focus(); return; }

  checkoutError.textContent = '';
  checkoutSubmit.disabled = true;
  checkoutSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';

  setTimeout(() => {
    const items = cart.getItems();
    const itemList = items.map(i => `• ${i.product.emoji} ${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`).join('\n');

    // Save order to history
    const order = orderHistory.addOrder({
      name,
      phone,
      address: `${address}, ${district}`,
      district,
      payment,
      notes,
      items: items.map(i => ({
        productId: i.productId,
        productName: i.product.name,
        productEmoji: i.product.emoji,
        quantity: i.quantity,
        price: i.product.price
      })),
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      total: cart.total
    });

    // Show success
    checkoutFormEl.classList.add('hidden');
    checkoutSuccessEl.classList.remove('hidden');
    orderId.textContent = order.id;
    orderPhone.textContent = phone;
    orderAddress.textContent = `${address}, ${district}`;
    orderPayment.textContent = payment;

    const waMessage = encodeURIComponent(
      `🛒 *Nuevo Pedido - ${order.id}*\n\n` +
      `*Cliente:* ${name}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Dirección:* ${address}, ${district}\n` +
      `*Pago:* ${payment}\n` +
      (notes ? `*Notas:* ${notes}\n\n` : '\n') +
      `*Productos:*\n${itemList}\n\n` +
      `*Subtotal:* ${formatPrice(cart.subtotal)}\n` +
      `*Envío:* ${cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping)}\n` +
      `*Total: ${formatPrice(cart.total)}*`
    );

    heroWhatsApp.href = `https://wa.me/51999888777?text=${waMessage}`;
    whatsappFloat.href = `https://wa.me/51999888777?text=${waMessage}`;

    cart.clear();

    checkoutSubmit.disabled = false;
    checkoutSubmit.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirmar pedido';
  }, 1200);
}

// ===== PAGE NAVIGATION =====
function showPage(page) {
  headerLinks.forEach(l => l.classList.remove('active'));

  heroSection.style.display = 'none';
  allProductsSection.style.display = 'none';
  contactSection.style.display = 'none';

  if (page === 'home') {
    document.querySelector('[data-page="home"]').classList.add('active');
    heroSection.style.display = '';
    allProductsSection.style.display = '';
    contactSection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (page === 'products') {
    document.querySelector('[data-page="products"]').classList.add('active');
    allProductsSection.style.display = '';
    allProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (page === 'contact') {
    document.querySelector('[data-page="contact"]').classList.add('active');
    contactSection.style.display = '';
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ===== CART SIDEBAR TOGGLE =====
function openCart() {
  renderCartSidebar();
  cartOverlay.classList.remove('hidden');
  cartSidebar.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOverlay.classList.add('hidden');
  cartSidebar.classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== WHATSAPP ORDER =====
function buildWhatsAppOrder() {
  if (cart.count === 0) {
    showToast('Agrega productos al carrito primero');
    return;
  }

  const items = cart.getItems();
  const itemList = items.map(i => `• ${i.product.emoji} ${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`).join('\n');
  const message = encodeURIComponent(
    `🛒 *Pedido por WhatsApp*\n\n` +
    `*Productos:*\n${itemList}\n\n` +
    `*Subtotal:* ${formatPrice(cart.subtotal)}\n` +
    `*Envío:* ${cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping)}\n` +
    `*Total: ${formatPrice(cart.total)}*\n\n` +
    `Por favor, envíame la confirmación del pedido. ¡Gracias! 🙏`
  );

  window.open(`https://wa.me/51999888777?text=${message}`, '_blank');
}

// ===== ADMIN PANEL =====
const ADMIN_PASSWORD = 'admin123';

function openAdmin() {
  closeCart();
  closeCheckout();
  closeOrderHistory();
  adminOverlay.classList.remove('hidden');
  adminModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (adminLoggedIn) {
    showAdminDashboard();
  } else {
    adminLogin.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
    adminPasswordInput.value = '';
    adminLoginError.textContent = '';
    setTimeout(() => adminPasswordInput.focus(), 200);
  }
}

function closeAdmin() {
  adminOverlay.classList.add('hidden');
  adminModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function handleAdminLogin() {
  const pass = adminPasswordInput.value.trim();
  if (pass === ADMIN_PASSWORD) {
    adminLoggedIn = true;
    adminLogin.classList.add('hidden');
    showAdminDashboard();
  } else {
    adminLoginError.textContent = 'Contraseña incorrecta';
    adminPasswordInput.value = '';
    adminPasswordInput.focus();
  }
}

function handleAdminLogout() {
  adminLoggedIn = false;
  adminLogin.classList.remove('hidden');
  adminDashboard.classList.add('hidden');
  adminPasswordInput.value = '';
  adminLoginError.textContent = '';
}

function showAdminDashboard() {
  adminDashboard.classList.remove('hidden');
  adminLoggedUser.textContent = 'Admin';
  switchAdminTab('products');
  renderAdminProducts();
  renderAdminOrders();
  renderAdminStats();
}

function switchAdminTab(tabId) {
  adminTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });
  adminTabContents.forEach(content => {
    content.classList.toggle('active', content.id === 'adminTab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  });
}

// Render admin products table
function renderAdminProducts() {
  const products = productManager.getAll();
  adminProductsBody.innerHTML = '';

  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="product-cell">
          <div class="product-cell-emoji">${p.emoji || '📦'}</div>
          <div>
            <div class="product-cell-name">${escapeHtml(p.name)}</div>
          </div>
        </div>
      </td>
      <td><span class="category-cell">${getCategoryName(p.category)}</span></td>
      <td><span class="price-cell">${formatPrice(p.price)}</span></td>
      <td class="badge-cell">${p.badge ? `<span class="badge-tag ${p.badge === 'Oferta' ? 'oferta' : 'nuevo'}">${p.badge}</span>` : '—'}</td>
      <td>
        <div class="admin-actions">
          <button class="admin-action-btn edit" data-action="edit-product" data-id="${p.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="admin-action-btn delete" data-action="delete-product" data-id="${p.id}" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    adminProductsBody.appendChild(tr);
  });

  // Event listeners for edit/delete
  adminProductsBody.querySelectorAll('[data-action="edit-product"]').forEach(btn => {
    btn.addEventListener('click', () => openAdminForm(parseInt(btn.dataset.id)));
  });
  adminProductsBody.querySelectorAll('[data-action="delete-product"]').forEach(btn => {
    btn.addEventListener('click', () => handleDeleteProduct(parseInt(btn.dataset.id)));
  });
}

// Render admin orders table
function renderAdminOrders() {
  const orders = orderHistory.getAll();

  if (orders.length === 0) {
    adminOrdersEmpty.classList.remove('hidden');
    adminOrdersTableContainer.classList.add('hidden');
    return;
  }

  adminOrdersEmpty.classList.add('hidden');
  adminOrdersTableContainer.classList.remove('hidden');

  adminOrdersBody.innerHTML = '';
  orders.forEach(order => {
    const statusMap = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      shipping: 'En envío',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>${escapeHtml(order.name)}<br><small style="color:var(--text-tertiary)">${order.phone}</small></td>
      <td class="price-cell">${formatPrice(order.total)}</td>
      <td><small style="color:var(--text-tertiary)">${formatDate(order.createdAt)}</small></td>
      <td>
        <select class="status-select" data-action="change-status" data-id="${order.id}">
          <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
          <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>✅ Confirmado</option>
          <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>🚚 En envío</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>📦 Entregado</option>
          <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>❌ Cancelado</option>
        </select>
      </td>
      <td>
        <div class="admin-actions">
          <button class="admin-action-btn view" data-action="view-order" data-id="${order.id}" title="Ver detalle"><i class="fa-solid fa-eye"></i></button>
        </div>
      </td>
    `;
    adminOrdersBody.appendChild(tr);
  });

  // Status change handlers
  adminOrdersBody.querySelectorAll('[data-action="change-status"]').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = sel.dataset.id;
      const newStatus = sel.value;
      orderHistory.updateStatus(id, newStatus);
      showToast(`Pedido ${id} actualizado a "${getStatusLabel(newStatus)}"`);
      renderAdminStats();
    });
  });

  // View order handlers
  adminOrdersBody.querySelectorAll('[data-action="view-order"]').forEach(btn => {
    btn.addEventListener('click', () => showOrderDetail(btn.dataset.id));
  });
}

function getStatusLabel(status) {
  const labels = { pending: 'Pendiente', confirmed: 'Confirmado', shipping: 'En envío', delivered: 'Entregado', cancelled: 'Cancelado' };
  return labels[status] || status;
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
    d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

// Show order detail in a simple alert-style popup
function showOrderDetail(orderId) {
  const order = orderHistory.getById(orderId);
  if (!order) return;

  const itemsHtml = (order.items || []).map(i =>
    `  ${i.productEmoji || '📦'} ${i.productName} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`
  ).join('\n');

  const message =
    `📋 Pedido: ${order.id}\n` +
    `📅 ${formatDate(order.createdAt)}\n` +
    `👤 ${order.name}\n` +
    `📞 ${order.phone}\n` +
    `📍 ${order.address}\n` +
    `💳 ${order.payment}\n` +
    `📌 Estado: ${getStatusLabel(order.status)}\n` +
    (order.notes ? `📝 Notas: ${order.notes}\n` : '') +
    `\n🛒 Productos:\n${itemsHtml}\n\n` +
    `Subtotal: ${formatPrice(order.subtotal)}\n` +
    `Envío: ${order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}\n` +
    `💵 TOTAL: ${formatPrice(order.total)}`;

  alert(message);
}

// Render admin stats
function renderAdminStats() {
  statProducts.textContent = productManager.count;
  statOrders.textContent = orderHistory.count;
  statRevenue.textContent = formatPrice(orderHistory.totalRevenue);
  statClients.textContent = orderHistory.uniqueClients;
}

// Admin product form
function openAdminForm(productId) {
  adminFormError.textContent = '';
  adminFormProductId.value = '';

  const catSelect = adminFormCategory;
  catSelect.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    catSelect.appendChild(opt);
  });

  if (productId) {
    // Edit mode
    const product = productManager.getById(productId);
    if (!product) return;
    adminFormTitle.innerHTML = '<i class="fa-solid fa-pen"></i> Editar Producto';
    adminFormProductId.value = productId;
    adminFormName.value = product.name;
    adminFormCategory.value = product.category;
    adminFormPrice.value = product.price;
    adminFormEmoji.value = product.emoji || '';
    adminFormDesc.value = product.desc;
    adminFormBadge.value = product.badge || '';
  } else {
    // New product
    adminFormTitle.innerHTML = '<i class="fa-solid fa-plus"></i> Nuevo Producto';
    adminFormName.value = '';
    adminFormCategory.value = CATEGORIES[0].id;
    adminFormPrice.value = '';
    adminFormEmoji.value = '';
    adminFormDesc.value = '';
    adminFormBadge.value = '';
  }

  adminFormOverlay.classList.remove('hidden');
  adminFormModal.classList.remove('hidden');
  setTimeout(() => adminFormName.focus(), 200);
}

function closeAdminForm() {
  adminFormOverlay.classList.add('hidden');
  adminFormModal.classList.add('hidden');
}

function handleSaveProduct() {
  const id = adminFormProductId.value ? parseInt(adminFormProductId.value) : null;
  const name = adminFormName.value.trim();
  const category = adminFormCategory.value;
  const price = adminFormPrice.value;
  const emoji = adminFormEmoji.value.trim();
  const desc = adminFormDesc.value.trim();
  const badge = adminFormBadge.value;

  if (!name) { adminFormError.textContent = 'El nombre del producto es obligatorio'; adminFormName.focus(); return; }
  if (!price || isNaN(price) || parseFloat(price) <= 0) { adminFormError.textContent = 'Ingresa un precio válido'; adminFormPrice.focus(); return; }

  const data = { name, category, price, emoji, desc, badge };

  if (id) {
    productManager.update(id, data);
    showToast('Producto actualizado correctamente');
  } else {
    productManager.add(data);
    showToast('Producto agregado correctamente');
  }

  closeAdminForm();
  renderAdminProducts();
  renderAdminStats();
  // Re-render public views
  renderCategories();
  renderFeatured();
  renderProducts();
}

function handleDeleteProduct(id) {
  const product = productManager.getById(id);
  if (!product) return;
  if (confirm(`¿Eliminar "${product.name}"?`)) {
    productManager.delete(id);
    showToast(`"${product.name}" eliminado`);
    renderAdminProducts();
    renderAdminStats();
    renderCategories();
    renderFeatured();
    renderProducts();
  }
}

// ===== ORDER HISTORY (CLIENT) =====
function openOrderHistory() {
  closeCart();
  closeCheckout();
  closeAdmin();
  orderHistoryOverlay.classList.remove('hidden');
  orderHistoryModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderOrderHistory();
}

function closeOrderHistory() {
  orderHistoryOverlay.classList.add('hidden');
  orderHistoryModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderOrderHistory() {
  const orders = orderHistory.getAll();

  if (orders.length === 0) {
    orderHistoryEmpty.classList.remove('hidden');
    orderHistoryList.classList.add('hidden');
    return;
  }

  orderHistoryEmpty.classList.add('hidden');
  orderHistoryList.classList.remove('hidden');
  orderHistoryItems.innerHTML = '';

  orders.forEach(order => {
    const statusMap = {
      pending: { label: 'Pendiente', class: 'pending' },
      confirmed: { label: 'Confirmado', class: 'confirmed' },
      shipping: { label: 'En envío', class: 'shipping' },
      delivered: { label: 'Entregado', class: 'delivered' },
      cancelled: { label: 'Cancelado', class: 'cancelled' }
    };
    const st = statusMap[order.status] || statusMap.pending;

    const card = document.createElement('div');
    card.className = 'order-history-card';
    card.innerHTML = `
      <div class="order-history-card-header">
        <span class="order-history-card-id">${order.id}</span>
        <span class="order-history-card-date">${formatDate(order.createdAt)}</span>
      </div>
      <div class="order-history-card-body">
        <span class="status-badge ${st.class}">${st.label}</span>
        <span style="margin-left:10px">${escapeHtml(order.name)} · ${escapeHtml(order.district)}</span>
      </div>
      <div class="order-history-card-footer">
        <span class="order-history-card-total">${formatPrice(order.total)}</span>
        <span style="font-size:12px;color:var(--text-tertiary)">${order.items ? order.items.length : 0} productos</span>
      </div>
    `;

    card.addEventListener('click', () => {
      // Toggle detail expansion
      const existingDetail = card.querySelector('.order-history-detail');
      if (existingDetail) {
        existingDetail.remove();
        return;
      }
      const detail = document.createElement('div');
      detail.className = 'order-history-detail';
      let itemsHtml = '';
      if (order.items) {
        itemsHtml = '<div class="order-detail-items">' +
          order.items.map(i =>
            `<div class="order-detail-item"><span>${i.productEmoji || '📦'} ${i.productName} x${i.quantity}</span><span>${formatPrice(i.price * i.quantity)}</span></div>`
          ).join('') +
        '</div>';
      }
      detail.innerHTML = `
        <p><span>Dirección</span><span>${escapeHtml(order.address)}</span></p>
        <p><span>Pago</span><span>${order.payment}</span></p>
        <p><span>Subtotal</span><span>${formatPrice(order.subtotal)}</span></p>
        <p><span>Envío</span><span>${order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}</span></p>
        <p style="font-weight:700;color:var(--green);font-size:15px"><span>TOTAL</span><span>${formatPrice(order.total)}</span></p>
        ${itemsHtml}
      `;
      card.appendChild(detail);
    });

    orderHistoryItems.appendChild(card);
  });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Navigation
  headerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // Hero buttons
  document.querySelector('.hero-btn-primary')?.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('products');
  });

  heroWhatsApp.addEventListener('click', (e) => {
    e.preventDefault();
    if (cart.count > 0) {
      buildWhatsAppOrder();
    } else {
      window.open('https://wa.me/51999888777?text=¡Hola!%20Quiero%20hacer%20un%20pedido', '_blank');
    }
  });

  // Search
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  searchClose.addEventListener('click', () => {
    searchBar.classList.add('hidden');
    searchInput.value = '';
    currentSearch = '';
    renderProducts();
  });

  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    renderProducts();
    if (currentSearch && allProductsSection.style.display === 'none') {
      showPage('products');
    }
  });

  // Cart
  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  cartEmptyBtn.addEventListener('click', () => {
    closeCart();
    showPage('products');
  });

  cart.onChange(() => {
    updateCartUI();
    if (!cartSidebar.classList.contains('hidden')) {
      renderCartSidebar();
    }
    document.querySelectorAll('.product-card').forEach(card => {
      const id = parseInt(card.dataset.productId);
      const btn = card.querySelector('[data-action="add"]');
      if (btn && id) {
        const item = cart.items.find(i => i.productId === id);
        if (item) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';
          btn.classList.add('added');
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            btn.classList.remove('added');
          }, 800);
        }
      }
    });
  });

  // Product manager changes -> re-render
  productManager.onChange(() => {
    renderCategories();
    renderFilterChips();
    renderFeatured();
    renderProducts();
  });

  // Checkout buttons
  cartCheckoutBtn.addEventListener('click', openCheckout);
  cartWhatsAppBtn.addEventListener('click', buildWhatsAppOrder);

  // Checkout modal
  checkoutClose.addEventListener('click', closeCheckout);
  checkoutOverlay.addEventListener('click', closeCheckout);
  checkoutSubmit.addEventListener('click', handleCheckout);
  checkoutNewOrder.addEventListener('click', () => {
    closeCheckout();
    showPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('¡Gracias por tu compra! 🎉');
  });

  // Enter key on checkout
  checkoutNotes.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCheckout();
    }
  });

  // Admin
  adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    openAdmin();
  });

  adminOverlay.addEventListener('click', closeAdmin);
  adminClose.addEventListener('click', closeAdmin);

  adminPasswordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAdminLogin();
  });
  adminLoginBtn.addEventListener('click', handleAdminLogin);
  adminLogoutBtn.addEventListener('click', handleAdminLogout);

  // Admin tabs
  adminTabs.forEach(tab => {
    tab.addEventListener('click', () => switchAdminTab(tab.dataset.tab));
  });

  // Admin add product
  adminAddProductBtn.addEventListener('click', () => openAdminForm(null));

  // Admin form
  adminFormOverlay.addEventListener('click', closeAdminForm);
  adminFormClose.addEventListener('click', closeAdminForm);
  adminFormCancel.addEventListener('click', closeAdminForm);
  adminFormSave.addEventListener('click', handleSaveProduct);
  adminFormName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') adminFormCategory.focus();
  });

  // Order History (client)
  orderHistoryLink.addEventListener('click', (e) => {
    e.preventDefault();
    openOrderHistory();
  });
  orderHistoryOverlay.addEventListener('click', closeOrderHistory);
  orderHistoryClose.addEventListener('click', closeOrderHistory);

  // Keyboard: Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!adminFormModal.classList.contains('hidden')) { closeAdminForm(); return; }
      if (!adminModal.classList.contains('hidden')) { closeAdmin(); return; }
      if (!orderHistoryModal.classList.contains('hidden')) { closeOrderHistory(); return; }
      closeCart();
      closeCheckout();
    }
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Footer category links
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const text = link.textContent.trim();
      const cat = CATEGORIES.find(c => c.name === text);
      if (cat) {
        e.preventDefault();
        currentCategory = cat.id;
        showPage('products');
        updateFilterChips();
        renderProducts();
      }
    });
  });
}

// ===== INIT =====
function init() {
  renderCategories();
  renderFilterChips();
  renderFeatured();
  renderProducts();
  updateCartUI();
  setupEventListeners();

  showPage('home');

  console.log('🛒 Mercado Don José — Tienda Online lista');
  console.log(`📦 ${productManager.count} productos en ${CATEGORIES.length} categorías`);
  console.log(`📋 ${orderHistory.count} pedidos registrados`);
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
