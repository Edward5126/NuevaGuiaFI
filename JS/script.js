// VARIABLES PARA EL EFECTO CARRUSEL:

var current = 1;
var imagenes = new Array();
var numImages = 6;

//  CÓDIGO PARA GESTOS TÁCTILES DEL CARRUSEL

var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;

var zoneTouched = document.querySelector("main");

zoneTouched.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
});

zoneTouched.addEventListener("touchend", function (event) {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;

  Swipping();
});

function Swipping() {
  // alert(touchEndX-touchStartX);

  if (
    touchEndX > touchStartX &&
    touchEndX !== touchStartX &&
    Math.abs(touchEndX - touchStartX) > 40
  ) {
    // alert("Swipe a la izquierda");
    if (current > 1) {
      current = current - 1;
    }
    // else {
    //     current = numImages - 1;
    // }

    $(".carrusel").animate(
      { left: -$("#pagina_" + current).position().left },
      350
    );

    DetectPag();

    return false;
  } else if (
    touchEndX < touchStartX &&
    touchEndX !== touchStartX &&
    Math.abs(touchEndX - touchStartX) > 40
  ) {
    // alert("Swipe a la derecha");
    if (numImages > current + 1) {
      current = current + 1;
    }
    // else {
    //     current = 1;
    // }

    $(".carrusel").animate(
      { left: -$("#pagina_" + current).position().left },
      350
    );

    DetectPag();

    return false;
  }
}

// CÓDIGO PARA LOS BOTONES DEL CARRUSEL / CAMBIAR DE PÁGINA

function CambiarPag(ev, id) {
  ev.preventDefault();

  switch (id) {
    case 1:
      $(".carrusel").animate({ left: -$("#pagina_" + 1).position().left }, 350);
      current = 1;
      break;

    case 2:
      $(".carrusel").animate({ left: -$("#pagina_" + 2).position().left }, 350);
      current = 2;
      break;

    case 3:
      $(".carrusel").animate({ left: -$("#pagina_" + 3).position().left }, 350);
      current = 3;
      break;

    case 4:
      $(".carrusel").animate({ left: -$("#pagina_" + 4).position().left }, 350);
      current = 4;
      break;

    case 5:
      $(".carrusel").animate({ left: -$("#pagina_" + 5).position().left }, 350);
      current = 5;
      break;

    default:
      break;
  }

  DetectPag();
}

// PARA CAMBIAR DE COLOR LOS BOTONES

var Botones = document.querySelectorAll(".BtnCambPag");

function DetectPag() {
  Botones.forEach((element) => {
    element.style.color = "rgb(163, 163, 163)";
  });
  switch (current) {
    case 1:
      Botones[0].style.color = "var(--Institucional2)";
      break;

    case 2:
      Botones[1].style.color = "var(--Institucional2)";
      break;

    case 3:
      Botones[2].style.color = "var(--Institucional2)";
      break;

    case 4:
      Botones[3].style.color = "var(--Institucional2)";
      break;

    case 5:
      Botones[4].style.color = "var(--Institucional2)";
      break;

    default:
      break;
  }
}

//Para cargar el directorio de personas

var ListaPersonas = [];
var ListaElemPersonas = [];
var array;

AlcanzarPersonas();

function IdentificarSelec(e) {
  e.preventDefault();

  switch (current) {
    case 3:
        array = ListaPersonas;
        break;
  
    case 4:
        array = ListaTramites;
        break;
  
    default:
        break;
  }

  IDSelect = array.filter(function (objeto) {
    return objeto.id === parseInt(e.currentTarget.id.slice(5));
  });

  alert("Seleccionado: " + IDSelect[0].nombre);
}

function CargarPersonas() {
  document.getElementById("ContenedorDirec").innerHTML = "";

  ListaPersonas.forEach((element) => {
    document.getElementById(
      "ContenedorDirec"
    ).innerHTML += `<button class="ElemLista" id="Elem_${element.id}" onclick="IdentificarSelec(event)">
       <div>
           <img src="${element.img}" alt="" srcset="">
           <span>${element.nombre}</span>
       </div>
   </button>`;
  });

  // ListaElemPersonas = document.querySelectorAll(".ElemLista");

  // ListaElemPersonas.forEach(element => {
  //     element.addEventListener('click', e => {
  //         alert("Elemento clickeado: " + element.id);
  //     });
  // });
}

function AlcanzarPersonas() {
  fetch("API/Directorio.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (ListaRecibida) {
      ListaPersonas = ListaRecibida;

      ListaPersonas.sort(function (a, b) {
        var nombreA = a.nombre.toLowerCase();
        var nombreB = b.nombre.toLowerCase();
        if (nombreA < nombreB) {
          return -1;
        }
        if (nombreA > nombreB) {
          return 1;
        }
        return 0;
      });
      CargarPersonas();
      console.log("Lista de personas alcanzada.");
    })
    .catch(function (error) {
      alert("(Extracción Fallida)");
      console.error("Fetch fallido");
    });
}

function MostrarBusqueda(e) {
  e.preventDefault();

  document.getElementById("Busqueda").classList.toggle("Oculto");
}

function Filtrar() {
  ListaFiltrada = ListaPersonas.filter(function (objeto) {
    return objeto.nombre
      .toLowerCase()
      .includes(document.getElementById("InputFiltro").value.toLowerCase());
  });

  document.getElementById("ContenedorDirec").innerHTML = "";

  ListaFiltrada.forEach((element) => {
    document.getElementById(
      "ContenedorDirec"
    ).innerHTML += `<button class="ElemLista" id="Elem_${element.id}" onclick="IdentificarSelec(event)">
            <div>
            <img src="${element.img}" alt="" srcset="">
            <span>${element.nombre}</span>
            </div>
            </button>`;
  });
}

// PARA LA SECCIÓN DE DOCUMENTOS

var ListaTramites = [];

AlcanzarTramites();

function AlcanzarTramites() {
  fetch("API/Documentacion.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (ListaRecibida2) {
      ListaTramites = ListaRecibida2;

      ListaTramites.sort(function (a, b) {
        var nombreA = a.nombre.toLowerCase();
        var nombreB = b.nombre.toLowerCase();
        if (nombreA < nombreB) {
          return -1;
        }
        if (nombreA > nombreB) {
          return 1;
        }
        return 0;
      });
      CargarTramites();
      console.log("Lista de trámites alcanzada.");
    })
    .catch(function (error) {
      alert("(Extracción Fallida: Trámites)");
      console.error("Fetch fallido: Trámites");
    });
}

function CargarTramites() {
  document.getElementById("ContenedorTramites").innerHTML = "";

  ListaTramites.forEach((element) => {
    document.getElementById(
      "ContenedorTramites"
    ).innerHTML += `<button class="ElemLista" id="Elem_${element.id}" onclick="IdentificarSelec(event)">
       <div>
           <span>${element.nombre}</span>
       </div>
   </button>`;
  });
}
