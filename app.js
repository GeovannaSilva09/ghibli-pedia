'use strict'

async function carregarPoster(params) {

}

async function mostrarPoster() {
    const container = document.getElementById("caixa")
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