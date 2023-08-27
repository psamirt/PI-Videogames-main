const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const he = require("he");

const apiInfo = async () => {
  // Verificar si hay datos en la base de datos
  const existingGames = await Videogame.findAll();

  if (existingGames.length > 0) {
    // Si hay datos en la base de datos, retornarlos
    return existingGames.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.image,
      releaseDate: game.releaseDate,
      rating: game.rating,
      genre: game.genres.map((genre) => genre.name),
      platforms: game.platforms.map((platform) => platform.name),
    }));
  }

  // Si no hay datos en la base de datos, hacer llamadas a la API y guardar en la base de datos
  const games = [];
  let nextPage = 1;

  while (games.length < 100) {
    const api = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${nextPage}`
    );
    const data = api.data.results;
    if (data.length === 0) {
      break;
    }
    const info = data.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        releaseDate: el.released,
        rating: el.rating,
        genre: el.genres.map((genre) => genre.name),
        platforms: el.parent_platforms.map(
          (platform) => platform.platform.name
        ),
      };
    });
    games.push(...info);
    nextPage++;
  }

  // Guardar los juegos en la base de datos
  await Promise.all(
    games.map(async (game) => {
      const createdGame = await Videogame.create({
        id: game.id,
        name: game.name,
        image: game.image,
        releaseDate: game.releaseDate,
        rating: game.rating,
      });

      // Asociar géneros y plataformas con el juego
      await createdGame.setGenres(game.genre);
      await createdGame.setPlatforms(game.platforms);
    })
  );

  return games;
};

// Llamar a la función para obtener los juegos
apiInfo()
  .then((games) => {
    console.log("Juegos obtenidos:", games);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


const bdInfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const allInfo = async () => {
  try {
    const gameApi = await apiInfo();
    const bd = await bdInfo();
    const all = gameApi.concat(bd);
    return all;
  } catch (error) {
    console.error(error);
  }
};

const infoById = async (idVideogame) => {
  if (isNaN(idVideogame)) {
    let gameFound = await Videogame.findByPk(idVideogame, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (!gameFound) throw Error(`${idVideogame} en DB no encontrado`);
    const gameIdBD = {
      id: gameFound.id,
      name: gameFound.name,
      platforms: gameFound.platforms,
      description: gameFound.description,
      rating: gameFound.rating,
      image: gameFound.image,
      released: gameFound.released,
      createdInDb: gameFound.created,
      Genres: gameFound.Genres.map((genre) => genre.name),
    };
    return gameIdBD;
  }
  const { data } = await axios.get(
    `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
  );
  if (!data.name) throw Error(`${idVideogame} en API no encontrado`);
  const gameIdApi = {
    id: data.id,
    name: data.name,
    image: data.background_image,
    platforms: data.parent_platforms.map((platform) => platform.platform.name),
    description: data.description_raw,
    released: data.released,
    rating: data.rating,
    createdInDb: false,
    Genres: data.genres.map((genre) => genre.name),
  };
  return gameIdApi;
};

const createVideogame = async (
  name,
  description,
  image,
  released,
  rating,
  genre,
  platforms,
  createdInDb
) => {
  try {
    const createVideogame = await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
      createdInDb,
    });
    const genreRecords = await Genre.findAll({
      where: {
        name: {
          [Op.in]: genre,
        },
      },
    });
    await createVideogame.addGenre(genreRecords);
    return createVideogame;
  } catch (error) {
    console.error(error);
  }
};

//-------------------------------------------------------------------------------

const infoGenres = async () => {
  try {
    const genreBD = await Genre.findAll();
    return genreBD;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  allInfo,
  infoById,
  createVideogame,
  infoGenres,
};
