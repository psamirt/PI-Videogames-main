const {
  allInfo,
  infoById,
  createVideogame,
  infoGenres,
} = require("../controllers/controllers");

const getGamesAndName = async (req, res) => {
  const { name } = req.query;
  let allGames = await allInfo();
  if (name) {
    let gameName = await allGames.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    gameName.length
      ? res.status(200).send(gameName)
      : res.status(404).send("Nombre no existente");
  } else {
    res.status(200).send(allGames);
  }
};

const getGamesById = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const getId = await infoById(idVideogame);
    if (getId) {
      res.status(200).json(getId);
    } else {
      res.status(404).send("ID no encontrado");
    }
  } catch (error) {
    res.status(400).send("ID not found");
  }
};

const createGame = async (req, res) => {
  const { name, description, image, releaseDate, rating, genre,platforms,createdInDb } = req.body;
  try {
    const create = await createVideogame(
      name,
      description,
      image,
      releaseDate,
      rating,
      genre,
      platforms,
      createdInDb
    );
    return res.status(200).send(create); 
  } catch (error) {
    return res.status(400).send("Debe ingresar todos los campos"); 
  }
};


//---------------------------------------------------------------------------------

const getGenres = async (req, res) => {
  try {
    const gen = await infoGenres();
    res.status(200).send(gen);
  } catch (error) {
    res.status(400).send("Genero no encontrado");
  }
};

module.exports = {
  getGamesAndName,
  getGamesById,
  createGame,
  getGenres,
};
