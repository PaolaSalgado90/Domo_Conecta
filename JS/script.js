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