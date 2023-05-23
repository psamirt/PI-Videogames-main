const { API_KEY } = process.env;
const { Genre } = require("../db");
const axios = require("axios");

const getGamesFromApi = async () => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const games = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
    }));
    games.forEach(async (game) => {
      await Genre.findOrCreate({
        where: {
          name: game.name,
          id: game.id,
        },
      });
    });
    return games;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getGamesFromApi };
