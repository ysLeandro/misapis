const API_URL = "http://localhost:3000/api/spiders";

const formAgregar = document.getElementById("formAgregarSpider");

if (formAgregar) {
    formAgregar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const universo = document.getElementById("universo").value.trim();
        const alias = document.getElementById("alias").value.trim();
        const habilidades = document.getElementById("habilidades").value
            .split(",")
            .map(h => h.trim())
            .filter(h => h);
        const origen = document.getElementById("origen").value.trim();
        const añoAparicion = parseInt(document.getElementById("añoAparicion").value) || null;
        const imagen = document.getElementById("imagen").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();

        const newSpider = { 
            nombre,
            universo,
            alias,
            habilidades,
            origen,
            añoAparicion,
            imagen,
            descripcion
        };

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSpider)
            });

            if (res.ok) {
                const data = await res.json();

                mostrarAlerta("Spider-Man agregado correctamente.");

                formAgregar.reset();

                const modal = bootstrap.Modal.getInstance(
                  document.getElementById("modalAgregarSpider")
                );
                modal.hide();

                if (typeof getSpiders === "function") {
                    const spiders = await getSpiders();
                    globalSpiders = spiders;
                    setSpidersAleatorioDOM(spiders);

                    currentSpiderIndex = spiders.findIndex(s => s._id === data.spider._id);
                    if (currentSpiderIndex === -1) currentSpiderIndex = 0;
                    renderSingleSpider(currentSpiderIndex);
                }

            } else {
                mostrarAlerta("Error al agregar Spider", "error");
            }

        } catch (error) {
            mostrarAlerta("Error al conectar con el servidor", "error");
            console.error(error);
        }
    });
}

document.getElementById("btnAgregarSpider").addEventListener("click", function (e) {
    e.preventDefault();
    let modal = new bootstrap.Modal(document.getElementById('modalAgregarSpider'));
    modal.show();
});