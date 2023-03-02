let url = "https://amazing-events.onrender.com/api/events"
let data = ""
fetch(url).then(respuesta => respuesta.json()).then(datas=>{
    data = datas
    console.log("se ejecuto el segundo then")
    let card = document.getElementById("cardsita")
    const idResumido = new URLSearchParams(location.search).get("id")
    console.log(idResumido)
    let evento = data.events.find(item =>item._id==idResumido )
    console.log(evento)
    card.innerHTML = `<div class="justify-content-center">
    <div class="card mb-0" id="editFondoCard">
    <div class="d-flex justify-content-center">
    <img src= "${evento.image}" class="card-img-top w-50" alt="">
    </div>
    <div class="card-body">
    <h3 class="card-title text-light">${evento.name}</h3>
    <p class="card-text text-light bg-dark">${evento.description}</p>
    <p class="card-text text-light bg-dark">Price: ${evento.price}, Place: ${evento.place}, Date: ${evento.date}</p>
    </div>
    </div>
    </div>`
})

