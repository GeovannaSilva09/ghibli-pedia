
const API_KEY = "4f3258f4c4e938e95fa0bda2eea31021"
const STUDIO_GHIBLI_ID = 10342
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"

window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('pessoa_id')

    await carregarInformacoesPessoa(id)
})

async function carregarInformacoesPessoa(id) {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=pt-B`
    const response = await fetch(url)
    const dados = await response.json()

    mostrarInformacoes(dados)
}

function mostrarInformacoes(pessoa) {
    const container = document.getElementById('infos')

    container.replaceChildren()

    const foto = document.createElement('img')
    foto.src = `${POSTER_BASE_URL}${pessoa.profile_path}`

    const divTexto = document.createElement('div')
    divTexto.classList.add('textos')

    const nome = document.createElement('h2')

    if (pessoa.also_known_as > 0) {
        nome.textContent = pessoa.also_known_as[0]
    } else {
        nome.textContent = pessoa.name
    }


    const divBio = document.createElement('div')
    divBio.classList.add('biografia')

    const h2 = document.createElement('h2')
    h2.textContent = "Biografia"

    const p = document.createElement('p')

    if (pessoa.biography == "") {
        p.textContent = "Biografia Indisponível"
    } else {
        p.textContent = pessoa.biography
    }

    const divInfosPessoais = document.createElement('div')
    divInfosPessoais.classList.add('infos_gerais')

    const h2Infos = document.createElement('h2')
    h2Infos.textContent = 'Informações Pessoais'

    const genero = document.createElement('p')

    if (pessoa.gender == 1) {
        genero.textContent = 'Gênero: Mulher'
    } else if (pessoa.gender == 2) {
        genero.textContent = 'Gênero: Homem'
    }

    const nascimento = document.createElement('p')
    nascimento.textContent = `Nascimento: ${pessoa.birthday}`

    const local = document.createElement('p')
    local.textContent = `Local: ${pessoa.place_of_birth}`

    divInfosPessoais.append(h2Infos, genero, nascimento, local)
    divBio.append(h2, p)
    divTexto.append(nome, divBio, divInfosPessoais)
    container.append(foto, divTexto)

}