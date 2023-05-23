const { Router } = require("express");
const {
  getGamesAndName,
  getGamesById,
  createGame,
  getGenres,
} = require("../handlers/handlers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/videogames", getGamesAndName);

router.get("/videogames/:idVideogame", getGamesById);

router.get("/genres", getGenres);

router.post("/videogames", createGame);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
