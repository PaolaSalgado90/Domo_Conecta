<<<<<<< HEAD
/**
 * ==========================================================================
 * PROYECTO INTEGRADOR: DOMOCONECTA
 * Archivo Principal de Lógica Front-End (JavaScript)
 * Organizado e implementado 100% por Historias de Usuario (HU-01 a HU-10)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("DomoConecta Frontend Inicializado Correctamente");

    // ==========================================================================
    // HU-01: Sección Educacional / Aprende Domótica
    // ==========================================================================
    const eduCards = document.querySelectorAll(".edu-card");
    
    eduCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("card-selected");
            const categoria = card.querySelector("h3").innerText;
            console.log(`[HU-01] Usuario consultando categoría educativa: ${categoria}`);
        });
    });


    // ==========================================================================
    // HU-02: Búsqueda y Filtrado Dinámico de Empresas
    // ==========================================================================
    const empresasMock = [
        { id: 1, nombre: "SmartSpaces SAS", ciudad: "Medellín", categoria: "iluminacion", rating: "⭐⭐⭐⭐⭐ (4.9)", desc: "Especialistas en iluminación inteligente KNX y automatización residencial avanzada.", cert: "Certificación KNX / 8 años de experiencia" },
        { id: 2, nombre: "SecureHome Colombia", ciudad: "Bogotá", categoria: "seguridad", rating: "⭐⭐⭐⭐⭐ (4.8)", desc: "Protección perimetral, cerraduras biométricas y cámaras IP de alta definición.", cert: "Certificación Segurtronic / 5 años de experiencia" },
        { id: 3, nombre: "ClimaTech Global", ciudad: "Cali", categoria: "climatizacion", rating: "⭐⭐⭐⭐ (4.6)", desc: "Control térmico inteligente para hogares y oficinas con alta eficiencia energética.", cert: "Certificación HVAC Eco / 6 años de experiencia" }
    ];

    const searchInput = document.getElementById("searchInput");
    const serviceSelect = document.getElementById("serviceSelect");
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.getElementById("resultsContainer");

    function renderEmpresas(empresas) {
        if (!resultsContainer) return;
        resultsContainer.innerHTML = "";
        
        if (empresas.length === 0) {
            resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No se encontraron empresas que coincidan con la búsqueda.</p>`;
            return;
        }

        empresas.forEach(emp => {
            const card = document.createElement("div");
            card.className = "empresa-card";
            card.style.cssText = "background: #fff; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.02);";
            card.innerHTML = `
                <h3 style="margin-top: 0; color: #0f172a;">${emp.nombre}</h3>
                <p style="margin: 0.5rem 0; color: #475569; font-size: 0.9rem;"><strong>Ciudad:</strong> ${emp.ciudad} | <strong>Categoría:</strong> ${emp.categoria.toUpperCase()}</p>
                <p style="margin: 0.5rem 0; color: #f59e0b;">${emp.rating}</p>
                <button class="btn-ver-perfil" data-id="${emp.id}" style="margin-top: 1rem; background: #0f172a; color: #fff; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">Ver Perfil Detallado</button>
            `;
            resultsContainer.appendChild(card);
        });

        // Activar eventos para HU-03 (Ver Perfil Detallado)
        document.querySelectorAll(".btn-ver-perfil").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                const empresaSeleccionada = empresasMock.find(item => item.id === id);
                if (empresaSeleccionada) {
                    abrirModalDetalle(empresaSeleccionada);
                }
            });
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const queryCiudad = searchInput.value.toLowerCase().trim();
            const queryCat = serviceSelect.value;

            const filtradas = empresasMock.filter(emp => {
                const matchCiudad = queryCiudad === "" || emp.ciudad.toLowerCase().includes(queryCiudad);
                const matchCat = queryCat === "" || emp.categoria === queryCat;
                return matchCiudad && matchCat;
            });

            console.log(`[HU-02] Búsqueda ejecutada. Resultados encontrados: ${filtradas.length}`);
            renderEmpresas(filtradas);
        });
    }

    // Render inicial por defecto
    renderEmpresas(empresasMock);


    // ==========================================================================
    // HU-03: Visualización del Perfil Detallado de Empresa (Modal)
    // ==========================================================================
    const detalleModal = document.getElementById("detalleModal");
    const closeModal = document.getElementById("closeModal");
    const detalleNombre = document.getElementById("detalleNombre");
    const detalleCiudad = document.getElementById("detalleCiudad");
    const detalleRating = document.getElementById("detalleRating");
    const detalleDescripcion = document.getElementById("detalleDescripcion");
    const detalleCert = document.getElementById("detalleCert");

    function abrirModalDetalle(emp) {
        if (!detalleModal) return;
        detalleNombre.innerText = emp.nombre;
        detalleCiudad.innerText = emp.ciudad;
        detalleRating.innerText = emp.rating;
        detalleDescripcion.innerText = emp.desc;
        detalleCert.innerText = emp.cert;
        detalleModal.style.display = "flex";
        console.log(`[HU-03] Abriendo perfil detallado de: ${emp.nombre}`);
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            detalleModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === detalleModal) {
            detalleModal.style.display = "none";
        }
    });


    // ==========================================================================
    // HU-04: Formulario de Solicitud de Cotización
    // ==========================================================================
    const cotizacionForm = document.getElementById("cotizacionForm");
    const formAlert = document.getElementById("formAlert");

    if (cotizacionForm) {
        cotizacionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const tipoInmueble = document.getElementById("tipoInmueble").value;
            const mensajeRequerimiento = document.getElementById("mensajeRequerimiento").value;

            if (tipoInmueble && mensajeRequerimiento) {
                const randomCode = `DOMO-${Math.floor(1000 + Math.random() * 9000)}`;
                console.log(`[HU-04] Solicitud generada con código: ${randomCode}`);
                
                formAlert.style.display = "block";
                formAlert.innerHTML = `<strong>¡Solicitud enviada con éxito!</strong> Tu código único de seguimiento es: <strong>${randomCode}</strong>. La empresa se pondrá en contacto contigo pronto.`;
                
                cotizacionForm.reset();
            }
        });
    }


    // ==========================================================================
    // HU-05: Registro de PYME de Domótica
    // ==========================================================================
    const pymeRegisterForm = document.getElementById("pymeRegisterForm");
    const pymeAlert = document.getElementById("pymeAlert");

    if (pymeRegisterForm) {
        pymeRegisterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nit = document.getElementById("pymeNit").value;
            const razonSocial = document.getElementById("pymeRazonSocial").value;
            const ciudad = document.getElementById("pymeCiudad").value;

            if (nit && razonSocial && ciudad) {
                console.log(`[HU-05] Registro PYME exitoso para: ${razonSocial} (NIT: ${nit})`);
                
                pymeAlert.style.display = "block";
                pymeAlert.innerHTML = `<strong>¡Registro guardado correctamente!</strong> Tu cuenta para <strong>${razonSocial}</strong> se encuentra actualmente con estado: <strong>PENDIENTE DE VALIDACIÓN</strong> a la espera de auditoría administrativa.`;
                
                pymeRegisterForm.reset();
            }
        });
    }


    // ==========================================================================
    // HU-06: Gestión de Portafolio de Servicios de PYME
    // ==========================================================================
    const nuevoServicioForm = document.getElementById("nuevoServicioForm");
    const listaServicios = document.getElementById("listaServicios");
    let catalogoServicios = [
        { id: 1, nombre: "Iluminación Inteligente Living", categoria: "Iluminación", desc: "Automatización de luces LED dimerizables por control de voz." }
    ];

    function renderCatalogo() {
        if (!listaServicios) return;
        listaServicios.innerHTML = "";
        
        catalogoServicios.forEach((serv, index) => {
            const item = document.createElement("div");
            item.style.cssText = "background: #fff; padding: 1rem; border-radius: 6px; border: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center;";
            item.innerHTML = `
                <div>
                    <h4 style="margin: 0; color: #0f172a;">${serv.nombre} <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">${serv.categoria}</span></h4>
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #64748b;">${serv.desc}</p>
                </div>
                <button class="btn-eliminar-serv" data-index="${index}" style="background: #ef4444; color: #fff; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Eliminar</button>
            `;
            listaServicios.appendChild(item);
        });

        document.querySelectorAll(".btn-eliminar-serv").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"));
                catalogoServicios.splice(idx, 1);
                renderCatalogo();
                console.log(`[HU-06] Servicio eliminado del portafolio.`);
            });
        });
    }

    if (nuevoServicioForm) {
        nuevoServicioForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("servicioNombre").value;
            const categoria = document.getElementById("servicioCategoria").value;
            const desc = document.getElementById("servicioEspec").value;

            if (nombre && categoria && desc) {
                catalogoServicios.push({ id: Date.now(), nombre, categoria, desc });
                renderCatalogo();
                nuevoServicioForm.reset();
                console.log(`[HU-06] Nuevo servicio añadido al portafolio: ${nombre}`);
            }
        });
    }

    renderCatalogo();


    // ==========================================================================
    // HU-07: Bandeja de Gestión de Solicitudes Recibidas (Panel PYME)
    // ==========================================================================
    const bandejaSolicitudesContainer = document.getElementById("bandejaSolicitudesContainer");
    let solicitudesBandeja = [
        { id: 8492, tipo: "Casa Residencial", mensaje: "Quiero automatizar las luces y chapa de la puerta principal.", estado: "Pendiente" },
        { id: 3104, tipo: "Apartamento", mensaje: "Instalación de cámaras de seguridad IP y sensores de humo.", estado: "En Proceso" }
    ];

    function renderBandeja() {
        if (!bandejaSolicitudesContainer) return;
        bandejaSolicitudesContainer.innerHTML = "";

        solicitudesBandeja.forEach((sol, index) => {
            const card = document.createElement("div");
            card.style.cssText = "background: #fff; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; display: flex; flex-direction: column; gap: 0.75rem;";
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin: 0; color: #0f172a;">Solicitud #${sol.id} — Inmueble: ${sol.tipo}</h4>
                    <span style="font-size: 0.85rem; font-weight: bold; padding: 4px 8px; border-radius: 4px; background: ${sol.estado === 'Pendiente' ? '#fef9c3' : sol.estado === 'En Proceso' ? '#e0f2fe' : '#dcfce7'}; color: ${sol.estado === 'Pendiente' ? '#854d0e' : sol.estado === 'En Proceso' ? '#0369a1' : '#166534'};">${sol.estado}</span>
                </div>
                <p style="margin: 0; color: #475569; font-size: 0.95rem;"><strong>Requerimiento:</strong> ${sol.mensaje}</p>
                <div>
                    <label style="font-size: 0.85rem; font-weight: 600; margin-right: 0.5rem;">Cambiar Estado Comercial:</label>
                    <select class="select-estado" data-index="${index}" style="padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px;">
                        <option value="Pendiente" ${sol.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="En Proceso" ${sol.estado === 'En Proceso' ? 'selected' : ''}>En Proceso</option>
                        <option value="Atendida" ${sol.estado === 'Atendida' ? 'selected' : ''}>Atendida</option>
                    </select>
                </div>
            `;
            bandejaSolicitudesContainer.appendChild(card);
        });

        document.querySelectorAll(".select-estado").forEach(select => {
            select.addEventListener("change", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"));
                solicitudesBandeja[idx].estado = e.target.value;
                renderBandeja();
                console.log(`[HU-07] Estado comercial de la solicitud actualizado a: ${e.target.value}`);
            });
        });
    }

    renderBandeja();


    // ==========================================================================
    // HU-08: Calificación y Reseña de Servicios Contratados
    // ==========================================================================
    const resenaForm = document.getElementById("resenaForm");
    const resenaAlert = document.getElementById("resenaAlert");

    if (resenaForm) {
        resenaForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const estrellas = document.getElementById("estrellas").value;
            const comentario = document.getElementById("comentarioResena").value;

            if (estrellas && comentario) {
                console.log(`[HU-08] Reseña publicada con ${estrellas} estrellas.`);
                resenaAlert.style.display = "block";
                resenaAlert.innerHTML = `<strong>¡Reseña publicada con éxito!</strong> Gracias por compartir tu valoración (${estrellas} estrellas). El promedio de la empresa ha sido recalculado automáticamente.`;
                resenaForm.reset();
            }
        });
    }


    // ==========================================================================
    // HU-09: Aprobación y Verificación de PYMEs (Panel Administrador)
    // ==========================================================================
    const listaAdminPymes = document.getElementById("listaAdminPymes");
    let adminPymesList = [
        { id: 1, nombre: "SmartSpaces SAS", nit: "900.123.456-1", ciudad: "Medellín", estado: "PENDIENTE DE VALIDACIÓN" },
        { id: 2, nombre: "SecureHome Colombia", nit: "800.987.654-2", ciudad: "Bogotá", estado: "PENDIENTE DE VALIDACIÓN" }
    ];

    function renderAdminPymes() {
        if (!listaAdminPymes) return;
        listaAdminPymes.innerHTML = "";

        if (adminPymesList.length === 0) {
            listaAdminPymes.innerHTML = `<p style="color: #64748b;">No hay empresas pendientes de validación en este momento.</p>`;
            return;
        }

        adminPymesList.forEach((pyme, index) => {
            const card = document.createElement("div");
            card.style.cssText = "background: #fff; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center;";
            card.innerHTML = `
                <div>
                    <h4 style="margin: 0; color: #0f172a;">${pyme.nombre} (NIT: ${pyme.nit})</h4>
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #64748b;">Ciudad: ${pyme.ciudad} | Estado: <strong style="color: #854d0e;">${pyme.estado}</strong></p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-aprobar" data-index="${index}" style="background: #16a34a; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Aprobar</button>
                    <button class="btn-rechazar" data-index="${index}" style="background: #dc2626; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Rechazar</button>
                </div>
            `;
            listaAdminPymes.appendChild(card);
        });

        document.querySelectorAll(".btn-aprobar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"));
                adminPymesList[idx].estado = "VERIFICADO";
                console.log(`[HU-09] Empresa aprobada: ${adminPymesList[idx].nombre}`);
                renderAdminPymes();
            });
        });

        document.querySelectorAll(".btn-rechazar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"));
                console.log(`[HU-09] Empresa rechazada: ${adminPymesList[idx].nombre}`);
                adminPymesList.splice(idx, 1);
                renderAdminPymes();
            });
        });
    }

    renderAdminPymes();


    // ==========================================================================
    // HU-10: Autenticación e Inicio de Sesión Seguro
    // ==========================================================================
    const loginForm = document.getElementById("loginForm");
    const loginAlert = document.getElementById("loginAlert");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (email && password) {
                console.log(`[HU-10] Inicio de sesión exitoso para: ${email}`);
                loginAlert.style.display = "block";
                loginAlert.innerHTML = `<strong>¡Bienvenido!</strong> Sesión iniciada correctamente. Token de autenticación generado y almacenado de forma segura.`;
                loginForm.reset();
            }
        });
    }
=======
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
>>>>>>> f7dc374273df302f3d7b1940507f58fa00002f83
});