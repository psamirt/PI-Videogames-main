import React from "react";
import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ allGames }) => {
  return (
    <div className="cards-container">
      {allGames.map((game) => (
        <Card
          name={game.name}
          rating={game.rating}
          genre={game.genre}
          image={game.image}
          platforms={game.platforms}
          id={game.id}
          key={game.id}
        />
      ))}
    </div>
  );
};

export default Cards;
