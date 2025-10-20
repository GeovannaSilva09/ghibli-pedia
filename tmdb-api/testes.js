'use strict'

const TMDB_BASE = "https://api.themoviedb.org/3"


async function tmdbFetch(path) {
  const url = `${TMDB_BASE}${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}&language=pt-BR`
  const response = await fetch(url)
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`TMDb erro ${response.status}: ${text}`)
  }
  return response.json();
}


app.get("/api/movie/:id", async (request, response) => {
  try {
    const id = request.params.id

    const data = await tmdbFetch(`/movie/${id}?append_to_response=videos,credits`)
  
    const result = {
      id: data.id,
      title: data.title,
      original_title: data.original_title,
      overview: data.overview,
      poster_path: data.poster_path,
      release_date: data.release_date,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      videos: data.videos || { results: [] },
      credits: data.credits || { cast: [], crew: [] }
    }
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
});


// Endpoint público para buscar por query 

app.get("/api/search", async (request, response) => {
  try {
    const q = req.query.q
    if (!q) return res.status(400).json({ error: "query 'q' required" })
    const data = await tmdbFetch(`/search/movie?query=${encodeURIComponent(q)}`)

    const results = (data.results || []).map(r => ({
      id: r.id,
      title: r.title,
      release_date: r.release_date,
      poster_path: r.poster_path
    }));
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message })
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor aguardando requisição na porta ${PORT}`))