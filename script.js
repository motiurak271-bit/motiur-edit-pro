// FFmpeg Setup
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

const video = document.getElementById('main-video');
const overlay = document.getElementById('text-overlay');
const bgMusic = new Audio();

// Handle Splash Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const app = document.getElementById('main-app');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            app.style.display = 'block';
            setTimeout(() => app.style.opacity = '1', 50);
        }, 800);
    }, 2500);
});

// Video Upload Logic
document.getElementById('video-upload').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        video.src = URL.createObjectURL(file);
        video.style.display = 'block';
        document.getElementById('placeholder-icon').style.display = 'none';
        document.getElementById('video-track').innerHTML = `<i class="fa-solid fa-file-video"></i> ${file.name}`;
    }
};

// Audio Upload Logic
document.getElementById('audio-upload').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        bgMusic.src = URL.createObjectURL(file);
        document.getElementById('audio-track').innerHTML = `<i class="fa-solid fa-music"></i> ${file.name}`;
    }
};

// Unified Toggle Function (Fix)
function showSection(id) {
    const sections = document.querySelectorAll('.controls-section');
    sections.forEach(s => {
        if (s.id === id) {
            // যদি আগে থেকে খোলা থাকে তবে বন্ধ করো, না হলে খোলো
            s.style.display = (s.style.display === 'block') ? 'none' : 'block';
            s.classList.add('active');
        } else {
            s.style.display = 'none';
            s.classList.remove('active');
        }
    });
}

// Editor Functions
function updateText() {
    const val = document.getElementById('user-text').value;
    overlay.innerText = val;
    overlay.style.display = val ? 'block' : 'none';
}

function seekVideo(val) {
    video.currentTime = (val / 100) * video.duration;
}

// Modern Filter & Speed Functions
function applyFilter(val) { 
    video.style.filter = val; 
    video.className = 'video-canvas'; // Clear old classes
}

function changeSpeed(val) { 
    video.playbackRate = val; 
}

// Pro Export Function
async function highQualityExport() {
    if (!video.src) return alert("Please select a video first!");
    alert("FFmpeg loading... Please wait.");
    try {
        if (!ffmpeg.isLoaded()) await ffmpeg.load();
        ffmpeg.FS('writeFile', 'input_v.mp4', await fetchFile(video.src));
        let command = ['-i', 'input_v.mp4'];
        if (bgMusic.src) {
            ffmpeg.FS('writeFile', 'input_a.mp3', await fetchFile(bgMusic.src));
            command.push('-i', 'input_a.mp3', '-c:v', 'copy', '-map', '0:v:0', '-map', '1:a:0', '-shortest');
        }
        command.push('output.mp4');
        await ffmpeg.run(...command);
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Bondhu_Motiur_Edited.mp4';
        a.click();
        alert('Export Success!');
    } catch (err) {
        console.error(err);
        alert("Export failed!");
    }
}
