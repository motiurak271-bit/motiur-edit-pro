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

// --- Features (সব ফাংশন এখানে) ---

// ব্রাইটনেস এবং জুম কন্ট্রোল
function applyAdjustments() {
    const b = document.getElementById('brightness-slider').value;
    const z = document.getElementById('zoom-slider').value;
    
    // ব্রাইটনেস এবং জুম একসাথে কাজ করার জন্য
    video.style.filter = `brightness(${b}%)`;
    video.style.transform = `scale(${z})`;
}

// ফিল্টার অ্যাপ্লাই
function applyFilter(f) { 
    video.style.filter = f; 
    // ফিল্টার দিলে স্লাইডারের ব্রাইটনেস ১০০% এ রিসেট হয়ে যাবে যেন ঝামেলা না হয়
    document.getElementById('brightness-slider').value = 100;
}

// স্পিড কন্ট্রোল
function changeSpeed(s) { video.playbackRate = s; }

// টেক্সট আপডেট
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
