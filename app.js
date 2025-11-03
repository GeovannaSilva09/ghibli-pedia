'use strict'


const API_KEY = "4f3258f4c4e938e95fa0bda2eea31021"
const STUDIO_GHIBLI_ID = 10342
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"


// Referência ao elemento onde os posters serão exibidos
const caixaPoster = document.getElementById('caixaPoster');
// Lista global para armazenar os filmes, conforme o seu modelo
const listaFilmesGhibli = [];

// --- 2. FUNÇÃO DE RENDERIZAÇÃO NO DOM ---
/**
 * Renderiza a lista de filmes no contêiner 'caixaPoster'.
 * Limpa o conteúdo e recria todos os elementos.
 * @param {Array<Object>} filmes Uma lista de objetos de filmes processados.
 */
function mostrarFilmes(filmes) {
  // A classe correta no seu CSS é '.caixa-p', vamos garantir que o id 'caixaPoster' a tenha.
  caixaPoster.className = 'caixa-p';
  caixaPoster.replaceChildren(); // Limpa o conteúdo atual

  filmes.forEach(filme => {
    // Cria a div externa (que tem o estilo .foto)
    const divFoto = document.createElement('div');
    divFoto.classList.add('foto');

    // Adiciona um título visível para o filme
    const pTitulo = document.createElement('p');
    pTitulo.textContent = filme.titulo;

    // Verifica se há URL de poster para evitar erros
    if (filme.poster_url) {
      // Cria a tag da imagem
      const imgPoster = document.createElement('img');
      imgPoster.src = filme.poster_url;
      imgPoster.alt = `Poster do filme ${filme.titulo}`;

      // Adiciona a imagem e o título à div principal do poster
      divFoto.appendChild(imgPoster);
    } else {
      // Caso não tenha imagem, podemos colocar um texto simples
      divFoto.textContent = filme.titulo;
      divFoto.style.textAlign = 'center';
    }

    // Você pode ter que adaptar o CSS para exibir o título abaixo do poster.
    // No seu CSS, '.foto img' tem 100x100px. Se a imagem do poster não for 
    // 100x100, ela pode parecer estranha. O ideal é que a tag img não tenha
    // dimensões fixas no CSS para exibir o poster completo.

    caixaPoster.appendChild(divFoto);
  });
}


// --- 3. FUNÇÃO DE BUSCA NA API (ADAPTADA DO MODELO ANTERIOR) ---
/**
 * Busca todos os filmes do Studio Ghibli na API do TMDb, página por página.
 */
async function carregarFilmesGhibli() {
  let paginaAtual = 1;
  let totalPaginas = 1;

  // Mostra um estado inicial de carregamento
  caixaPoster.innerHTML = '<p>Carregando filmes do Studio Ghibli...</p>';

  // Limpa o array global
  listaFilmesGhibli.length = 0;

  while (paginaAtual <= totalPaginas) {
    const url = `https://api.themoviedb.org/3/discover/movie`;

    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      with_companies: STUDIO_GHIBLI_ID,
      language: 'pt-BR',
      sort_by: 'release_date.asc',
      page: paginaAtual
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const dados = await response.json();

      if (paginaAtual === 1) {
        totalPaginas = dados.total_pages;
        // Exibe uma mensagem de status
        caixaPoster.innerHTML = `<p>Total de páginas: ${totalPaginas}. Carregando...</p>`;
      }

      const loteFilmes = dados.results;

      const dadosFinais = loteFilmes
        .filter(info => info.poster_path) // Filtra filmes sem poster
        .map(info => {
          const caminhoPoster = POSTER_BASE_URL + info.poster_path;
          return {
            id: info.id,
            titulo: info.title,
            poster_url: caminhoPoster,
          };
        });

      listaFilmesGhibli.push(...dadosFinais);

      // Renderiza os filmes a cada página carregada para uma experiência mais fluida
      mostrarFilmes(listaFilmesGhibli);

      paginaAtual++;

    } catch (error) {
      console.error("Falha ao carregar dados do TMDb:", error);
      caixaPoster.innerHTML = `<p>Erro ao carregar filmes. Verifique sua chave de API ou conexão.</p>`;
      break;
    }
  }

  // Atualiza a exibição final
  mostrarFilmes(listaFilmesGhibli);
}

// --- 4. INICIA A BUSCA QUANDO O DOM ESTIVER PRONTO ---
// Adiciona um listener para garantir que o 'caixaPoster' exista antes de chamar a função.
document.addEventListener('DOMContentLoaded', () => {
  // Garante que a div de filmes está pronta
  if (caixaPoster) {
    carregarFilmesGhibli();
  }
});




/*

// const apiKey = process.env.API_KEY
const caixaPoster = document.getElementById('list.caixaPoster')
const caixaFotos = document.getElementById('list.caixaFotos')

let listaPoster = []


async function carregarPoster(limite = 6) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=4f3258f4c4e938e95fa0bda2eea31021&with_companies=10342&language=pt-BR&sort_by=release_date.asc`
}

async function mostrarPoster() {


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

*/


/*   Retorna imagens do filme pelo id
 *  https://api.themoviedb.org/3/movie/{movie_id}/images 
 * 
 * 
 *  Retorna videos do filme pelo id
 *  https://api.themoviedb.org/3/movie/{movie_id}/images 
 * 
 * 
 *  Retorna detalhes do filme pelo id
 *  https://api.themoviedb.org/3/movie/{movie_id}
 * 
 * 
 *  Retorna os créditos do filme pelo id
 *  https://api.themoviedb.org/3/movie/{movie_id}/credits
 * 
 * 
 *  Retorna a data de lançamento do filme pelo id
 *  https://api.themoviedb.org/3/movie/{movie_id}/release_dates
 * 
 * 
 *  Retorna o detalhes das pessoas por id
 *  https://api.themoviedb.org/3/person/{person_id}
 * 
 * 
 *  Pesquisa por filme  
 *  https://api.themoviedb.org/3/search/movie
 * 
 *  Pesquisa por pessoa
 *  https://api.themoviedb.org/3/search/person
 * 
 *  Pesquisa por multimídias
 *  https://api.themoviedb.org/3/search/multi
 */



/*    EXEMPLO DE URL (com API KEY ficticia)
     https://api.themoviedb.org/3/movie/550?api_key=12345678910  */



/* Requisição de detalhes do filme escolhido

const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));

*/


/*********** RESPONSE ****************
 *      Detalhes do filme
 * 
 * 
 * {
  "adult": false,
  "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 35,
      "name": "Comedy"
    }
  ],
  "homepage": "http://www.foxmovies.com/movies/fight-club",
  "id": 550,
  "imdb_id": "tt0137523",
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
  "popularity": 61.416,
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "production_companies": [
    {
      "id": 508,
      "logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
      "name": "Regency Enterprises",
      "origin_country": "US"
    },
    {
      "id": 711,
      "logo_path": "/tEiIH5QesdheJmDAqQwvtN60727.png",
      "name": "Fox 2000 Pictures",
      "origin_country": "US"
    },
    {
      "id": 20555,
      "logo_path": "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
      "name": "Taurus Film",
      "origin_country": "DE"
    },
    {
      "id": 54051,
      "logo_path": null,
      "name": "Atman Entertainment",
      "origin_country": ""
    },
    {
      "id": 54052,
      "logo_path": null,
      "name": "Knickerbocker Films",
      "origin_country": "US"
    },
    {
      "id": 4700,
      "logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
      "name": "The Linson Company",
      "origin_country": "US"
    },
    {
      "id": 25,
      "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
      "name": "20th Century Fox",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1999-10-15",
  "revenue": 100853753,
  "runtime": 139,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Mischief. Mayhem. Soap.",
  "title": "Fight Club",
  "video": false,
  "vote_average": 8.433,
  "vote_count": 26280
}
 * 
 * 
 * 
 * 
 * 
 * 
 */