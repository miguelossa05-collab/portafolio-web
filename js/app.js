/* ============================================================
   PORTAFOLIO PERSONAL - app.js
   Lógica de las secciones "Historial Académico" y "Historial Laboral":
   agregar registros nuevos, validarlos y mostrarlos en pantalla
   usando el DOM, sin recargar la página.
   ============================================================ */

/* ----------------------------------------------------------
   1) REFERENCIAS A ELEMENTOS DEL DOM
   ---------------------------------------------------------- */

// Historial académico
const btnAgregarAcademico = document.getElementById('btnAgregarAcademico');
const formAcademico = document.getElementById('formAcademico');
const listaAcademico = document.getElementById('listaAcademico');
const errorAcademico = document.getElementById('errorAcademico');

const inputInstitucion = document.getElementById('inputInstitucion');
const inputTituloAcademico = document.getElementById('inputTituloAcademico');
const inputPeriodoAcademico = document.getElementById('inputPeriodoAcademico');
const btnGuardarAcademico = document.getElementById('btnGuardarAcademico');

// Historial laboral
const btnAgregarLaboral = document.getElementById('btnAgregarLaboral');
const formLaboral = document.getElementById('formLaboral');
const listaLaboral = document.getElementById('listaLaboral');
const errorLaboral = document.getElementById('errorLaboral');

const inputCargo = document.getElementById('inputCargo');
const inputEmpresa = document.getElementById('inputEmpresa');
const inputPeriodoLaboral = document.getElementById('inputPeriodoLaboral');
const inputDescripcionLaboral = document.getElementById('inputDescripcionLaboral');
const btnGuardarLaboral = document.getElementById('btnGuardarLaboral');


/* ----------------------------------------------------------
   2) DATOS: arreglos de objetos
   Cada registro se guarda como un objeto (institucion/titulo/periodo,
   o cargo/empresa/periodo/descripcion) dentro de un arreglo.
   Estos arreglos son la "fuente de la verdad": todo lo que se
   ve en pantalla se dibuja a partir de ellos.
   ---------------------------------------------------------- */

const arregloEstudios = [
  { institucion: 'Universidad Santiago de Cali', titulo: 'Ingeniería de Sistemas - 8.º semestre', periodo: 'En curso' },
  { institucion: 'SENA', titulo: 'Técnico en Auxiliar Administrativo', periodo: 'Feb. 2022 - Dic. 2022' },
  { institucion: 'I.E. Politécnico Municipal de Cali', titulo: 'Bachiller', periodo: '2022' }
];

const arregloExperiencias = [
  { cargo: 'Apoyo operativo y servicio al cliente', empresa: 'Restaurante Kairos, Jamundí', periodo: 'Abr. 2026 - Actualidad', descripcion: 'Apoyo a la operación diaria del restaurante y atención a clientes; coordinación con el equipo para el cumplimiento de tareas.' },
  { cargo: 'Auxiliar de ventas y bodega de zapatillas', empresa: 'Local 119 - Centro Comercial Mónaco, Cali', periodo: 'Sep. 2025 - Dic. 2025', descripcion: 'Atención y orientación a clientes, apoyo en ventas durante temporada de alta demanda y organización de inventario.' },
  { cargo: 'Ventas de productos de limpieza y decoración', empresa: 'KROM, Cali', periodo: 'Oct. 2024 - Dic. 2024', descripcion: 'Venta de productos de limpieza y decoración; fortalecimiento de habilidades de comunicación persuasiva y servicio al cliente.' }
];


/* ----------------------------------------------------------
   3) FUNCIONES AUXILIARES
   ---------------------------------------------------------- */

// Revisa si alguno de los textos recibidos está vacío (o solo espacios)
function hayCampoVacio(...valores) {
  return valores.some(valor => valor.trim() === '');
}

// Muestra u oculta un formulario agregando/quitando la clase "mostrar"
function alternarFormulario(form) {
  form.classList.toggle('mostrar');
}


/* ----------------------------------------------------------
   4) HISTORIAL ACADÉMICO
   ---------------------------------------------------------- */

// Crea (con createElement) la tarjeta HTML de un estudio y la agrega al contenedor
function crearTarjetaEstudio(estudio) {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'tarjeta';

  const titulo = document.createElement('h3');
  titulo.textContent = estudio.institucion;

  const subtitulo = document.createElement('p');
  subtitulo.className = 'tarjeta-subtitulo';
  subtitulo.textContent = estudio.titulo;

  const fecha = document.createElement('p');
  fecha.className = 'tarjeta-fecha';
  fecha.textContent = estudio.periodo;

  tarjeta.appendChild(titulo);
  tarjeta.appendChild(subtitulo);
  tarjeta.appendChild(fecha);

  listaAcademico.appendChild(tarjeta);
}

// Recorre arregloEstudios y dibuja todas las tarjetas en pantalla
function mostrarEstudios() {
  listaAcademico.innerHTML = ''; // limpia el contenedor antes de redibujar
  arregloEstudios.forEach(crearTarjetaEstudio);
}

// Lee el formulario, valida, crea el objeto, lo guarda y actualiza el DOM
function agregarEstudio() {
  const institucion = inputInstitucion.value;
  const titulo = inputTituloAcademico.value;
  const periodo = inputPeriodoAcademico.value;

  // a) Validar que ningún campo esté vacío
  if (hayCampoVacio(institucion, titulo, periodo)) {
    errorAcademico.textContent = 'Por favor completa todos los campos antes de guardar.';
    return; // no continúa si falta algo
  }
  errorAcademico.textContent = '';

  // c) Crear el objeto con los datos capturados
  const nuevoEstudio = {
    institucion: institucion,
    titulo: titulo,
    periodo: periodo
  };

  // d) Guardarlo en el arreglo
  arregloEstudios.push(nuevoEstudio);

  // e) Mostrarlo en pantalla sin recargar la página
  mostrarEstudios();

  // f) Limpiar el formulario y ocultarlo de nuevo
  formAcademico.reset();
  formAcademico.classList.remove('mostrar');
}


/* ----------------------------------------------------------
   5) HISTORIAL LABORAL
   ---------------------------------------------------------- */

// Crea (con createElement) la tarjeta HTML de una experiencia y la agrega al contenedor
function crearTarjetaExperiencia(experiencia) {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'tarjeta';

  const cargo = document.createElement('h3');
  cargo.textContent = experiencia.cargo;

  const empresa = document.createElement('p');
  empresa.className = 'tarjeta-subtitulo';
  empresa.textContent = experiencia.empresa;

  const periodo = document.createElement('p');
  periodo.className = 'tarjeta-fecha';
  periodo.textContent = experiencia.periodo;

  const descripcion = document.createElement('p');
  descripcion.className = 'tarjeta-descripcion';
  descripcion.textContent = experiencia.descripcion;

  tarjeta.appendChild(cargo);
  tarjeta.appendChild(empresa);
  tarjeta.appendChild(periodo);
  tarjeta.appendChild(descripcion);

  listaLaboral.appendChild(tarjeta);
}

// Recorre arregloExperiencias y dibuja todas las tarjetas en pantalla
function mostrarExperiencias() {
  listaLaboral.innerHTML = ''; // limpia el contenedor antes de redibujar
  arregloExperiencias.forEach(crearTarjetaExperiencia);
}

// Lee el formulario, valida, crea el objeto, lo guarda y actualiza el DOM
function agregarExperiencia() {
  const cargo = inputCargo.value;
  const empresa = inputEmpresa.value;
  const periodo = inputPeriodoLaboral.value;
  const descripcion = inputDescripcionLaboral.value;

  // a) Validar que ningún campo esté vacío
  if (hayCampoVacio(cargo, empresa, periodo, descripcion)) {
    errorLaboral.textContent = 'Por favor completa todos los campos antes de guardar.';
    return; // no continúa si falta algo
  }
  errorLaboral.textContent = '';

  // c) Crear el objeto con los datos capturados
  const nuevaExperiencia = {
    cargo: cargo,
    empresa: empresa,
    periodo: periodo,
    descripcion: descripcion
  };

  // d) Guardarlo en el arreglo
  arregloExperiencias.push(nuevaExperiencia);

  // e) Mostrarlo en pantalla sin recargar la página
  mostrarExperiencias();

  // f) Limpiar el formulario y ocultarlo de nuevo
  formLaboral.reset();
  formLaboral.classList.remove('mostrar');
}


/* ----------------------------------------------------------
   6) EVENTOS
   ---------------------------------------------------------- */

btnAgregarAcademico.addEventListener('click', () => alternarFormulario(formAcademico));
btnGuardarAcademico.addEventListener('click', agregarEstudio);

btnAgregarLaboral.addEventListener('click', () => alternarFormulario(formLaboral));
btnGuardarLaboral.addEventListener('click', agregarExperiencia);


/* ----------------------------------------------------------
   7) INICIALIZACIÓN
   Dibuja en pantalla los datos que ya existen en los arreglos
   apenas se carga la página.
   ---------------------------------------------------------- */

mostrarEstudios();
mostrarExperiencias();
