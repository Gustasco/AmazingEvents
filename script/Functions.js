export function crearCheckbox(datos, cardsitas) {//crea los checkbox normalmente
    cardsitas.innerHTML = "";
    let cardsotas = "";
    datos.forEach((x) => {
    cardsotas += `
    <input class="form-check-input ms-3" type="checkbox" value="${x}" id="${x}">
    <label class="form-check-label" for="flexCheckDefault">
    "${x}"
    </label>
    </div>`;
    });
    cardsitas.innerHTML = cardsotas;
}

export function crearCard(datos, contenedor) {//crea las cards normalmente
  contenedor.innerHTML = "";
  if(datos.length){
  datos.forEach((x) => {
    contenedor.innerHTML += `
    <div class="col-sm-5">
        <div class="card">
            <img src="${x.image}" class="card-img-top" alt="${x.name}">
        <div class="card-body">
            <h5 class="card-title">${x.name}</h5>
            <p class="card-text">${x.description}</p>
            <a href="./Details.html?id=${x._id}" class="btn btn-primary">See More</a>
        </div>
        </div>
    </div>`;
  })}else{
    contenedor.innerHTML = `<h2 class="text-light d-flex justify-content-center">Not element found...</h2>`
  }
}

export function crearCardPasada(datos, contenedor, currentDate){//crea las cards contemplando que sean antes de la fecha
    contenedor.innerHTML = "";
    if(datos.length){
    datos.forEach((x)=>{
        if(currentDate>x.date){
    contenedor.innerHTML += `
    <div class="col-sm-5">
        <div class="card">
            <img src="${x.image}" class="card-img-top" alt="${x.name}">
        <div class="card-body">
            <h5 class="card-title">${x.name}</h5>
            <p class="card-text">${x.description}</p>
            <a href="./Details.html?id=${x._id}" class="btn btn-primary">See More</a>
        </div>
        </div>
    </div>`;
}})}else{
    contenedor.innerHTML = `<h2 class="text-light d-flex justify-content-center">Not element found...</h2>`
  }
}

export function crearCardFutura(datos, contenedor, currentDate){//crea las cards que son futuras a la fecha
    contenedor.innerHTML = "";
    if(datos.length){
    datos.forEach((x)=>{
        if(currentDate<x.date){
    contenedor.innerHTML += `
    <div class="col-sm-5">
        <div class="card">
            <img src="${x.image}" class="card-img-top" alt="${x.name}">
        <div class="card-body">
            <h5 class="card-title">${x.name}</h5>
            <p class="card-text">${x.description}</p>
            <a href="./Details.html?id=${x._id}" class="btn btn-primary">See More</a>
        </div>
        </div>
    </div>`;
  }})}else{
    contenedor.innerHTML = `<h2 class="text-light d-flex justify-content-center">Not element found...</h2>`
  }
}

export function filter(event) {//filtrador por categoria
    let filtrar = [...document.querySelectorAll("input[type ='checkbox']:checked")].map((element) => element.value);//transforma los checkbox en array para tomar el value de cada uno
    let newArrayWithFilter = filtrar.map(valor  => event.filter( object => {
    return object.category === valor
    }   )).flat() 
    return newArrayWithFilter
}

export function filterText(eventos, valueSearch){//filtrado por texto
    return eventos.filter( evento=>evento.name.toLowerCase().includes(valueSearch.toLowerCase()))
}

export function filterr(){//Filtra por ambas categorias en conjunto, lo cual hace que se realice el filtro cruzado
    let filtradosPorCategoria = filter(data.events);
    let filtradosPorBusqueda = filterText(filtradosPorCategoria, buscador.value);
    if(filtradosPorCategoria.length==0){
        filtradosPorBusqueda = filterText(data.events, buscador.value)
    }
    return filtradosPorBusqueda
}

export function eventHighestAssistance(eventos, contenedor){//Comprueba que elemento tiene el mayor porcentaje de asistencia
  let eventsAssistanceFilter = eventos.filter(x => x.hasOwnProperty("assistance") )//se seleccionan las propiedades que tengan "assistance"
  let porcentajeSinFiltro = []
  let porcentaje = []
  eventsAssistanceFilter.forEach((x) => {//se crea un nuevo array para filtrar a traves de cada evento
    porcentajeSinFiltro .push(x.assistance * 100/x.capacity).toFixed(2)//se realiza el calculo para guardar en un array cada porcentaje
    porcentajeSinFiltro.forEach((j)=>{
      if(j>porcentaje){//se realiza una condicion, para que cada vez que se verifique uno de los porcentajes, se sume en caso de ser mayor
        porcentaje = j.toFixed(2)
      }
    })
});
  contenedor.innerHTML += 
  `<td scope="column" id="FilaMayor">${porcentaje} %</td>`
}

export function minAssistance(eventos, contenedor){//Comprueba que elemento tiene el menor porcentaje de asistencia, es lo mismo que antes, solo cambian los valores.
  let eventsAssistanceFilter = eventos.filter(x => x.hasOwnProperty("assistance") )
  let porcentajeSinFiltro = []
  let porcentaje = [100]
  eventsAssistanceFilter.forEach((x) => {
    porcentajeSinFiltro .push(x.assistance * 100/x.capacity).toFixed(2)
    porcentajeSinFiltro.forEach((j)=>{
      if(porcentaje>j){
        porcentaje = j.toFixed(2)
      }
    })
});
  contenedor.innerHTML += 
  `<td scope="column" id="FilaMayor">${porcentaje} %</td>`
}

export function masCapacidad(eventos,contenedor){//Comprueba que evento tiene mayor capacidad
  const mayorCapacidad = eventos.reduce((highest, current) => {//a traves del metodo reduce, se declaran 2 variables
    return current.capacity > highest.capacity ? current : highest;})//se comprueba si el valor actual es mayor al del acumulable.
contenedor.innerHTML += `<td scope="row"> ${mayorCapacidad.name} capacity ${mayorCapacidad.capacity} </td>`
console.log(mayorCapacidad)
}

export function upcomigEventStats(eventos, contenedor, date){//imprime la segunda tabla
  contenedor.innerHTML = ""
  let listEvents = ""
  const eventosFiltrados = eventos.filter(events => events.date > date.currentDate)//se filtran los eventos que sean posteriores a la fecha indicada
  eventosFiltrados.map((element) => {//se realiza un for each para pasar por cada elemento y imprimirlo en el html
          listEvents += 
              `<tr class="flex-row"><td>${element.category} </td>
              <td class="td-number"> $ ${(element.price * element.estimate).toLocaleString()} </td>
              <td class="td-number"> ${((element.estimate * 100) / element.capacity).toFixed(2)} % </td></tr>`
  });//1ero se imprime la categoria. 2do se imprimen las ganancias en base al estimado. 3ero se imprime el porcentaje de asistencia en base al estimado
  contenedor.innerHTML = listEvents
}

export function pastEventStats(eventos, contenedor, date){//imprime la tabla 3 en el html
  contenedor.innerHTML = ""
  let listaEvento = ""
  const eventosFiltrados = eventos.filter(events => events.date < date.currentDate)//se filtran los eventos que sean anteriores a la fecha indicada
  eventosFiltrados.map((element) => {//se realiza un for each para pasar por cada elemento y imprimirlo en el html
          listaEvento += 
          `<tr>
          <td scope="row">${element.category} </td>
           <td class="td-number"> $ ${(element.price * element.assistance).toLocaleString()} </td>
           <td class="td-number"> ${((element.assistance * 100) / element.capacity).toFixed(2)} % </td>
          </tr>`
  });//lo mismo que en la linea 146
  contenedor.innerHTML = listaEvento
} 