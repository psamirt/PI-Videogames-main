const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const he = require("he");

const apiInfo = async () => {
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
  return games;
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
  try {
    if (idVideogame) {
      const gameFromBd = await Videogame.findOne({
        where: { id: idVideogame },
        include: Genre,
      });
      if (gameFromBd) {
        const videogame = {
          id: gameFromBd.id,
          name: gameFromBd.name,
          description: gameFromBd.description,
          image: gameFromBd.image,
          released: gameFromBd.releaseDate,
          rating: gameFromBd.rating,
          genre: gameFromBd.Genres.map((genre) => genre.name),
          platforms: gameFromBd.platforms,
        };
        return videogame;
      }
    }
    let idFound = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
    );
    idFound = await idFound.data;
    
    const videogame = {
      id: idFound.id,
      name: idFound.name,
      description: he
        .decode(idFound.description)
        .replace(/<\/?p>|<br\s*\/?>/gi, "")
        .replace(/\n/g, ""),
      image: idFound.background_image,
      released: idFound.released,
      rating: idFound.rating,
      genre: idFound.genres.map((genre) => genre.name),
      platforms: idFound.parent_platforms.map(
        (platform) => platform.platform.name
      ),
    };
    return videogame;
  } catch (error) {
    console.error(error);
  }
};

const createVideogame = async (
  name,
  description,
  image,
  releaseDate,
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
      releaseDate,
      rating,
      platforms,
      createdInDb,
    });
    const genreRecords = await Genre.findAll({
      where: {
        id: {
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
    console.log("server error");
  }
};

module.exports = {
  allInfo,
  infoById,
  createVideogame,
  infoGenres,
};
