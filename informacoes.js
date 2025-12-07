'use strict'

const API_KEY = "4f3258f4c4e938e95fa0bda2eea31021"
const STUDIO_GHIBLI_ID = 10342
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"

window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('filme_id')

    console.log(id)

    await carregarInformacoesFilme(id)
    await carregarElenco(id)
})

function avaliacaoEstrelas(nota) {
    const estrelas = Math.round(nota / 2) // divide por 2 → 0-5 estrelas
    return '★'.repeat(estrelas)
}

async function carregarInformacoesFilme(id) {
    const urlFilme = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    const responseFilme = await fetch(urlFilme)
    const dadosFilmes = await responseFilme.json()

    const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`
    const responseVideos = await fetch(urlVideos)
    const dadosVideos = await responseVideos.json()

    dadosFilmes.videos = dadosVideos.results

    mostrarInformacoesFilme(dadosFilmes)
}

async function carregarElenco(id) {
    const urlEquipe = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
    const responseEquipe = await fetch(urlEquipe)
    const dadosEquipe = await responseEquipe.json()

    mostrarElenco(dadosEquipe)
}


const container_filme = document.getElementById('informacoes')
const divTextos = document.createElement('div')

function mostrarInformacoesFilme(filme) {

    container_filme.replaceChildren()

    const img = document.createElement('img')
    img.src = `${POSTER_BASE_URL}${filme.poster_path}`

    divTextos.classList.add('textos')

    const titulo_data = document.createElement('div')
    titulo_data.classList.add('titulo_data')

    const titulo = document.createElement('h3')
    titulo.textContent = filme.title

    const data = document.createElement('h3')
    data.textContent = filme.release_date

    const avaliacao = document.createElement('div')
    avaliacao.classList.add('avaliacao')
    const h4 = document.createElement('h4')
    h4.textContent = 'Avaliação'
    const nota = filme.vote_average
    const estrelas = document.createElement('p')
    estrelas.textContent = avaliacaoEstrelas(nota)


    const divSinopse = document.createElement('div')
    divSinopse.classList.add('sinopse')
    const h2Sinopse = document.createElement('h2')
    h2Sinopse.textContent = 'Sinópse'
    const sinopse = document.createElement('p')
    sinopse.textContent = filme.overview

    divSinopse.append(h2Sinopse, sinopse)
    avaliacao.append(h4, estrelas)
    titulo_data.append(titulo, data)
    divTextos.append(titulo_data, avaliacao, divSinopse)
    container_filme.append(img, divTextos)

    console.log(filme)

    //Trailer

    const trailerDiv = document.getElementById('trailer')
    trailerDiv.replaceChildren()

    // procura trailer do YouTube
    const trailer = filme.videos.find(v => v.type === "Trailer" && v.site === "YouTube")

    if (!trailer) {
        const p = document.createElement('p')
        p.textContent = "Trailer não disponível"
        trailerDiv.append(p)

        return p
    }

    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${trailer.key}`

    trailerDiv.append(iframe)
}



function mostrarElenco(equipe) {

    const diretor = document.createElement('p')

    // Tratamento para caso tenha mais de um diretor
    const diretores = equipe.crew.filter(pessoa => pessoa.job === "Director").map(pessoa => pessoa.name)
    diretor.textContent = `Diretor: ${diretores.join(', ')}`

    const container_elenco = document.getElementById('container_elenco')

    container_elenco.replaceChildren()

    equipe.cast.slice(0, 10).forEach(pessoa => {

        console.log(pessoa)

        const div = document.createElement('a')
        div.href = `biografia.html?pessoa_id=${pessoa.id}`
        div.classList.add('pessoa')

        const fotoPessoa = document.createElement('img')
        fotoPessoa.src = `${POSTER_BASE_URL}${pessoa.profile_path}`

        const nomePessoa = document.createElement('h4')
        nomePessoa.textContent = pessoa.name

        div.append(fotoPessoa, nomePessoa)
        container_elenco.append(div)

        div.append(fotoPessoa, nomePessoa)
    })
    divTextos.append(diretor)
}
