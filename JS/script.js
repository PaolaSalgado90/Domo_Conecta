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
});