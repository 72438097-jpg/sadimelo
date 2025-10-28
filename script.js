// Mostrar secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Crear lista de actividades
const actividades = 16;
function generarPortafolio() {
  const lista = document.getElementById("lista-actividades");
  lista.innerHTML = "";
  for (let i = 1; i <= actividades; i++) {
    const archivo = JSON.parse(localStorage.getItem("actividad-" + i));
    const div = document.createElement("div");
    div.classList.add("actividad");
    div.innerHTML = `
      <h3>Actividad ${i}</h3>
      <p>${archivo ? `✅ Archivo: ${archivo.name}` : "❌ Ningún archivo subido"}</p>
      ${archivo ? `
        <a href="${archivo.url}" target="_blank">Ver</a> | 
        <a href="${archivo.url}" download="${archivo.name}">Descargar</a>
      ` : ""}
    `;
    lista.appendChild(div);
  }
}

// Login
function login(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("login-msg");

  if (user === "admin" && pass === "password123") {
    msg.style.color = "green";
    msg.textContent = "Bienvenido ✅";
    mostrarSeccion("admin-panel");
    cargarGestionar();
  } else {
    msg.style.color = "red";
    msg.textContent = "Usuario o contraseña incorrectos ❌";
  }
}

// Panel administrador
function cargarGestionar() {
  const cont = document.getElementById("gestionar-contenido");
  cont.innerHTML = "";
  for (let i = 1; i <= actividades; i++) {
    const archivo = JSON.parse(localStorage.getItem("actividad-" + i));
    const div = document.createElement("div");
    div.classList.add("actividad-admin");
    div.innerHTML = `
      <h3>Actividad ${i}</h3>
      <input type="file" id="file-${i}" onchange="subirArchivo(${i})">
      <button onclick="eliminarArchivo(${i})">Eliminar</button>
      <p id="estado-${i}">${archivo ? "✅ Subido: " + archivo.name : "❌ Vacío"}</p>
    `;
    cont.appendChild(div);
  }
}

// Subir archivo
function subirArchivo(num) {
  const input = document.getElementById("file-" + num);
  if (input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const archivo = { name: file.name, url: e.target.result };
      localStorage.setItem("actividad-" + num, JSON.stringify(archivo));
      document.getElementById("estado-" + num).textContent = "✅ Subido: " + file.name;
      generarPortafolio();
    };
    reader.readAsDataURL(file);
  }
}

// Eliminar archivo
function eliminarArchivo(num) {
  localStorage.removeItem("actividad-" + num);
  document.getElementById("estado-" + num).textContent = "❌ Vacío";
  generarPortafolio();
}

// Cerrar sesión
function cerrarSesion() {
  mostrarSeccion("admin");
}

// Inicializar
document.addEventListener("DOMContentLoaded", generarPortafolio);
