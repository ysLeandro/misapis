// 🌌 Generar partículas Spider-Verse en el modal
const spiderModal = document.getElementById('spiderModal');

spiderModal.addEventListener('show.bs.modal', () => {
  const modalContent = spiderModal.querySelector('.modal-content');
  
  // Crear contenedor de partículas si no existe
  let particleContainer = modalContent.querySelector('.spiderverse-particles');
  if (!particleContainer) {
    particleContainer = document.createElement('div');
    particleContainer.classList.add('spiderverse-particles');
    modalContent.prepend(particleContainer);

    // Generar partículas aleatorias
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('span');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Colores neón aleatorios
      const colors = ['#ff1e00', '#9a00ff', '#00b3ff'];
      particle.style.background = `radial-gradient(circle, ${
        colors[Math.floor(Math.random() * colors.length)]
      } 0%, transparent 70%)`;

      // Duración y retardo aleatorios
      particle.style.animationDuration = `${5 + Math.random() * 3}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;

      particleContainer.appendChild(particle);
    }
  }
});

spiderModal.addEventListener('hidden.bs.modal', () => {
  const particleContainer = spiderModal.querySelector('.spiderverse-particles');
  if (particleContainer) particleContainer.remove();
});