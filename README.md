# Manjares del campo

> Plataforma web para la comercialización de productos del campo — frescos, naturales y de calidad — en el área metropolitana de Barranquilla.

---

## Descripción

**Manjares del campo** es una tienda en línea orientada a conectar productores del campo con consumidores de Barranquilla y su área metropolitana. La plataforma permite explorar un catálogo de productos frescos y naturales, gestionar un carrito de compras, realizar pedidos sin necesidad de crear una cuenta, y confirmarlos a través de WhatsApp con pago por Nequi o Daviplata.

**Cliente:** Astrid Blanco  
**Área de cobertura:** Área metropolitana de Barranquilla, Colombia

---

## Funcionalidades

### Clientes
- Catálogo de productos filtrado por categorías
- Carrito de compras
- Checkout con captura de datos básicos (sin registro)
- Pago por Nequi o Daviplata 
- Confirmación de pedido vía WhatsApp
- Generación de factura con datos del cliente

### Administrador
- Panel de administración con login seguro (JWT)
- Dashboard con estadísticas de ventas
- Gestión de inventario / stock por categoría
- Reportes mensuales de ventas
- Gestión de pedidos y estados

### General
- Diseño responsive y atractivo
- Integración con redes sociales
- Chat directo por WhatsApp
- Sin necesidad de cuenta para comprar

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React + Vite |
| **Estilos** | Tailwind CSS |
| **Enrutamiento** | React Router DOM |
| **HTTP Client** | Axios |
| **Backend** | Node.js + Express |
| **Base de datos** | MySQL |
| **Autenticación** | JWT + bcrypt |
| **Archivos** | Multer |
| **Despliegue** | Railway (full-stack) |

---

## Estructura del Proyecto

```
manjares-del-campo/
│
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/          # Navbar, ProductoCard, Carrito, Footer...
│   │   ├── pages/               # Inicio, Checkout, admin/Dashboard...
│   │   ├── context/             # CarritoContext (estado global)
│   │   └── services/            # api.js — llamadas al backend
│   └── ...
│
├── backend/                     # Node.js + Express
│   ├── src/
│   │   ├── controllers/         # Lógica de negocio
│   │   ├── routes/              # Endpoints de la API
│   │   ├── middlewares/         # Auth JWT
│   │   └── db/
│   │       ├── connection.js    # Conexión a MySQL
│   │       └── colombia_verde.sql
│   └── server.js                # Sirve API + frontend (dist)
│
├── .gitignore
├── README.md
└── package.json
```

---

## Base de Datos

```sql
categorias      -- Frutas, Verduras, Lácteos, Granos, Hierbas...
productos       -- Inventario con stock, precio, imagen, categoría
clientes        -- Datos capturados en checkout (sin registro)
pedidos         -- Pedido con estado, método de pago, fecha
pedido_detalle  -- Productos por pedido con cantidad y precio
admin           -- Usuario administrador (email + password_hash)
```

---

## Instalación local

### Prerrequisitos
- Node.js v18+
- MySQL + Workbench
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/manjares-del-campo.git
cd manjares-del-campo
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=colombia_verde
PORT=3000
JWT_SECRET=tu_clave_secreta
```

Importar la base de datos en MySQL Workbench:
```bash
# Abrir manjares_del_campo.sql en Workbench y ejecutar
```

Iniciar el servidor:
```bash
npm run dev
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## Flujo de Compra

```
1. Cliente navega el catálogo
2. Agrega productos al carrito
3. Checkout → ingresa nombre, teléfono y dirección
4. Elige método de pago: Nequi o Daviplata
5. Se muestra QR / número para transferir
6. Cliente paga y captura pantalla del comprobante
7. Clic en "Enviar pedido por WhatsApp" → mensaje prellenado
8. Astrid confirma el pedido ✅
```

---

## Ramas de Trabajo

```bash
main          # Código estable — solo PR aprobados
develop       # Integración del equipo
feature/...   # Ramas por módulo o funcionalidad
```

---

## Plan de Entregas

| Entrega | Módulo |
|---------|--------|
| 1 | Repo + estructura + diseño Home |
| 2 | Catálogo de productos conectado a MySQL |
| 3 | Carrito + Checkout + captura de datos |
| 4 | WhatsApp + Nequi/Daviplata |
| 5 | Panel Admin: login + inventario |
| 6 | Dashboard + reportes + deploy Railway |

---

## Equipo

| Rol | Responsabilidad |
|-----|----------------|
| Frontend | React, diseño, UX |
| Backend | API REST, base de datos, autenticación |

---

## Licencia

Proyecto académico — © 2025 Astrid Blanco / Manjares del campo. Todos los derechos reservados.
