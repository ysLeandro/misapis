const audioPlayer = document.getElementById("audioPlayer");
const videoPlayer = document.getElementById("videoPlayer");
const volumeSlider = document.getElementById("volumeSlider");
const mediaTitle = document.getElementById("mediaTitle"); 
const progressBar = document.getElementById("progressBar");
const currentTimeSpan = document.getElementById("currentTime");
const durationTimeSpan = document.getElementById("durationTime");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const videoBtn = document.getElementById("videoBtn");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentMedia = null; // "audio" o "video"
let currentIndex = 0;

// Lista de archivos de la carpeta "musica"
const mediaFiles = [
    { file: "./musica/annihilate.mp3", name: "Annihilate" },
    { file: "./musica/self-love.mp3", name: "Self-love" },
    { file: "./musica/sunflower.mp3", name: "Sunflower" },
    { file: "./musica/calling.mp4", name: "Calling" }
];

// Inicializar volumen
audioPlayer.volume = 1; // 100%
videoPlayer.volume = 1;
volumeSlider.value = 100; // slider va de 0-100

// Cuando se mueve el slider
volumeSlider.addEventListener("input", () => {
    const vol = volumeSlider.value / 100; // convertimos a 0-1
    if (currentMedia === "audio") {
        audioPlayer.volume = vol;
    } else if (currentMedia === "video") {
        videoPlayer.volume = vol;
    }
});

// Función para cargar archivo según el índice
const loadMedia = (index) => {
    currentIndex = index;
    const media = mediaFiles[index];
    const filePath = media.file;
    const ext = filePath.split('.').pop().toLowerCase();

    // Actualizar el título del medio
    mediaTitle.textContent = ext === 'mp4' ? "Video: " + media.name : "Musica: " + media.name;

    // Pausar y ocultar el audio/video actual antes de cargar el nuevo
    if (currentMedia === "audio") {
        audioPlayer.pause();
        audioPlayer.style.display = "none";
    } else if (currentMedia === "video") {
        videoPlayer.pause();
        videoPlayer.style.display = "none";
    }

    if (ext === 'mp3') {
        audioPlayer.src = filePath;
        audioPlayer.style.display = "block";
        videoPlayer.style.display = "none";
        currentMedia = "audio";

        videoBtn.style.display = "none";
        closeBtn.style.display = "none";
    } else if (ext === 'mp4') {
        videoPlayer.src = filePath;
        videoPlayer.style.display = "block";
        audioPlayer.style.display = "none";
        currentMedia = "video";

        videoBtn.style.display = "inline";
        closeBtn.style.display = "none";
    }
};

// Reproducir / Pausar
playBtn.addEventListener("click", () => {
    if (currentMedia === "audio") {
        audioPlayer.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    } else if (currentMedia === "video") {
        videoPlayer.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    }
});

pauseBtn.addEventListener("click", () => {
    if (currentMedia === "audio") {
        audioPlayer.pause();
    } else if (currentMedia === "video") {
        videoPlayer.pause();
    }
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
});

// Siguiente / Anterior
nextBtn.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % mediaFiles.length;
    loadMedia(nextIndex);
    playBtn.click(); // auto reproducir
});

prevBtn.addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(prevIndex);
    playBtn.click(); // auto reproducir
});

// Mostrar / cerrar video
videoBtn.addEventListener("click", () => {
    videoPlayer.style.display = "block";
    closeBtn.style.display = "inline";
    videoBtn.style.display = "none";

    if (currentMedia === "audio") audioPlayer.pause();
    videoPlayer.play();
});

closeBtn.addEventListener("click", () => {
    videoPlayer.pause();
    videoPlayer.style.display = "none";
    closeBtn.style.display = "none";
    videoBtn.style.display = "inline";
});

// Actualizar barra mientras se reproduce
const updateProgress = () => {
    const player = currentMedia === "audio" ? audioPlayer : videoPlayer;
    progressBar.max = player.duration || 0;
    progressBar.value = player.currentTime;

    currentTimeSpan.textContent = formatTime(player.currentTime);
    durationTimeSpan.textContent = formatTime(player.duration || 0);
};

// Formatear segundos a mm:ss
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Actualizar cada 500ms
setInterval(() => {
    if (currentMedia) updateProgress();
}, 500);

// Permitir mover la barra para cambiar tiempo
progressBar.addEventListener("input", () => {
    const player = currentMedia === "audio" ? audioPlayer : videoPlayer;
    player.currentTime = progressBar.value;
});

// Cargar primer archivo al inicio
loadMedia(0);
