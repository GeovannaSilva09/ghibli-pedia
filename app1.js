'use strict'


const API_KEY = "4f3258f4c4e938e95fa0bda2eea31021"
const STUDIO_GHIBLI_ID = 10342
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"

async function carregarFilmesGhibli() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=${STUDIO_GHIBLI_ID}&language=pt-BR`
    const response = await fetch(url)
    const dados = await response.json()
    console.log(dados)
    mostrarFilmes(dados.results)
}

function mostrarFilmes(listaFilmes) {
    const container = document.getElementById('container_filme')

    container.replaceChildren()

    listaFilmes.forEach(filme =>{
        const a = document.createElement('a')
        a.classList.add('filme')
        a.href = `informacoes.html?filme_id=${filme.id}`

        const poster = document.createElement('img')
        poster.src = `${POSTER_BASE_URL}${filme.poster_path}`

        const titulo = document.createElement('p')
        titulo.textContent = filme.title

        container.append(a)
        a.append(poster, titulo)
        
    })
}

carregarFilmesGhibli()