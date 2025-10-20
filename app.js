'use strict'

async function mostrarPoster (){
    const container = document.getElementById("caixa")
    const filme = document.getElementById('input').value.toUpperCase()

    const urls = await buscarPoster()

    container.replaceChildren() //Limpar antes de inserir

    urls.forEach(url => { 
        const a = document.createElement("a")
       
        const img = document.createElement("img")
        img.classList.add('poster')

        img.src = url
        a.href = img.src
        a.appendChild(img)
        container.appendChild(a)
        
    });
}




// npm install express axios dotenv cors


