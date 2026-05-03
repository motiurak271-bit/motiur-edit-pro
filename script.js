const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });
const video = document.getElementById('main-video');
const overlay = document.getElementById('text-overlay');
const bgMusic = new Audio();

// Splash Screen
window.onload = () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            const app = document.getElementById('main-app');
            app.style.display = 'block';
            setTimeout(() => app.style.opacity = '1', 50);
        }, 800);
    }, 2000);
};

// Uploads
document.getElementById('video-upload').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        video.src = URL.createObjectURL(file);
        video.style.display = 'block';
        document.getElementById('placeholder-icon').style.display = 'none';
        document.getElementById('video-track').innerText = "Video: " + file.name;
    }
};

document.getElementById('audio-upload').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        bgMusic.src = URL.createObjectURL(file);
        document.getElementById('audio-track').innerText = "Audio: " + file.name;
    }
};

// Panel Toggle
function showSection(id) {
    const sections = document.querySelectorAll('.controls-section');
    sections.forEach(s => {
        if (s.id === id) {
            s.style.display = (s.style.display === 'block') ? 'none' : 'block';
        } else {
            s.style.display = 'none';
        }
    });
}

// Features
function applyFilter(f) { video.style.filter = f; }
function changeSpeed(s) { video.playbackRate = s; }
function updateText() {
    const val = document.getElementById('user-text').value;
    overlay.innerText = val;
    overlay.style.display = val ? 'block' : 'none';
}

// Export
async function highQualityExport() {
    if (!video.src) return alert("Select video first!");
    alert("Export starting... please wait.");
    // Export logic here...
}
