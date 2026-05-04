document.addEventListener("DOMContentLoaded", () => {
  const fechaBoda = new Date("May 16, 2026 10:30:00").getTime();

  const countdownEl = document.getElementById("countdown");
  function actualizarContador() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    if (distancia <= 0) {
      countdownEl.innerHTML = `
                <div class="contador-item"><span>0</span><small>Días</small></div>
                <div class="contador-item"><span>0</span><small>Horas</small></div>
                <div class="contador-item"><span>0</span><small>Minutos</small></div>
                <div class="contador-item"><span>0</span><small>Segundos</small></div>
            `;
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
            <div class="contador-item"><span>${dias}</span><small>Días</small></div>
            <div class="contador-item"><span>${horas}</span><small>Horas</small></div>
            <div class="contador-item"><span>${minutos}</span><small>Minutos</small></div>
            <div class="contador-item"><span>${segundos}</span><small>Segundos</small></div>
        `;
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);

  const audio = document.getElementById("musicaFondo");
  const playerBtn = document.getElementById("playerBtn");
  const overlay = document.getElementById("overlayEntrada");
  const btnEntrar = document.getElementById("btnEntrar");
  const body = document.body;

  function setPlayerState(sonando) {
    playerBtn.querySelector("i").className = sonando
      ? "ph-bold ph-pause"
      : "ph-bold ph-play";
    playerBtn.setAttribute("aria-pressed", sonando ? "true" : "false");
  }

  function handleEntry() {
    body.classList.remove("no-scroll");
    overlay.classList.add("oculto");
    setTimeout(() => (overlay.style.display = "none"), 550);

    audio
      .play()
      .then(() => {
        setPlayerState(true);
      })
      .catch((e) => {
        console.log("No se pudo reproducir el audio: " + e);
        setPlayerState(false);
      });
  }

  body.classList.add("no-scroll");
  btnEntrar.addEventListener("click", handleEntry);

  playerBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => setPlayerState(true));
    } else {
      audio.pause();
      setPlayerState(false);
    }
  });

  // Intersection Observer for scroll animations
  const revealElements = document.querySelectorAll(".reveal");
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // Slider Logic
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }
});
