// Base de datos de prueba local (Simulando lo que luego vendrá de SQL)
const empresasData = [
    { id: 1, nombre: "Smart e Medellín", ciudad: "Medellín", servicio: "iluminacion", calificacion: 4.9, desc: "Expertos en iluminación inteligente y ahorro energético." },
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
// Lógica para el Formulario de Solicitud de Contacto (HU-04)
const cotizacionForm = document.getElementById('cotizacionForm');
const formAlert = document.getElementById('formAlert');

if (cotizacionForm) {
    cotizacionForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue por defecto

        const tipoInmueble = document.getElementById('tipoInmueble').value;
        const mensajeRequerimiento = document.getElementById('mensajeRequerimiento').value.trim();

        // Validación básica mediante JS (Criterio de aceptación HU-04)
        if (tipoInmueble === "" || mensajeRequerimiento === "") {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        // Generar un código único de seguimiento aleatorio (Ej. DOMO-8492)
        const codigoSeguimiento = "DOMO-" + Math.floor(1000 + Math.random() * 9000);

        // Mostrar alerta de éxito con el código
        formAlert.style.display = 'block';
        formAlert.innerHTML = `<strong>¡Solicitud enviada con éxito!</strong> Tu código único de seguimiento es: <strong>${codigoSeguimiento}</strong>. La empresa te contactará pronto.`;

        // Limpiar formulario
        cotizacionForm.reset();
    });
}
// Lógica para el Registro de PYMEs (HU-05)
const pymeRegisterForm = document.getElementById('pymeRegisterForm');
const pymeAlert = document.getElementById('pymeAlert');

if (pymeRegisterForm) {
    pymeRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const pymeNit = document.getElementById('pymeNit').value.trim();
        const pymeRazonSocial = document.getElementById('pymeRazonSocial').value.trim();
        const pymeCiudad = document.getElementById('pymeCiudad').value.trim();

        // Validar que no estén vacíos
        if (pymeNit === "" || pymeRazonSocial === "" || pymeCiudad === "") {
            alert("Por favor completa todos los campos del registro.");
            return;
        }

        // Mostrar alerta indicando el estado inicial "Pendiente de Validación" (Criterio HU-05)
        pymeAlert.style.display = 'block';
        pymeAlert.innerHTML = `<strong>¡Registro exitoso!</strong> La empresa <strong>${pymeRazonSocial}</strong> ha sido registrada. Estado actual: <span style="font-weight: bold; color: #b45309;">PENDIENTE DE VALIDACIÓN</span> (Un administrador revisará tus documentos pronto).`;

        // Limpiar el formulario
        pymeRegisterForm.reset();
    });
}
// HU-06 (PC1025-32): Lógica para Gestión de Portafolio de Servicios de PYME
let portafolioServicios = [
    { id: 1, nombre: "Kit de Cámaras IP", categoria: "Seguridad", espec: "Cámaras con detección de movimiento.", activo: true },
    { id: 2, nombre: "Iluminación Inteligente", categoria: "Iluminación", espec: "Control de luces mediante app.", activo: true }
];

const nuevoServicioForm = document.getElementById('nuevoServicioForm');
const listaServiciosContainer = document.getElementById('listaServicios');

function renderizarPortafolio() {
    if (!listaServiciosContainer) return;
    listaServiciosContainer.innerHTML = "";

    if (portafolioServicios.length === 0) {
        listaServiciosContainer.innerHTML = `<p style="color: #64748b;">No hay servicios registrados en tu catálogo.</p>`;
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
                <button class="btn-toggle" data-id="${servicio.id}" style="padding: 0.5rem 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: ${servicio.activo ? '#f59e0b' : '#10b981'}; color: #fff; font-size: 0.8rem;">${servicio.activo ? 'Desactivar' : 'Activar'}</button>
                <button class="btn-eliminar" data-id="${servicio.id}" style="padding: 0.5rem 0.75rem; border: none; border-radius: 6px; cursor: pointer; background: #ef4444; color: #fff; font-size: 0.8rem;">Eliminar</button>
            </div>
        `;

        item.querySelector('.btn-toggle').addEventListener('click', () => {
            servicio.activo = !servicio.activo;
            renderizarPortafolio();
        });

        item.querySelector('.btn-eliminar').addEventListener('click', () => {
            portafolioServicios = portafolioServicios.filter(s => s.id !== servicio.id);
            renderizarPortafolio();
        });

        listaServiciosContainer.appendChild(item);
    });
}

if (nuevoServicioForm) {
    nuevoServicioForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('servicioNombre').value.trim();
        const categoria = document.getElementById('servicioCategoria').value;
        const espec = document.getElementById('servicioEspec').value.trim();

        if (!nombre || !categoria || !espec) {
            alert("Completa todos los campos.");
            return;
        }

        portafolioServicios.push({ id: Date.now(), nombre, categoria, espec, activo: true });
        renderizarPortafolio();
        nuevoServicioForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', renderizarPortafolio);

// HU-07 (PC1025-33): Lógica para la Bandeja de Gestión de Solicitudes Recibidas
let solicitudesComerciales = [
    { id: 1, cliente: "Andrea Restrepo", inmueble: "Apartamento", detalle: "Automatización de iluminación en sala y comedor.", fecha: "2026-11-10", estadoComercial: "Pendiente" },
    { id: 2, cliente: "Carlos Pérez", inmueble: "Casa Residencial", detalle: "Instalación de cámaras de seguridad perimetral.", fecha: "2026-11-09", estadoComercial: "En Negociación" }
];

const bandejaContainer = document.getElementById('bandejaSolicitudesContainer');

function renderizarBandejaSolicitudes() {
    if (!bandejaContainer) return;
    bandejaContainer.innerHTML = "";

    if (solicitudesComerciales.length === 0) {
        bandejaContainer.innerHTML = `<p style="color: #64748b;">No hay solicitudes de cotización recibidas en este momento.</p>`;
        return;
    }

    solicitudesComerciales.forEach(sol => {
        let colorEstado = "#f59e0b"; // Pendiente
        if (sol.estadoComercial === "En Negociación") colorEstado = "#2563eb";
        if (sol.estadoComercial === "Cerrada / Ganada") colorEstado = "#166534";

        const item = document.createElement('div');
        item.style.cssText = "background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;";

        item.innerHTML = `
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; font-size: 1.05rem; color: #0f172a;">${sol.cliente} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">(${sol.inmueble})</span></h4>
                    <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; background: #e2e8f0; color: #334155;">Fecha: ${sol.fecha}</span>
                </div>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.9rem; color: #334155;"><strong>Requerimiento:</strong> ${sol.detalle}</p>
                <p style="margin: 0; font-size: 0.85rem;"><strong>Estado comercial:</strong> <span style="font-weight: bold; color: ${colorEstado};">${sol.estadoComercial}</span></p>
            </div>
            <div style="min-width: 160px;">
                <select class="select-estado-comercial" data-id="${sol.id}" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.85rem; background: #fff;">
                    <option value="Pendiente" ${sol.estadoComercial === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="En Negociación" ${sol.estadoComercial === 'En Negociación' ? 'selected' : ''}>En Negociación</option>
                    <option value="Cerrada / Ganada" ${sol.estadoComercial === 'Cerrada / Ganada' ? 'selected' : ''}>Cerrada / Ganada</option>
                </select>
            </div>
        `;

        item.querySelector('.select-estado-comercial').addEventListener('change', (e) => {
            sol.estadoComercial = e.target.value;
            renderizarBandejaSolicitudes();
        });

        bandejaContainer.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarBandejaSolicitudes();
});

// HU-08 (PC1025-34): Lógica para Calificación y Reseña de Servicios Contratados
const resenaForm = document.getElementById('resenaForm');
const resenaAlert = document.getElementById('resenaAlert');

if (resenaForm) {
    resenaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const estrellas = document.getElementById('estrellas').value;
        const comentario = document.getElementById('comentarioResena').value.trim();

        if (estrellas === "" || comentario === "") {
            alert("Por favor completa todos los campos de la calificación.");
            return;
        }

        // Mostrar alerta de éxito
        resenaAlert.style.display = 'block';
        resenaAlert.innerHTML = `<strong>¡Gracias por tu opinión!</strong> Has calificado con <strong>${estrellas} estrellas</strong>. Tu reseña ha sido publicada exitosamente.`;

        // Limpiar formulario
        resenaForm.reset();
    });
}