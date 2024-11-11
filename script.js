let textarea = document.querySelector("#textarea")
let div = document.querySelector("#mensajes")
let btn = document.querySelector("#btn")
let contador = 0


// cuando el boton hace click guarda el texto introducido dentro del textarea y lo pasa a un objeto que lo guarda en el localStorage
// Si el tweet esta vacio muestra un alert de error y no guarda nada
btn.addEventListener('click', () => {

    let tweetToBe = textarea.value
    if (tweetToBe === "" || tweetToBe === undefined) {
        alert("el tweet no puede ser vacio")
        return // sale de la funcion
    }
    // trabajando con fechas
    let now = Date.now() // obtenemos la fecha cruda
    let date = new Date(now) // creamos un nuevo objeto fecha
    let nowHuman = date.toDateString() // covnertimos la fecha a String para poder leerla mejor


    contador++
    let tweetObject = { // objeto a guardar dentro del localStorage
        id: Date.now(), // usamos la fecha en segundos como id
        tweet: tweetToBe,
        date: nowHuman,
        contador: contador
    }
    localStorage.setItem(contador, JSON.stringify(tweetObject))
    textarea.value = ""
})


function displayTweet(tweetObject) {
    let div1 = document.createElement("div")
    let aSpan = document.createElement("a")
    div1.innerHTML = `<strong>${tweetObject.date}</strong> ${tweetObject.tweet}`
    aSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>`
    aSpan.classList.add('botonCancelar')
    div1.classList.add("align-items-center", "d-flex", "justify-content-between")
    aSpan.setAttribute('action', tweetObject.contador)
    div.appendChild(div1)
    div1.appendChild(aSpan)
    aSpan.addEventListener('click', (e) => {
        console.log("click");
        console.log(e.target);
        let id = e.target.getAttribute('action')
        if (id === null) {
            id = e.target.parentElement.getAttribute('action')
            if (id === null) {
                id = e.target.parentElement.parentElement.getAttribute('action')
            }
        }
        console.log(`id: ${id}`);
        localStorage.removeItem(id)
        contador--
        if (id === aSpan.getAttribute('action'))
            div1.remove()
    })
}


function getTweets(n) {
    return JSON.parse(localStorage.getItem(n))
}

const nums = new Set
setInterval(() => {
    for (let i = 1; i <= localStorage.length; i++) {
        const tweet = getTweets(i)
        if (tweet && !nums.has(tweet.id)) {
            displayTweet(tweet);
            nums.add(tweet.id);
        }
    }
}, '500')

