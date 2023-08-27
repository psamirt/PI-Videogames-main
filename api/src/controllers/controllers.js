const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const he = require("he");

const isGameDataInDatabase = async () => {
  const count = await Videogame.count();
  return count > 0;
};

const apiInfo = async () => {
  if (await isGameDataInDatabase()) {
    // Data is already in the database, retrieve and return it
    const gamesFromDB = await Videogame.findAll({
      attributes: ['id', 'name', 'image', 'releaseDate', 'rating'],
      include: [{
        model: Genre,
        attributes: ['name'],
        through: { attributes: [] }, // Exclude Genre association details
      }],
    });

    return gamesFromDB.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.image,
      releaseDate: game.releaseDate,
      rating: game.rating,
      genre: game.Genres.map((genre) => genre.name),
    }));
  } else {
    // Data is not in the database, fetch from API and store in the database
    const games = [];
    let nextPage = 1;

    while (games.length < 100) {
      // ... (your existing API fetching logic)

      games.push(...info);
      nextPage++;
    }

    // Store the games in the database
    await Promise.all(games.map(async (game) => {
      const { genre, ...gameData } = game;
      const createdGame = await Videogame.create(gameData);
      const genres = await Genre.findAll({ where: { name: genre } });
      await createdGame.addGenres(genres);
    }));

    return games;
  }
};


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
