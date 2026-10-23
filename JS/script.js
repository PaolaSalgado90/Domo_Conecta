// Base de datos de prueba local (Simulando lo que luego vendrá de SQL)
const empresasData = [
    { id: 1, nombre: "SmartHome Medellín", ciudad: "Medellín", servicio: "iluminacion", calificacion: 4.9, desc: "Expertos en iluminación inteligente y ahorro energético." },
    { id: 2, nombre: "Automatiza Bogotá", ciudad: "Bogotá", servicio: "seguridad", calificacion: 4.7, desc: "Cerraduras inteligentes y cámaras de seguridad IP." },
    { id: 3, nombre: "ClimaTech Cali", ciudad: "Cali", servicio: "climatizacion", calificacion: 4.5, desc: "Automatización de aires acondicionados y confort térmico." },
    { id: 4, nombre: "EcoDomótica", ciudad: "Medellín", servicio: "seguridad", calificacion: 4.8, desc: "Sistemas integrados de seguridad perimetral." }
];

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const serviceSelect = document.getElementById('serviceSelect');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Función para mostrar las empresas en la pantalla
function mostrarEmpresas(empresas) {
    resultsContainer.innerHTML = ""; // Limpiar resultados anteriores

    if (empresas.length === 0) {
        resultsContainer.innerHTML = `<p class="no-results">No se encontraron empresas con esos criterios.</p>`;
        return;
    }

    empresas.forEach(empresa => {
        const card = document.createElement('div');
        card.classList.add('edu-card'); // Reutilizamos estilos limpios
        card.innerHTML = `
            <h3>${empresa.nombre}</h3>
            <p><strong>Ciudad:</strong> ${empresa.ciudad}</p>
            <p><strong>Servicio:</strong> ${empresa.servicio.toUpperCase()}</p>
            <p>⭐ ${empresa.calificacion}</p>
            <p>${empresa.desc}</p>
        `;
        resultsContainer.appendChild(card);
    });
}

// Función de filtrado (HU-02)
function filtrarEmpresas() {
    const textoBusqueda = searchInput.value.toLowerCase().trim();
    const servicioSeleccionado = serviceSelect.value;

    const resultadosFiltrados = empresasData.filter(empresa => {
        const coincideCiudad = empresa.ciudad.toLowerCase().includes(textoBusqueda) || textoBusqueda === "";
        const coincideServicio = empresa.servicio === servicioSeleccionado || servicioSeleccionado === "";
        return coincideCiudad && coincideServicio;
    });

    mostrarEmpresas(resultadosFiltrados);
}

// Eventos
searchBtn.addEventListener('click', filtrarEmpresas);

// Mostrar todas al cargar la página por primera vez
document.addEventListener('DOMContentLoaded', () => {
    mostrarEmpresas(empresasData);
});
// Elementos del Modal HU-03
const modal = document.getElementById('detalleModal');
const closeModal = document.getElementById('closeModal');
const detalleNombre = document.getElementById('detalleNombre');
const detalleCiudad = document.getElementById('detalleCiudad');
const detalleRating = document.getElementById('detalleRating');
const detalleDescripcion = document.getElementById('detalleDescripcion');

// Modificar la función mostrarEmpresas para agregar el botón "Ver Detalle"
function mostrarEmpresas(empresas) {
    resultsContainer.innerHTML = ""; 

    if (empresas.length === 0) {
        resultsContainer.innerHTML = `<p class="no-results">No se encontraron empresas con esos criterios.</p>`;
        return;
    }

    empresas.forEach(empresa => {
        const card = document.createElement('div');
        card.classList.add('edu-card');
        card.innerHTML = `
            <h3>${empresa.nombre}</h3>
            <p><strong>Ciudad:</strong> ${empresa.ciudad}</p>
            <p><strong>Servicio:</strong> ${empresa.servicio.toUpperCase()}</p>
            <p>⭐ ${empresa.calificacion}</p>
            <button class="btn-detalle" data-id="${empresa.id}" style="margin-top: 10px; padding: 6px 12px; background: #0f172a; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Ver Perfil Detallado</button>
        `;
        
        // Evento para abrir el detalle de esta empresa específica
        card.querySelector('.btn-detalle').addEventListener('click', () => {
            detalleNombre.textContent = empresa.nombre;
            detalleCiudad.textContent = empresa.ciudad;
            detalleRating.textContent = `⭐ (${empresa.calificacion})`;
            detalleDescripcion.textContent = empresa.desc;
            modal.style.display = 'flex'; // Mostrar modal
        });

        resultsContainer.appendChild(card);
    });
}

// Cerrar modal al hacer clic en la X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal si hacen clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// HU-06: Lógica para la Gestión de Portafolio de Servicios de PYME
let portafolioServicios = [
    { id: 1, nombre: "Kit de Cámaras de Seguridad IP", categoria: "Seguridad", espec: "Cámaras Full HD con visión nocturna y detección de movimiento.", activo: true },
    { id: 2, nombre: "Control de Climatización Inteligente", categoria: "Climatización", espec: "Termostato programable con control desde app móvil.", activo: true }
];

const nuevoServicioForm = document.getElementById('nuevoServicioForm');
const listaServiciosContainer = document.getElementById('listaServicios');

// Función para renderizar la lista de servicios
function renderizarPortafolio() {
    if (!listaServiciosContainer) return;
    listaServiciosContainer.innerHTML = "";

    if (portafolioServicios.length === 0) {
        listaServiciosContainer.innerHTML = `<p style="color: #64748b;">No tienes servicios registrados en tu portafolio.</p>`;
        return;
    }

    portafolioServicios.forEach(servicio => {
        const item = document.createElement('div');
        item.style.cssText = "background: #ffffff; padding: 1.25rem; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;";

        item.innerHTML = `
            <div>
                <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem;">${servicio.nombre} <span style="font-size: 0.8rem; padding: 2px 8px; border-radius: 12px; background: ${servicio.activo ? '#dcfce7' : '#fee2e2'}; color: ${servicio.activo ? '#166534' : '#991b1b'};">${servicio.activo ? 'Activo' : 'Inactivo'}</span></h4>
                <p style="margin: 0; font-size: 0.85rem; color: #64748b;"><strong>Categoría:</strong> ${servicio.categoria}</p>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #334155;">${servicio.espec}</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-toggle-estado" data-id="${servicio.id}" style="padding: 0.5rem 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: ${servicio.activo ? '#f59e0b' : '#10b981'}; color: #fff; font-size: 0.8rem;">
                    ${servicio.activo ? 'Desactivar' : 'Activar'}
                </button>
                <button class="btn-eliminar-servicio" data-id="${servicio.id}" style="padding: 0.5rem 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #ef4444; color: #fff; font-size: 0.8rem;">
                    Eliminar
                </button>
            </div>
        `;

        // Evento para cambiar estado (Activar / Desactivar)
        item.querySelector('.btn-toggle-estado').addEventListener('click', () => {
            servicio.activo = !servicio.activo;
            renderizarPortafolio();
        });

        // Evento para eliminar servicio
        item.querySelector('.btn-eliminar-servicio').addEventListener('click', () => {
            portafolioServicios = portafolioServicios.filter(s => s.id !== servicio.id);
            renderizarPortafolio();
        });

        listaServiciosContainer.appendChild(item);
    });
}

// Evento de envío del formulario para agregar un nuevo servicio
if (nuevoServicioForm) {
    nuevoServicioForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('servicioNombre').value.trim();
        const categoria = document.getElementById('servicioCategoria').value;
        const espec = document.getElementById('servicioEspec').value.trim();

        if (nombre === "" || categoria === "" || espec === "") {
            alert("Por favor completa todos los campos del servicio.");
            return;
        }

        const nuevoServicio = {
            id: Date.now(),
            nombre: nombre,
            categoria: categoria,
            espec: espec,
            activo: true
        };

        portafolioServicios.push(nuevoServicio);
        renderizarPortafolio();
        nuevoServicioForm.reset();
    });
}

// Inicializar vista al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarPortafolio();
});