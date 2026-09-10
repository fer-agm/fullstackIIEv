# Level-Up Store — Proyecto Fullstack II

* **Repositorio público:** https://github.com/fer-agm/fullstackIIEv
* **Demo en vivo (Ejecución directa):** https://fer-agm.github.io/fullstackIIEv/home.html

---

En este repositorio creamos una tienda online para Level-Up Store como parte del proyecto semestral 
para la asignatura Fullstack II.

La estructura es
assets/ &rarr; Almacena los recursos estáticos del sitio. Tiene el archivo style.css que
mantiene una línea visual consistente en todas las páginas, y la carpeta img dentro de assets
para las imágenes del catálogo. Esto es para que el sistema pueda incluir cada imagen, ya sea 
personalizada o placeholder en su defecto, sin tener que modificar tanto el código.

funciones.js &rarr; Centraliza la lógica del sistema y la interactividad del sitio. Tiene:

Renderizado dinámico &rarr; inyección de componentes globales como headers y footers.

Gestión de estado (localStorage) &rarr; es la persistencia del carrito de compras, el catálogo,
y los usuarios registrados.

Control de acceso y roles &rarr;  Diferenciación entre usuarios clientes y usuarios 
administradores.

Validaciones &rarr; Alertas en pantalla para verificar mayoría de edad, 
coincidencia de contraseñas y evitar correos duplicados.

Flujo de Navegación y Arquitectura del Sitio

```text
Level-Up Store (Sitio Web)
│
├── home.html (Página Principal)
│    ├── Banner principal y accesos rápidos
│    ├── Productos destacados
│    ├── nosotros.html (Sobre la tienda y equipo)
│    ├── blogs.html (Noticias, guías y artículos gamer)
│    └── contacto.html (Formulario de soporte y botón WhatsApp)
│
├── Flujo de Compras y Catálogo
│    ├── productos.html (Catálogo completo con filtro por categoría y buscador)
│    │    └── detalleProducto.html (Ficha técnica y descripción detallada del producto)
│    └── productoCompra.html (Carrito de compras, aplicación de descuentos y checkout)
│
├── Autenticación y Registro
│    ├── inicioSesion.html (Acceso para clientes y administradores)
│    └── registroUsuario.html (Formulario de registro con validación de edad y convenio Duoc)
│
└── Panel de Administración (Acceso restringido a rol 'admin')
     └── adminHome.html (Dashboard de control general)
          ├── Gestión de Productos
          │    ├── nuevoProducto.html (Formulario de alta de productos con imagen)
          │    └── editarProducto.html (Actualización de stock, precios y datos)
          └── Gestión de Usuarios
               ├── nuevoUsuario.html (Creación manual de usuarios/admins)
               └── editarUsuario.html (Edición de roles, puntos y datos de usuario)
```
