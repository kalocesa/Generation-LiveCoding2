/* Se cambia tipo de variable y se arregla el selector por clase */
const formulario = document.querySelector(".formulario");

formulario.onsubmit = function (e) {
  /* Se le agrega el método correcto de preventDefault() */
  e.preventDefault();

  /* Se cambia el tipo de las variables, al igual que su ruta al input o al valor */
  const nombreInput = formulario.elements["nombre"];
  const edadInput = formulario.elements["edad"];
  const nacionalidadInput = formulario.elements["nacionalidad"];

  const nombreValor = nombreInput.value;
  const edadValor = edadInput.value;
  const n = nacionalidadInput.selectedIndex;
  const nacionalidadOpcion = nacionalidadInput.options[n].value;

  console.log(nombreValor, edadValor);
  /* Se agrega el imprimir en consola la opción elegida en nacionalidad */
  console.log(nacionalidadOpcion);

  /* El elemento nextElementSibling nos ayuda a acceder al elemento hermano siguiente en el DOM y poder mostrar mensajes */
  const nombreError = nombreInput.nextElementSibling;
  const edadError = edadInput.nextElementSibling;
  /* Se generan arrow functions para cada tipo de input, señalar la clase error o quitarla */
  /* Se pasan los retornos como un boolean valor para confirmar que esté presente o no la clase */
  const nombreValido = () => {
    if (nombreValor.length === 0) {
      nombreInput.classList.add("error");
      nombreError.textContent = "Por favor ingresa tu nombre";
      return false;
    } else {
      nombreInput.classList.remove("error");
      nombreError.textContent = "";
      return true;
    }
  };

  const edadValida = () => {
    if (edadValor < 18 || edadValor > 120) {
      edadInput.classList.add("error");
      edadError.textContent = "Por favor ingresa tu edad";
      return false;
    } else {
      edadInput.classList.remove("error");
      edadError.textContent = "";
      return true;
    }
  };

  /* Para poder agregar un invitado es necesario una función que valide solo si esos inputs son true */
  const inputsValidos = () => {
    if (nombreValido() && edadValida()) {
      agregarInvitado(nombreValor, edadValor, nacionalidadOpcion);
    }
  };

  inputsValidos();
};

/* Pase arriba la función para mayor legibilidad mía */
function agregarInvitado(nombre, edad, nacionalidad) {
  if (nacionalidad === "ar") {
    nacionalidad = "Argentina";
  } else if (nacionalidad === "mx") {
    nacionalidad = "Mexicana";
  } else if (nacionalidad === "vnzl") {
    nacionalidad = "Venezolana";
  } else if (nacionalidad === "per") {
    nacionalidad = "Peruana";
  }

  /* Se cambia el tipo de las variables */
  const lista = document.getElementById("lista-de-invitados");

  const elementoLista = document.createElement("div");
  /* sería add y no added */
  elementoLista.classList.add("elemento-lista");
  lista.appendChild(elementoLista);

  const spanNombre = document.createElement("span");
  const inputNombre = document.createElement("input");
  const espacio = document.createElement("br");
  spanNombre.textContent = "Nombre: ";
  inputNombre.value = nombre;
  elementoLista.appendChild(spanNombre);
  elementoLista.appendChild(inputNombre);
  elementoLista.appendChild(espacio);

  function crearElemento(descripcion, valor) {
    const spanNombre = document.createElement("span");
    const inputNombre = document.createElement("input");
    const espacio = document.createElement("br");
    spanNombre.textContent = descripcion + ": ";
    inputNombre.value = valor;
    elementoLista.appendChild(spanNombre);
    elementoLista.appendChild(inputNombre);
    elementoLista.appendChild(espacio);
  }

  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidad);

  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.id = "boton-borrar";
  const corteLinea = document.createElement("br");
  elementoLista.appendChild(corteLinea);
  elementoLista.appendChild(botonBorrar);

  botonBorrar.onclick = function () {
    // this.parentNode.style.display = 'none';
    botonBorrar.parentNode.remove();
  };
}
