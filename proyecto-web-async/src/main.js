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

const searchPhotos = (keyword) => {
  fetch(
    `${apiUrl}?client_id=${keyApi}&page=1&per_page=20&query=${keyword}`
  )
  
  .then((res) => res.json()).then((res) => {
    const photos = res.results;
    printPhotos(photos);
  })
};

const printPhotos = (photos) => {
  const container = document.querySelector("#container");
  for (const photo of photos) {
    container.innerHTML +=
    `<div id="box">
      <img src="${photo.urls.regular}" alt="${photo.alt_description}"></img>
    </div>`
  };
};

searchPhotos("cat");