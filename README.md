# 🚀 CRUD de Usuarios - Vue 3 + PrimeVue

Aplicación web para gestionar usuarios consumiendo la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users). Implementa operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) con almacenamiento local y una interfaz moderna.

## 🛠️ Tecnologías

- **[Vue 3](https://vuejs.org/)** - Framework progresivo (Composition API)
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Pinia](https://pinia.vuejs.org/)** - Gestión de estado centralizado
- **[PrimeVue 4](https://primevue.org/)** - Biblioteca de componentes UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[VeeValidate](https://vee-validate.logaretm.com/)** - Validación de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first
- **[Vue Router](https://router.vuejs.org/)** - Enrutamiento oficial de Vue
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápido

## 📋 Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- Bun (recomendado) o npm/pnpm/yarn

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/IvyedSG/crud
cd crud

# Instalar dependencias
npm/bun install
# o npm install
```

## 💻 Uso

### Desarrollo

```bash
npm/bun run dev
# La aplicación estará disponible en http://localhost:5173
```


## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── DeleteConfirmDialog.vue   # Dialog de confirmación
│   ├── ErrorAlert.vue             # Alerta de errores
│   ├── UserFormDialog.vue         # Modal crear/editar
│   └── UserTable.vue              # Tabla de usuarios
├── composables/         # Lógica compartida
│   └── useDeleteConfirm.ts        # Composable para eliminar
├── stores/              # Estado global (Pinia)
│   └── users.ts                   # Store de usuarios
├── types/               # Tipos TypeScript
│   └── user.ts                    # Tipos User y UserFormData
├── views/               # Vistas principales
│   └── UsersView.vue              # Vista principal
├── router/              # Configuración de rutas
│   └── index.ts
├── assets/              # Recursos estáticos
│   └── main.css
├── App.vue              # Componente raíz
└── main.ts              # Punto de entrada
```
