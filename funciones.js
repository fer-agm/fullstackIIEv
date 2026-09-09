// Base de datos inicial de productos (Requerimiento de la guía)
const defaultProducts = [
    { code: 'JM001', category: 'Juegos de Mesa', name: 'Catan', price: 29990, origin: 'Devir / Alemania', desc: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar la isla de Catan.', image: 'catan.jpg' },
    { code: 'JM002', category: 'Juegos de Mesa', name: 'Carcassonne', price: 24990, origin: 'Hans im Glück / Alemania', desc: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje medieval.', image:'placeholder.jpg' },
    { code: 'AC001', category: 'Accesorios', name: 'Controlador Inalámbrico Xbox Series X', price: 59990, origin: 'Microsoft', desc: 'Ofrece una experiencia de juego cómoda con botones mapeables y respuesta táctil.', image:'placeholder.jpg'},
    { code: 'AC002', category: 'Accesorios', name: 'Auriculares Gamer HyperX Cloud II', price: 79990, origin: 'HyperX', desc: 'Sonido envolvente de calidad con micrófono desmontable y comodidad prolongada.', image:'placeholder.jpg'},
    { code: 'CO001', category: 'Consolas', name: 'PlayStation 5', price: 549990, origin: 'Sony', desc: 'Gráficos impresionantes y tiempos de carga ultrarrápidos para experiencia inmersiva.', image:'placeholder.jpg' },
    { code: 'CG001', category: 'Computadores Gamers', name: 'PC Gamer ASUS ROG Strix', price: 1299990, origin: 'ASUS', desc: 'Potente equipo equipado con componentes de alto rendimiento.', image:'placeholder.jpg' },
    { code: 'SG001', category: 'Sillas Gamers', name: 'Silla Gamer Secretlab Titan', price: 349990, origin: 'Secretlab', desc: 'Diseñada para máximo confort con soporte ergonómico.', image:'placeholder.jpg' },
    { code: 'MS001', category: 'Mouse', name: 'Mouse Gamer Logitech G502 HERO', price: 49990, origin: 'Logitech', desc: 'Sensor de alta precisión y botones personalizables.', image:'placeholder.jpg' },
    { code: 'MP001', category: 'Mousepad', name: 'Mousepad Razer Goliathus Extended Chroma', price: 29990, origin: 'Razer', desc: 'Área de juego amplia con iluminación RGB personalizable.', image:'placeholder.jpg' },
    { code: 'PP001', category: 'Poleras Personalizadas', name: 'Polera Gamer Personalizada Level-Up', price: 14990, origin: 'Level-Up Chile', desc: 'Camiseta cómoda con posibilidad de personalizar tu gamer tag.', image:'placeholder.jpg'  }
];

// Usuarios por defecto
const defaultUsers = [
    { name: 'Administrador Principal', email: 'admin@levelup.cl', password: 'admin', age: 30, role: 'admin', points: 1000, isDuoc: false },
    { name: 'Estudiante Duoc', email: 'estudiante@duoc.cl', password: '123', age: 21, role: 'user', points: 100, isDuoc: true }
];

// Inicialización de LocalStorage
function initStorage() {
    if (!localStorage.getItem('lu_products')) {
        localStorage.setItem('lu_products', JSON.stringify(defaultProducts));
    }
    if (!localStorage.getItem('lu_users')) {
        localStorage.setItem('lu_users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('lu_cart')) {
        localStorage.setItem('lu_cart', JSON.stringify([]));
    }
}
initStorage();

// Control de Productos (CRUD)
function getProducts() {
    return JSON.parse(localStorage.getItem('lu_products')) || [];
}

function saveProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem('lu_products', JSON.stringify(products));
}

function getProductByCode(code) {
    return getProducts().find(p => p.code === code);
}

function updateProduct(updatedProduct) {
    let products = getProducts();
    products = products.map(p => p.code === updatedProduct.code ? updatedProduct : p);
    localStorage.setItem('lu_products', JSON.stringify(products));
}

function deleteProduct(code) {
    let products = getProducts();
    products = products.filter(p => p.code !== code);
    localStorage.setItem('lu_products', JSON.stringify(products));
}

// Control de Usuarios (CRUD & Auth)
function getUsers() {
    return JSON.parse(localStorage.getItem('lu_users')) || [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('lu_users', JSON.stringify(users));
}

function getUserByEmail(email) {
    return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

function updateUser(updatedUser) {
    let users = getUsers();
    users = users.map(u => u.email.toLowerCase() === updatedUser.email.toLowerCase() ? updatedUser : u);
    localStorage.setItem('lu_users', JSON.stringify(users));
}

function deleteUser(email) {
    let users = getUsers();
    users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem('lu_users', JSON.stringify(users));
}

// Control de Sesión Activa
function setCurrentUser(user) {
    localStorage.setItem('lu_session', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('lu_session'));
}

function logoutUser() {
    localStorage.removeItem('lu_session');
    window.location.href = 'inicioSesion.html';
}

// Regla de Negocio: Registro con validación +18 y Descuento Duoc 20%
function registerUserLogic(name, email, password, age, refCode) {
    if (age < 18) {
        alert("Error de Registro: Debes ser mayor de 18 años para registrarte en Level-Up Gamer.");
        return false;
    }

    if (getUserByEmail(email)) {
        alert("Error: El correo electrónico ya se encuentra registrado.");
        return false;
    }

    const isDuoc = email.toLowerCase().includes('duoc');
    let points = refCode ? 100 : 0; 


    const newUser = { name, email, password, age, role: 'user', points, isDuoc };
    saveUser(newUser);
    alert(`¡Registro Exitoso! ${isDuoc ? 'Se ha activado tu beneficio vitalicio del 20% de descuento por ser Duoc UC.' : ''}`);
    return true;
}

// Control de Carrito de Compras
function getCart() {
    return JSON.parse(localStorage.getItem('lu_cart')) || [];
}

function addToCart(code, qty = 1) {
    const cart = getCart();
    const product = getProductByCode(code);
    if (!product) return;

    const existing = cart.find(c => c.code === code);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    localStorage.setItem('lu_cart', JSON.stringify(cart));
    alert(`${product.name} fue agregado al carrito de compras.`);
}

function updateCartQty(code, qty) {
    let cart = getCart();
    if (qty <= 0) {
        cart = cart.filter(c => c.code !== code);
    } else {
        const item = cart.find(c => c.code === code);
        if (item) item.qty = qty;
    }
    localStorage.setItem('lu_cart', JSON.stringify(cart));
}

function removeFromCart(code) {
    let cart = getCart();
    cart = cart.filter(c => c.code !== code);
    localStorage.setItem('lu_cart', JSON.stringify(cart));
}

function clearCart() {
    localStorage.setItem('lu_cart', JSON.stringify([]));
}

// Render Header / Navbar Común
function renderHeader() {
    const user = getCurrentUser();
    const header = document.querySelector('header');
    if (!header) return;

    let userBadge = `<span class="user-badge">Invitado | <a href="inicioSesion.html" style="color:var(--accent-green)">Iniciar Sesión</a></span>`;
    
    if (user) {
        let level = user.points >= 500 ? 'Leyenda' : (user.points >= 200 ? 'Pro Gamer' : 'Novato');
        userBadge = `
            <span class="user-badge">
                👤 ${user.name} (${user.role.toUpperCase()}) | 
                ${user.isDuoc ? '🎓 20% Descuento Duoc' : 'Estándar'} | 
                💎 ${user.points} Pts (${level}) | 
                <a href="#" onclick="logoutUser()" style="color:red; margin-left:5px;">Salir</a>
            </span>
        `;
    }

    header.innerHTML = `
        <a href="home.html" class="brand-logo">LEVEL-UP GAMER</a>
        <nav>
            <a href="home.html">Inicio</a>
            <a href="productos.html">Productos</a>
            <a href="productoCompra.html">Carrito</a>
            <a href="blogs.html">Blogs</a>
            <a href="nosotros.html">Nosotros</a>
            <a href="contacto.html">Contacto</a>
            ${user && user.role === 'admin' ? '<a href="adminHome.html" style="color:var(--accent-green)">Panel Admin</a>' : ''}
        </nav>
        ${userBadge}
    `;
}

function renderFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <div style="text-align: center; padding: 1.5rem 1rem; margin-top: 2rem; background: #111; border-top: 1px solid #222; color: #aaa; font-size: 0.9rem;">
                <p style="margin-bottom: 0.5rem;">
                    Fernanda Gajardo || Fullstack II 2026 || Evaluación 1 || Level-Up Gamer
                </p>
                <p>
                    <a href="https://github.com/fer-agm/fullstackIIEv" target="_blank" style="color: var(--accent-green, #39FF14); text-decoration: none; font-weight: bold;">
                        Repositorio
                    </a>
                </p>
            </div>
        `;
    }
}

// Ejecutar cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', renderFooter);

document.addEventListener('DOMContentLoaded', renderHeader);