import './style.css'

document.querySelector('#app').innerHTML = `
  <div id="buscPerfilOpt">
    <input type="text" id="buscador" placeholder=" 🔍︎ Buscar" onkeyup="buscar()">
    <div class="imgContainer">
      <img src="userImg.png" class="userImg" title="Tu perfil">
    </div>
    <div class="menu">
        <button class="menu-button" title="Cuentas">
          <img src="menu.png">
        </button>
        <div class="menu-content">
          <div class="menuUser">
            <img src="userImg.png">
            <h4>Usuario</h4>
          </div>
          <div class="enlacesMenu">
            <p>Tus cuentas</p>
            <a href="#">Añadir cuenta de Pinterest</a>
            <a href="#">Cerrar sesión</a>
          </div>
        </div>
    </div>
  </div>
`

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu-content");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("show");
});

const apiUrl = "https://api.unsplash.com/search/photos";
const keyApi = "wnJXpQ-TJgCefPwUNdsl5-HRTPEsgR4GJkhBh1f8woM";

let currentPage = 1;
let currentKeyword = "random";
let isLoading = false;

const searchPhotos = (keyword, page = 1) => {
  return fetch(`${apiUrl}?client_id=${keyApi}&page=${page}&per_page=25&query=${keyword}`)
    .then((res) => res.json())
    .then((res) => res.results);
};

const printPhotos = (photos) => {
  const container = document.querySelector("#container");
  if (photos.length === 0 && currentPage === 1) {
    message.style.display = "block";
    message.innerHTML = "No se han encontrado resultados, pruebe con otra búsqueda.";
  } else {
    message.style.display = "none";
  }

  for (const photo of photos) {
    container.innerHTML += `
      <div id="box">
        <img src="${photo.urls.regular}" alt="${photo.alt_description}" />
      </div>`;
  }
};

// Búsqueda inicial
searchPhotos(currentKeyword, currentPage).then(printPhotos);

const message = document.querySelector("#message");
const input = document.querySelector("#buscador");
const container = document.querySelector("#container");

input.addEventListener("keydown", async (event) => {
  if (event.key === 'Enter') {
    const value = input.value.trim();
    if (value !== "") {
      currentKeyword = value;
      currentPage = 1;
      container.innerHTML = "";
      const photos = await searchPhotos(currentKeyword, currentPage);
      printPhotos(photos);
    }
  }
});

// Scroll infinito
window.addEventListener("scroll", async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
    isLoading = true;
    currentPage++;
    const newPhotos = await searchPhotos(currentKeyword, currentPage);
    printPhotos(newPhotos);
    isLoading = false;
  }
});
