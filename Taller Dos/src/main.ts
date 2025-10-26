import { dataSeries } from "./dataSerie.js";
import { Serie } from "./serie.js";

function renderSeries(series: Serie[]): void {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  series.forEach((serie) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input class="form-check-input" type="checkbox" /></td>
      <td><dd>${serie.id}</dd></td>
      <td><dd>${serie.name}</dd></td>
      <td><dd>${serie.channel}</dd></td>
      <td><dd>${serie.seasons}</dd></td>
    `;
    tbody.appendChild(row);
  });
}

renderCarousel(dataSeries);
inicializarCarrusel(); // ← equivalente a tu initCarousel()

function inicializarCarrusel(): void {
  const multipleItemCarousel = document.querySelector("#carouselExample");
  const inner = document.querySelector(".carousel2-inner") as HTMLElement;
  const items = document.querySelectorAll(".carousel2-item");
  const prevBtn = document.querySelector(".carousel2-control-prev");
  const nextBtn = document.querySelector(".carousel2-control-next");

  if (!multipleItemCarousel || !inner || items.length === 0 || !prevBtn || !nextBtn) {
    console.warn("Carrusel no inicializado: faltan elementos");
    return;
  }

  const cardWidth = (items[0] as HTMLElement)?.clientWidth ?? 0;
  let scrollPosition = 0;

  nextBtn.addEventListener("click", () => {
    if (scrollPosition < inner.scrollWidth - cardWidth * 4) {
      scrollPosition += cardWidth;
      inner.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      inner.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  });

  if (!window.matchMedia("(min-width:576px)").matches) {
    multipleItemCarousel.classList.add("slide");
  }
}

function renderCarousel(series: Serie[]): void {
  const carouselContainer = document.getElementById("carousel-container");
  if (!carouselContainer) return;

  series.forEach((serie, index) => {
    const item = document.createElement("div");
    item.className = "carousel-item carousel2-item" + (index === 0 ? " active" : "");

    item.innerHTML = `
      <div class="card">
        <div class="img-wrapper">
          <img src="${serie.poster}" class="card-img-top" alt="${serie.name}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${serie.name}</h5>
          <p class="card-text">${serie.description}</p>
          <button>Ver más</button>
        </div>
      </div>
    `;

    carouselContainer.appendChild(item);
  });
}

function calcularPromedio(series: Serie[]): void {
  const sumaTemporadas = series.reduce((acc, serie) => acc + serie.seasons, 0);
  const promedioTemporadas = series.length > 0 ? sumaTemporadas / series.length : 0;

  const promedio = document.createElement("h2");
  promedio.textContent = `Promedio de temporadas: ${promedioTemporadas.toFixed(0)}`;

  const infoDiv = document.querySelector(".info-div");
  if (infoDiv) {
    infoDiv.innerHTML = "";
    infoDiv.appendChild(promedio);
  }
}

renderSeries(dataSeries);
renderCarousel(dataSeries);
calcularPromedio(dataSeries);