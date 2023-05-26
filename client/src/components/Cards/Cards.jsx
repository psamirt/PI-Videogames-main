import React from "react";
import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ allGames }) => {
  return (
    <div className="cards-container">
      {allGames.map((game) => {
        const genres = game.genre || (game.Genres.map((genre) => genre.name));
        return (
          <Card
            name={game.name}
            rating={game.rating}
            genre={genres}
            image={game.image}
            platforms={game.platforms}
            id={game.id}
            key={game.id}
          />
        );
      })}
    </div>
  );
};

export default Cards;
