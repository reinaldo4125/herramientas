# 🔧 Herramientas Automotrices Pro - Documentación

## 📁 Estructura del Proyecto

```
Herramientas/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos personalizados
├── js/
│   └── main.js            # JavaScript interactivo
├── assets/
│   └── images/            # Carpeta para imágenes
└── README.md              # Este archivo
```

## 📋 Descripción

Página web profesional para un sitio de análisis y comparativas de herramientas automotrices. Incluye:

- Header con hero image
- Barra de estadísticas
- Grid de productos destacados
- Sección de artículos y análisis
- Diseño responsive
- Animaciones suaves

## 🎨 Características de Diseño

### Colores Utilizados
- **Naranja Marca**: `#f97316` / `#ea580c`
- **Gris Oscuro**: `#1a1a1a`
- **Fondo Claro**: `#f3f4f6`
- **Blanco**: `#ffffff`

### Componentes
1. **Header**: Gradient oscuro con efecto flotante
2. **Stats Bar**: Barra de estadísticas con iconos
3. **Producto Cards**: Cards con imagen, descripción y CTA
4. **Article Cards**: Cards con overlay de gradiente
5. **Product Featured**: Producto destacado con escala aumentada

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **Tailwind CSS**: Framework utility-first (CDN)
- **Font Awesome**: Iconografía
- **JavaScript Vanilla**: Interactividad

## 📱 Responsive Design

- Diseñado mobile-first
- Breakpoints en 768px para tablet/desktop
- Imágenes optimizadas con atributo `loading="lazy"`

## 🚀 Cómo Usar

1. **Abrir en navegador**: Abre `index.html` directamente
2. **Servidor local** (recomendado):
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js
   npx http-server
   ```
3. **URL Local**: `http://localhost:8000`

## 📝 Cómo Personalizar

### Cambiar Colores
Edita las variables CSS en [css/styles.css](css/styles.css):
```css
:root {
    --color-brand-orange: #f97316;
    --color-dark-gray: #1a1a1a;
    /* ... más variables */
}
```

### Agregar Productos
Copia el bloque de producto en `index.html`:
```html
<div class="product-card fade-in-up">
    <div class="product-header">Nombre Producto</div>
    <div class="product-image">
        <img src="ruta/imagen.jpg" alt="Descripción">
    </div>
    <!-- ... resto del código -->
</div>
```

### Agregar Artículos
Copia el bloque de artículo en `index.html`:
```html
<article class="article-card fade-in-up">
    <img src="ruta/imagen.jpg" alt="Descripción">
    <div class="article-overlay">
        <h4>Título del Artículo</h4>
        <a href="#" class="article-link">Leer Más</a>
    </div>
</article>
```

## 🖼️ Gestión de Imágenes

**Ubicación**: `assets/images/`

Para reemplazar las imágenes placeholder:
1. Coloca tus imágenes en `assets/images/`
2. Actualiza el atributo `src` en el HTML

### Recomendaciones de Imágenes
- **Hero Image**: 600x400px
- **Producto**: 300x300px
- **Artículo**: 400x250px
- **Formato**: JPG, WebP para optimización
- **Optimización**: Comprimir con TinyPNG o similar

## ⚙️ Personalización Avanzada

### Animaciones
Edita `@keyframes` en [css/styles.css](css/styles.css):
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Eventos JavaScript
Edita [js/main.js](js/main.js) para agregar interactividad personalizada.

## 📞 Soporte

Para agregar links a Amazon u otros destinos:
```html
<a href="https://amazon.com/producto" class="product-button" target="_blank">
    Ver precio en Amazon
</a>
```

## 📄 Licencia

Este proyecto es de uso libre para propósitos educativos y comerciales.

---

**Creado**: Febrero 2026
**Versión**: 1.0
