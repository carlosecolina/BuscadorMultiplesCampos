//variables 
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados 
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max -10 ; 

//Generar un objeto con la busqueda 
const datosBusqueda = {
    marca : '', 
    year : '', 
    minimo : '', 
    maximo : '', 
    puertas : '', 
    transmision : '', 
    color : '', 
}



//Eventos 
document.addEventListener('DOMContentLoaded', () =>{    
    mostrarAutos(autos);

    //llena las funciones de años 
    llenarSelect();
});

//event listener para los formularios de busqueda 
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value ;
    

    filtrarAutos();
});
year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value ;
    filtrarAutos();
});
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value ;
    filtrarAutos();
});
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value ;
    filtrarAutos();
});
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value ;
    filtrarAutos();
});
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value ;
    filtrarAutos();
});
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value ;
    filtrarAutos();
});

function mostrarAutos(autos) {
    limpiarHTML(); // elmimina el html previo 

    autos.forEach(auto => {
        const {marca , modelo, year, puertas, transmision, precio, color  } = auto;  //ejemplo de como usar destructuring  
        
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} ${puertas} Puertas -Transmision ${transmision} - Precio  $${precio} - Color ${color}
        `;

        //insertar en el html 
        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let i = max ; i >= min ; i-- ){
        const opcion =  document.createElement('option');
        opcion.value = i;
        opcion.textContent = i ; 
        year.appendChild(opcion);
    }
}

function filtrarAutos() {
    //param filtrar dpodemos usar un arraymetod , en donde filter es el mas dinamico de todos ;
    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
      // vamos a crear una funcion de alto nivel, la cual consiste en ejecutar una funcion llamando a otra funcion 

    

    
    if (resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado(); 
    }
    
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado disponible intenta con otros criterios de busqueda';

    resultado.appendChild(noResultado); 
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if (marca){
        return auto.marca === marca;
    }
    return auto ;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    
    if (year){
        return auto.year === parseInt(year);
    }
    return auto ;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    
    if (minimo){
        return auto.precio >= parseInt(minimo);
    }
    return auto ;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    
    if (maximo){
        return auto.precio <= parseInt(maximo);
    }
    return auto ;
}
function filtrarPuertas(auto){  
    const {puertas} = datosBusqueda;
    
    if (puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto ;
}    

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if (transmision){
        return auto.transmision === transmision;
    }
    return auto ;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if (color){
        return auto.color === color;
    }
    return auto ;
}