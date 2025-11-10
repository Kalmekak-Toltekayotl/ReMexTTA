@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: #e5e5e5;
  color: #222;
}

/* Transición Fade */
.fade-container {
  opacity: 0;
  transition: opacity 2s ease;
}
body.loaded .fade-container {
  opacity: 1;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dcdcdc;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  border-bottom: 2px solid #999;
  z-index: 1000;
}

.logo {
  height: 140px;
}

/* Menú centrado */
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-icon {
  font-size: 1.8rem;
  cursor: pointer;
  display: none;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: 0.3s;
}

nav a:hover,
nav a.active {
  color: #000;
  border-bottom: 2px solid #666;
}

/* 🔥 SECCIÓN INICIO CON FONDO Y VELO OSCURO */
#inicio {
  position: relative;
  background: url("fondo%20inicio.png") no-repeat center center/cover;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  padding: 100px 20px;
  border-bottom: 2px solid #ccc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Velo semitransparente encima del fondo */
#inicio::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35); /* oscurece ligeramente el fondo */
  z-index: 1;
}

/* Texto encima del velo */
#inicio h1,
#inicio p {
  position: relative;
  z-index: 2;
}

#inicio h1 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
}

#inicio p {
  color: #f0f0f0;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
}

/* SECCIONES */
.seccion {
  padding: 50px 20px;
  text-align: center;
}

h1, h2 {
  color: #111;
  margin-bottom: 15px;
}

/* BUSCADOR */
.buscador {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.buscador input {
  padding: 10px;
  width: 50%;
  border-radius: 5px;
  border: 1px solid #aaa;
}

.buscador button {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
}

.buscador button:hover {
  background-color: #555;
}

/* RESULTADOS */
#resultados {
  margin-top: 20px;
  display: grid;
  justify-content: center;
  gap: 10px;
}

.registro {
  background-color: #f7f7f7;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  text-align: left;
}

/* LISTA DE VALORES */
.valores {
  list-style: none;
  margin-top: 10px;
}
.valores li {
  margin-bottom: 8px;
}

/* FOOTER */
footer {
  background-color: #dcdcdc;
  text-align: center;
  padding: 15px;
  font-size: 0.9rem;
  border-top: 2px solid #999;
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .menu-icon { display: block; }

  nav {
    display: none;
    flex-direction: column;
    background-color: #e5e5e5;
    padding: 15px;
    position: absolute;
    right: 20px;
    top: 70px;
    border: 1px solid #999;
    border-radius: 8px;
  }

  nav.show {
    display: flex;
  }

  #inicio {
    min-height: 90vh;
    padding: 60px 15px;
  }

  #inicio h1 {
    font-size: 1.6rem;
  }

  #inicio p {
    font-size: 1rem;
  }
}

/* 🔒 PARCHE: Asegurar menú cerrado al cargar en móvil */
@media (max-width: 768px) {
  nav {
    display: none !important;
  }
  nav.show {
    display: flex !important;
  }
}
