// ============================================
// SCRIPT PRINCIPAL - HERRAMIENTAS AUTOMOTRICES PRO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    // ========================================
    // FILTRO DE HERRAMIENTAS POR CATEGORÍA
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCategories = document.querySelectorAll('.tool-category');

    // Función para aplicar filtro
    function applyFilter(filterValue) {
        filterBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        toolCategories.forEach(category => {
            const categoryValue = category.getAttribute('data-category');
            if (filterValue === 'all' || categoryValue === filterValue) {
                category.style.display = 'block';
                setTimeout(() => category.style.opacity = '1', 10);
            } else {
                category.style.opacity = '0';
                setTimeout(() => category.style.display = 'none', 300);
            }
        });
    }

    // Evento click en botones de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Actualizar URL con hash
            window.location.hash = filterValue !== 'all' ? `herramientas/${filterValue}` : 'herramientas';
        });
    });

    // Detectar cambios de hash (navegación atrás/adelante)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.slice(1);
        let filterValue = 'all';
        
        if (hash.startsWith('herramientas/')) {
            filterValue = hash.split('/')[1];
        } else if (hash === 'herramientas') {
            filterValue = 'all';
        }
        
        if (filterValue !== 'all' && !document.querySelector(`.filter-btn[data-filter="${filterValue}"]`)) {
            filterValue = 'all';
        }
        
        applyFilter(filterValue);
    });

    // Aplicar filtro inicial basado en hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash.startsWith('herramientas')) {
        let initialFilter = 'all';
        if (initialHash.startsWith('herramientas/')) {
            initialFilter = initialHash.split('/')[1];
        }
        applyFilter(initialFilter);
    }
    
    // Agregar eventos a los botones de productos sin bloquear el enlace
    const productButtons = document.querySelectorAll('.product-button');
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('.product-header').textContent;
            console.log('Producto seleccionado:', productName);
            // Aquí puedes agregar lógica adicional
        });
    });

    // Agregar eventos a los artículos
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        article.addEventListener('click', function() {
            const articleTitle = this.querySelector('h4').textContent;
            console.log('Artículo seleccionado:', articleTitle);
            // Aquí puedes agregar lógica para abrir el artículo
        });
    });

    // Efecto de scroll suave para el CTA principal (solo si es ancla interna)
    const mainCTA = document.querySelector('.header-cta');
    if (mainCTA) {
        mainCTA.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
});

// Función para agregar efectos de observador (lazy loading mejorado)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});
// ========================================
// DROPDOWN MENU HERRAMIENTAS AUTOMOTRICES
// ========================================
const statDropdown = document.querySelector('.stat-dropdown');
const dropdownMenu = document.querySelector('.stat-dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Cerrar dropdown cuando se hace click en un item
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        // El enlace se seguirá normalmente
        console.log('Categoría seleccionada:', this.textContent.trim());
    });
});

// Cerrar dropdown cuando se hace click fuera
document.addEventListener('click', function(event) {
    if (statDropdown && !statDropdown.contains(event.target)) {
        // El dropdown se cerrará automáticamente con CSS
    }
});