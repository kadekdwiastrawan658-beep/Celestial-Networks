const progressBar = document.getElementById('progress-bar');
const preloader = document.getElementById('preloader');
const navbar = document.querySelector('nav');
const reveals = document.querySelectorAll('.reveal');
const planets = document.querySelectorAll('.planet');
const starsContainer = document.getElementById('stars');
const customCursor = document.getElementById('custom-cursor');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('server-status');
const statusDetail = document.getElementById('status-detail');
const refreshStatusButton = document.getElementById('refresh-status');

let selectedRank = "";
let selectedPrice = "";
let lastMouseEvent = null;
let parallaxPending = false;
let lenis = null;

if (typeof Lenis !== "undefined") {

  lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

}

/* =========================
   CREATE STARS
========================= */
function createStars(count = 80) {
  if (!starsContainer) return;

  starsContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');

    star.className = 'star';

    const size = Math.random() * 2.4 + 0.4;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;

    star.style.opacity = Math.random() * 0.7 + 0.15;

    star.style.animationDuration = `${3 + Math.random() * 3}s`;

    starsContainer.appendChild(star);
  }
}

/* =========================
   PROGRESS BAR
========================= */
function updateProgressBar() {
  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent =
    docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.width = `${percent}%`;
}

/* =========================
   NAVBAR EFFECT
========================= */
function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* =========================
   REVEAL ANIMATION
========================= */
function revealOnScroll() {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 120) {
      el.classList.add('active');
    }
  });
}

/* =========================
   PARALLAX
========================= */
function applyParallax() {
  if (!lastMouseEvent) {
    parallaxPending = false;
    return;
  }

  const e = lastMouseEvent;

  const x =
    (e.clientX / window.innerWidth - 0.5) * 14;

  const y =
    (e.clientY / window.innerHeight - 0.5) * 14;

  planets.forEach((planet, index) => {
    const factor = 8 + index * 2;

    planet.style.transform =
      `translate3d(${x / factor}px, ${y / factor}px, 0)`;
  });

  parallaxPending = false;
}

function parallaxScene(e) {
  lastMouseEvent = e;

  if (!parallaxPending) {
    parallaxPending = true;
    requestAnimationFrame(applyParallax);
  }
}

/* =========================
   METEOR
========================= */
function spawnMeteor() {
  const meteor = document.createElement('div');

  meteor.className = 'meteor shoot';

  const startX =
    Math.random() * window.innerWidth * 0.7;

  const startY =
    Math.random() * window.innerHeight * 0.25;

  meteor.style.left = `${startX}px`;
  meteor.style.top = `${startY}px`;

  document.body.appendChild(meteor);

  setTimeout(() => meteor.remove(), 2000);
}

/* =========================
   SERVER STATUS
========================= */
function updateServerStatus(online = null) {
  const isOnline =
    online === null ? Math.random() > 0.4 : online;

  statusText.textContent =
    isOnline ? 'Online' : 'Offline';

  statusDot.className =
    `w-3 h-3 rounded-full ${
      isOnline ? 'bg-emerald-400' : 'bg-red-400'
    }`;

  statusDetail.textContent =
    isOnline
      ? `Ping ${Math.floor(30 + Math.random() * 60)} ms`
      : 'Server sedang offline';
}

function initServerStatus() {
  if (!refreshStatusButton) return;

  updateServerStatus();

  refreshStatusButton.addEventListener('click', () => {
    statusText.textContent = 'Memeriksa...';

    setTimeout(() => {
      updateServerStatus();
    }, 1000);
  });
}

/* =========================
   PLAYER DATA
========================= */
function generatePlayerData() {
  const names = [
    'Azraell',
    'Sanderpa',
    'AetherKyle',
    'Nova',
    'Rynix',
    'Zenith',
    'Kairo',
    'Lunox',
    'Havoc',
    'Velix'
  ];

  const playerList =
    document.getElementById('player-list');

  if (!playerList) return;

  playerList.innerHTML = '';

  for (let i = 0; i < names.length; i++) {
    const row = document.createElement('tr');

    row.className =
      'border-b border-indigo-800/30 hover:bg-indigo-900/20 transition';

    row.innerHTML = `
      <td class="py-3 px-2">${i + 1}</td>

      <td class="py-3 px-2">
        <div class="flex items-center gap-2">
          <img
            src="https://mc-heads.net/avatar/${names[i]}"
            class="w-8 h-8 rounded-lg border border-indigo-500/40"
          >

          <span class="text-indigo-300 font-semibold">
            ${names[i]}
          </span>
        </div>
      </td>

      <td class="text-center text-purple-300">
        Galaxy
      </td>

      <td class="text-center text-gray-400">
        ${Math.floor(Math.random() * 500)}h
      </td>

      <td class="text-center text-green-400">
        ${Math.floor(Math.random() * 5000)}
      </td>

      <td class="text-center text-red-400">
        ${Math.floor(Math.random() * 3000)}
      </td>

      <td class="text-center text-cyan-400">
        ${Math.floor(Math.random() * 365)} hari lalu
      </td>
    `;

    playerList.appendChild(row);
  }
}

/* =========================
   DONORS
========================= */
function generateDonorsData() {
  const donors = [
    'Azraell',
    'Sanderpa',
    'AetherKyle',
    'Nova'
  ];

  const donorList =
    document.getElementById('donors-list');

  if (!donorList) return;

  donorList.innerHTML = '';

  donors.forEach((name) => {
    const donor = document.createElement('div');

    donor.className =
      'donor-card p-4 rounded-3xl';

    donor.innerHTML = `
      <div class="flex items-center gap-3">
        <img
          src="https://mc-heads.net/avatar/${name}"
          class="w-12 h-12 rounded-full"
        >

        <div>
          <p class="text-yellow-300 font-semibold">
            ${name}
          </p>

          <p class="text-sm text-gray-400">
            berdonasi Rp ${
              Math.floor(Math.random() * 500 + 50)
            }K
          </p>
        </div>
      </div>
    `;

    donorList.appendChild(donor);
  });
}

/* =========================
   MODAL
========================= */
function beliRank(rank, price) {
  selectedRank = rank;
  selectedPrice = price;

  document
    .getElementById('modal')
    .classList.remove('hidden');
}

function closeModal() {
  document
    .getElementById('modal')
    .classList.add('hidden');
}

function kirimWA() {
  const username =
    document.getElementById('username').value;

  if (!username) {
    alert('Masukkan username!');
    return;
  }

  const nomor = '6281337574016';

  const pesan =
    `Halo saya ingin membeli rank ${selectedRank}
Username: ${username}`;

  window.open(
    `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );

  closeModal();
}

/* =========================
   LOGIN
========================= */
function openLoginModal() {
  document
    .getElementById('login-modal')
    .classList.remove('hidden');
}

function closeLoginModal() {
  document
    .getElementById('login-modal')
    .classList.add('hidden');
}

function handleLogin() {
  const email =
    document.getElementById('login-email').value;

  if (!email) {
    alert('Isi email!');
    return;
  }

  alert(`Selamat datang ${email}`);

  closeLoginModal();
}

/* =========================
   INIT
========================= */
window.addEventListener('DOMContentLoaded', () => {
  createStars();
  generatePlayerData();
  generateDonorsData();
  initServerStatus();
  revealOnScroll();

  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 700);

  setInterval(spawnMeteor, 7000);
});

window.addEventListener("scroll", () => {
  updateProgressBar();
  updateNavbar();
  revealOnScroll();

  const scroll = window.scrollY;

  const galaxy = document.querySelector(".galaxy");
  const aurora = document.querySelector(".aurora");

  if (galaxy) {
    galaxy.style.transform = `translateY(${scroll * 0.2}px)`;
  }

  if (aurora) {
    aurora.style.transform = `translateY(${scroll * 0.1}px)`;
  }
});

window.addEventListener('mousemove', parallaxScene);

/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.getElementById("custom-cursor");

if (cursor) {

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .card-hover").forEach((el) => {

    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });

  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
  });

}
/* COPY IP */
function copyIP() {
  navigator.clipboard.writeText("play.monld.xyz")
    .then(() => {
      const toast =
        document.getElementById("toast");

      toast.classList.remove("opacity-0");

      setTimeout(() => {
        toast.classList.add("opacity-0");
      }, 2500);
    })
    .catch(() => {
      alert("Gagal menyalin IP");
    });
}

/* MUSIC */
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

let playing = false;

if (musicBtn && bgMusic) {

  musicBtn.addEventListener("click", () => {

    if (!playing) {
      bgMusic.play();
      musicBtn.innerHTML = "⏸";
      playing = true;

    } else {
      bgMusic.pause();
      musicBtn.innerHTML = "🎵";
      playing = false;
    }

  });

}

/* PARTICLES */
if (typeof tsParticles !== "undefined") {

  tsParticles.load("particles-js", {
    background: {
      color: "transparent"
    },

    particles: {
      number: {
        value: 80
      },

      color: {
        value: ["#6366f1", "#8b5cf6", "#22d3ee"]
      },

      shape: {
        type: "circle"
      },

      opacity: {
        value: 0.5
      },

      size: {
        value: 2
      },

      move: {
        enable: true,
        speed: 1
      },

      links: {
        enable: true,
        color: "#6366f1",
        distance: 120,
        opacity: 0.2
      }
    }
  });

}

.addEventListener("scroll", () => {
  const scroll = window.scrollY;

/* PARALLAX BACKGROUND */
window.addEventListener("scroll", () => {

  const scroll = window.scrollY;

  const galaxy =
    document.querySelector(".galaxy");

  const aurora =
    document.querySelector(".aurora");

  if (galaxy) {
    galaxy.style.transform =
      `translateY(${scroll * 0.2}px)`;
  }

  if (aurora) {
    aurora.style.transform =
      `translateY(${scroll * 0.1}px)`;
  }

});