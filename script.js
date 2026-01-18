const API = {
  KEY: "46351da790226c653537b9628dc20463",
  BASE_URL: "https://api.openweathermap.org/data/2.5/"
};

const cardsEl = document.querySelector(".cards");
const searchEl = document.querySelector(".search");

let debounceTimer;

async function fetchWeather(city) {
  try {
    showLoading();

    const { data } = await axios.get(
      `${API.BASE_URL}weather?q=${city}&units=metric&appid=${API.KEY}`
    );

    renderWeather(data);
  } catch (error) {
    renderError("City not found");
  }
}

function renderWeather(data) {
  cardsEl.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-body">
      <h2>${data.name}, ${data.sys.country}</h2>
      <span>${data.main.temp} °C</span>
      <small>Wind: ${data.wind.speed} m/s</small>
    </div>
  `;

  cardsEl.appendChild(card);
}

function renderError(message) {
  cardsEl.innerHTML = `<p class="error">${message}</p>`;
}

function showLoading() {
  cardsEl.innerHTML = `<p class="loading">Loading...</p>`;
}

searchEl.addEventListener("change", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const value = e.target.value.trim();
    if (value) fetchWeather(value);
  }, 500);
});

fetchWeather("Tashkent");
