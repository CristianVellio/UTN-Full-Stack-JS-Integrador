async function fetchPopularMovies() {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU4OTU1NzBiYjJjYmQ2NmQ0MDE5ZGVmODEyNTU2ZiIsIm5iZiI6MTcyMDQwNjU1OC41MjM3OSwic3ViIjoiNjY4YjUxMWZiZDc5MmJmNzgxZTcxNTBmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fbo6QVvRhkN5ZyeCQyCSGg7tU0AO3GBNfKNiD4GpzBw",
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=es-ES",
      options
    );

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      );
    }

    const { results } = await response.json();
    return results;
  } catch (error) {
    console.error("Hubo un problema con la solicitud fetch:", error);
    return null;
  }
}

async function getMovies() {
  const movies = await fetchPopularMovies();
  if (movies) {
    console.log("Películas populares:", movies);
    for (let index = 0; index < movies.length; index++) {
      let contenedor = document.getElementById("peliculas_grid");
      let renderMovies = `<div class="card">
      <h3>${movies[index].title}</h3>
      <img src="https://image.tmdb.org/t/p/w500${movies[index].poster_path}" alt="${movies[index].title}">
      <P>Nombre Original: ${movies[index].original_title}</P>
      <p>Fecha: ${movies[index].release_date}</p>
      <button onClick="agregarFav('${index}','${movies[index].title}','${movies[index].poster_path}')"

      >Agregar a Favoritos</button>
      </div>
      `;
      contenedor.innerHTML += renderMovies;
    }
  } else {
    console.log("No se pudieron obtener las películas populares.");
  }
}

getMovies();

let arrayFavoritos = [];

function agregarFav(index, title, image) {
  arrayFavoritos.push({ index, title, image });
  MostrarFavoritos();
}

function MostrarFavoritos() {
  console.log(arrayFavoritos);
  let miLista = document.getElementById("MiLista");
  miLista.innerHTML = "";
  for (let index = 0; index < arrayFavoritos.length; index++) {
    let arrayFavoritosDiv = `<div class="card">
      <h3>${arrayFavoritos[index].title}</h3>
      <img src="https://image.tmdb.org/t/p/w500${arrayFavoritos[index].image}" alt="${arrayFavoritos[index].image}">
      <button onClick="deleteFav('${arrayFavoritos[index].index}')">Quitar de Favoritos</button>
      </div>
      `;
    miLista.innerHTML += arrayFavoritosDiv;
  }
}

function deleteFav(id) {
  arrayFavoritos = arrayFavoritos.filter((fav) => fav.index != id);
  MostrarFavoritos();
}
