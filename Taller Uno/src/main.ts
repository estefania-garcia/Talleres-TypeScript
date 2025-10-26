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
calcularPromedio(dataSeries);