import {crearCheckbox, crearCardPasada, filter, filterText} from "./Functions.js";
let url = "https://amazing-events.onrender.com/api/events"
let data = ""
fetch(url).then(respuesta => respuesta.json()).then(datas=>{
    data = datas
    console.log("se ejecuto el segundo then")
    let categories = data.events.map((x)=> x.category);//toma todas las categorias del data
    const categoriesNoRepeat = new Set(categories);//toma las categorias sin repetirlas
    let categoryxd = Array.from(categoriesNoRepeat);//crea un array con las categorias desde el set
    crearCardPasada(data.events, card, data.currentDate)//se crea en el html las cards
    crearCheckbox(categoryxd, createCheckBox)//se crea en el html los checkboxes
})
let createCheckBox = document.getElementById("checkboxing")//toma un formulario desde un ID para añadir un checkbox
let buscador = document.getElementById("search")//se llama al al imput texto para volverlo un buscador
let card = document.getElementById("cardsita")//se llama al Id del div de card para añadirla



createCheckBox.addEventListener('change', ()=>{//elimina o muestra las cards relacionadas al checkbox
    let fill = filterr()
    crearCardPasada(fill, card, data.currentDate)
})

buscador.addEventListener('input', ()=>{//elimina o muestra las cards relacionadas al texto que se escriba en el imput texto
    let fill = filterr()
    crearCardPasada(fill, card, data.currentDate)
})

function filterr(){
    let filtradosPorCategoria = filter(data.events);
    let filtradosPorBusqueda = filterText(filtradosPorCategoria, buscador.value);
    if(filtradosPorCategoria.length==0){
        filtradosPorBusqueda = filterText(data.events, buscador.value)
    }
    return filtradosPorBusqueda
}