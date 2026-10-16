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