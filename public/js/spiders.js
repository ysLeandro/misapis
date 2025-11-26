const getSpiders = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/spiders");
    const data = await res.json();
    return data.spiders || [];
  } catch (error) {
    console.error("Error al obtener los Spiders:", error);
    return [];
  }
};

const mezclarSpiders = (spiders) => {
  return spiders.sort(() => Math.random() - 0.5);
};


const setSpidersAleatorioDOM = (spiders) => {
  const $divAleatorio = document.querySelector(".aleatorio");
  if (!$divAleatorio) return;

  const spidersAleatorios = mezclarSpiders([...spiders]).slice(0, 10);

  $($divAleatorio).trigger("destroy.owl.carousel");

  let html = spidersAleatorios
    .map(
      (s, i) => `
      <div class="owl-carousel-info-wrap item ${i === 4 ? "center" : ""}">
        <img src="${s.imagen || "images/default_spider.png"}" 
             class="owl-carousel-image img-fluid" alt="${s.nombre}">
        <div class="owl-carousel-info mt-2">
          <h4 class="mb-1">${s.nombre}</h4>
          <p class="mb-1"><strong>Alias:</strong> ${s.alias || "Desconocido"}</p>
          <span class="badge bg-warning text-dark">${s.universo}</span>
        </div>
      </div>
    `
    )
    .join("");

  $divAleatorio.innerHTML = html;

  $($divAleatorio).owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 }
    }
  });
};

let globalSpiders = [];
let currentSpiderIndex = 0;

const renderSingleSpider = (index) => {
  const container = document.querySelector(".navegaspider");
  if (!container || globalSpiders.length === 0) return;

  const s = globalSpiders[index];

  container.innerHTML = `
    <div class="col-lg-6 col-md-8 mx-auto text-center">
      <div class="custom-block custom-block-full spider-item">
        <div class="custom-block-image-wrap">
          <img src="${s.imagen || 'images/default_spider.png'}" 
               alt="${s.nombre}" 
               class="custom-block-image rounded">
        </div>
        <div class="custom-block-info mt-3 d-flex flex-column align-items-center">
          <h3 class="mb-2">${s.nombre}</h3>
          <p class="mb-1"><strong>Alias:</strong> ${s.alias || "Desconocido"}</p>
          <p class="mb-1"><strong>Universo:</strong> ${s.universo}</p>
          <div class="d-flex flex-column gap-2 mt-3 w-100">
            <button class="btn btn-dark" onclick="renderSpiderDetail(globalSpiders[${index}])">Ver más</button>
            <button class="btn btn-warning" onclick="editarSpider(globalSpiders[${index}])">Editar</button>
          </div>
        </div>
      </div>
    </div>
  `;
};


const setupNavigation = () => {
  const prevBtn = document.querySelector("#btnAnterior");
  const nextBtn = document.querySelector("#btnSiguiente");

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    if (globalSpiders.length === 0) return;
    currentSpiderIndex = (currentSpiderIndex - 1 + globalSpiders.length) % globalSpiders.length;
    renderSingleSpider(currentSpiderIndex);
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    if (globalSpiders.length === 0) return;
    currentSpiderIndex = (currentSpiderIndex + 1) % globalSpiders.length;
    renderSingleSpider(currentSpiderIndex);
  });
};


const renderSpiderDetail = (spider) => {
  const modalBody = document.querySelector(".detallespider-modal");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="text-center">
      <h3 class="mb-3 text-capitalize">${spider.nombre}</h3>
      <img 
        src="${spider.imagen || 'images/default_spider.png'}" 
        class="img-fluid mb-3" 
        alt="${spider.nombre}" 
        style="max-width:250px;"
      >
      <p><strong>Alias:</strong> ${spider.alias || "Desconocido"}</p>
      <p><strong>Universo:</strong> ${spider.universo}</p>
      <p><strong>Origen:</strong> ${spider.origen || "Desconocido"}</p>
      <p><strong>Habilidades:</strong> ${spider.habilidades?.join(", ") || "No registradas"}</p>
      <p><strong>Año de aparición:</strong> ${spider.añoAparicion || "?"}</p>
      <p><strong>Descripción:</strong> ${spider.descripcion || "Sin descripción"}</p>
      <button class="btn btn-danger mt-3" onclick="eliminarSpider('${spider._id}')">Eliminar Spider-Man</button>
    </div>
  `;


  const modal = new bootstrap.Modal(document.getElementById("spiderModal"));
  modal.show();
};

const editarSpider = (spider) => {
  const modalBody = document.querySelector(".detallespider-modal");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <form id="formEditarSpider" class="d-flex flex-column gap-2">
      <input type="text" class="form-control" id="editNombre" value="${spider.nombre}" required>
      <input type="text" class="form-control" id="editUniverso" value="${spider.universo}" required>
      <input type="text" class="form-control" id="editAlias" value="${spider.alias || ''}">
      <input type="text" class="form-control" id="editHabilidades" value="${(spider.habilidades || []).join(', ')}">
      <input type="text" class="form-control" id="editOrigen" value="${spider.origen || ''}">
      <input type="number" class="form-control" id="editAñoAparicion" value="${spider.añoAparicion || ''}">
      <input type="text" class="form-control" id="editImagen" value="${spider.imagen || ''}">
      <textarea class="form-control" id="editDescripcion" rows="3">${spider.descripcion || ''}</textarea>
      <button type="submit" class="btn btn-warning w-100 mt-2">Guardar Cambios</button>
    </form>
  `;

  const modal = new bootstrap.Modal(document.getElementById("spiderModal"));
  modal.show();

  document.getElementById("formEditarSpider").onsubmit = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("editNombre").value.trim();
    const universo = document.getElementById("editUniverso").value.trim();
    const alias = document.getElementById("editAlias").value.trim();
    const habilidades = document.getElementById("editHabilidades").value.split(",").map(h => h.trim()).filter(h => h);
    const origen = document.getElementById("editOrigen").value.trim();
    const añoAparicion = parseInt(document.getElementById("editAñoAparicion").value) || null;
    const imagen = document.getElementById("editImagen").value.trim();
    const descripcion = document.getElementById("editDescripcion").value.trim();

    try {
      const res = await fetch(`http://localhost:3000/api/spiders/${spider._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, universo, alias, habilidades, origen, añoAparicion, imagen, descripcion })
      });

      if (res.ok) {
        mostrarAlerta("Spider actualizado correctamente", "edit");
        modal.hide();

        const spiders = await getSpiders();
        globalSpiders = spiders;
        setSpidersAleatorioDOM(spiders);
        renderSingleSpider(0);
      } else {
        alert("Error al actualizar Spider-Man");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
    }
  };
};

// --- Búsqueda minimalista ---
const setupSpiderSearch = () => {
  const searchInput = document.getElementById("searchSpider");
  const resultsDiv = document.getElementById("searchResults");
  if (!searchInput || !resultsDiv) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      resultsDiv.style.display = "none";
      renderSingleSpider(currentSpiderIndex);
      return;
    }

    const matches = globalSpiders.filter(s => {
      return (
        s.nombre.toLowerCase().includes(query) ||
        (s.alias && s.alias.toLowerCase().includes(query)) ||
        (s.universo && s.universo.toLowerCase().includes(query)) ||
        (s.habilidades && s.habilidades.some(h => h.toLowerCase().includes(query))) ||
        (s.descripcion && s.descripcion.toLowerCase().includes(query))
      );
    });

    if (matches.length > 0) {
      resultsDiv.innerHTML = matches.map((s, i) => `
        <div class="d-flex align-items-center gap-2 p-2 search-item" style="cursor:pointer;">
          <img src="${s.imagen || 'images/default_spider.png'}" alt="${s.nombre}" width="40" height="40" class="rounded">
          <div>
            <strong>${s.nombre}</strong><br>
            <small>${s.alias || s.universo}</small>
          </div>
        </div>
      `).join("");
      resultsDiv.style.display = "block";

      resultsDiv.querySelectorAll(".search-item").forEach((el, idx) => {
        el.addEventListener("click", () => {
          const selectedIndex = globalSpiders.indexOf(matches[idx]);
          if (selectedIndex !== -1) {
            currentSpiderIndex = selectedIndex;
            renderSingleSpider(currentSpiderIndex);
            resultsDiv.style.display = "none";
            searchInput.value = "";
          }
        });
      });
    } else {
      resultsDiv.innerHTML = `<div class="p-2 text-center text-muted">No se encontraron resultados</div>`;
      resultsDiv.style.display = "block";
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.parentElement.contains(e.target)) {
      resultsDiv.style.display = "none";
    }
  });
};

const eliminarSpider = async (id) => {
  if (!id) return;

  const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este Spider-Man?");
  
  if (!confirmDelete) return; // Si el usuario cancela, no hacemos nada.

  try {
    const res = await fetch(`http://localhost:3000/api/spiders/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      mostrarAlerta("Spider-Man eliminado correctamente", "delete");

      // Cerrar modal si estaba abierto
      const modalEl = document.getElementById("spiderModal");
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      // Actualizar la sección de los Spiders (navegaspider)
      const spiders = await getSpiders();  // Obtener la lista actualizada de Spiders
      globalSpiders = spiders;  // Actualizar el array global de Spiders

      setSpidersAleatorioDOM(spiders);  
      renderSingleSpider(0);  

    } else {
      const text = await res.text();
      console.error("Error al eliminar:", text);
      alert("Error al eliminar (ver consola).");
    }
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el servidor");
  }
};


function mostrarAlerta(mensaje, tipo = "success") {
    const div = document.getElementById("alertaSpider");

    div.textContent = mensaje;
    div.style.display = "block";

    switch (tipo) {
        case "success": 
            div.style.background = "linear-gradient(45deg, #007a00, #00cc44)";
            break;

        case "edit": 
            div.style.background = "linear-gradient(45deg, #0044aa, #3399ff)";
            break;

        case "delete": 
            div.style.background = "linear-gradient(45deg, #8b0000, #ff4444)";
            break;

        case "error": 
            div.style.background = "linear-gradient(45deg, #660000, #cc0000)";
            break;
    }

    setTimeout(() => {
        div.style.display = "none";
    }, 2500);
}


window.addEventListener("load", async () => {
  const spiders = await getSpiders();

  if (spiders.length > 0) {
    globalSpiders = spiders;
    setSpidersAleatorioDOM(spiders);
    renderSingleSpider(0);
    setupNavigation();
    setupSpiderSearch(); 
  } else {
    document.querySelector(".navegaspider").innerHTML = `<p>No hay Spiders disponibles.</p>`;
  }
});


// ===============================
//   LISTADO SIMPLE DE SPIDERS
// ===============================
async function cargarListadoSpiders() {
    const contenedor = document.getElementById("contenedorListaSpiders");
    const buscador = document.getElementById("buscarListado");

    if (!contenedor || !buscador) return; // Evita errores si estamos en index

    const spiders = await getSpiders();
    let spidersFiltrados = [...spiders];

    const render = () => {
        contenedor.innerHTML = spidersFiltrados
            .map(s => `
                <div class="col-md-4 col-lg-3 mb-3">
                    <div class="spider-card">
                        <img src="${s.imagen || 'images/default_spider.png'}"
                             alt="${s.nombre}"
                             class="img-fluid rounded mb-2"
                             style="height:180px;object-fit:cover;">
                        <h5>${s.nombre}</h5>
                        <p class="mb-0"><strong>Alias:</strong> ${s.alias || "Desconocido"}</p>
                        <p class="text-warning">${s.universo}</p>
                    </div>
                </div>
            `)
            .join("");
    };

    render();

    // BUSCADOR EN TIEMPO REAL
    buscador.addEventListener("input", () => {
        const q = buscador.value.toLowerCase();

        spidersFiltrados = spiders.filter(s =>
            s.nombre.toLowerCase().includes(q) ||
            (s.alias && s.alias.toLowerCase().includes(q)) ||
            (s.universo && s.universo.toLowerCase().includes(q))
        );

        render();
    });
}

// Ejecuta SOLO si estás en listarspiders.html
window.addEventListener("DOMContentLoaded", cargarListadoSpiders);