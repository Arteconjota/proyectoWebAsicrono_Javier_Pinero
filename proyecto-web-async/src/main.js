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

//   <div>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>