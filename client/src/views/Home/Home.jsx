import React, { useEffect, useState, useMemo } from "react";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/Actions";
import "./Home.css";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import Search from "../../components/Search/Search";

const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const [loading, setLoading] = useState(true);
  const orderBolean = useSelector((state) => state.orderBolean);
  const genreBolean = useSelector((state) => state.genreBolean);
  const ratingBolean = useSelector((state) => state.ratingBolean);
  const originBolean = useSelector((state) => state.originBolean);
  // const platformBolean = useSelector((state) => state.platformBolean);
  const gamesAZ = useSelector((state) => state.gamesAZ);
  const filterByGenre = useSelector((state) => state.filterByGenre);
  const gamesRating = useSelector((state) => state.gamesRating);
  const filterByOrigin = useSelector((state) => state.filterByOrigin);
  // const filterbyPlatform = useSelector((state) => state.filterbyPlatform);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const page = useSelector((state) => state.currentPage);
  const indexOfTheLastGame = page * gamesPerPage;
  const indexOfFirstGame = indexOfTheLastGame - gamesPerPage;

  const currentGames = useMemo(() => {
    return allGames.slice(indexOfFirstGame, indexOfTheLastGame);
  }, [allGames, indexOfFirstGame, indexOfTheLastGame]);

  useEffect(() => {
    dispatch(getGames())
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);

  const displayedGames = useMemo(() => {
    if (orderBolean) {
      return gamesAZ.slice(indexOfFirstGame, indexOfTheLastGame);
    } else if (ratingBolean) {
      return gamesRating.slice(indexOfFirstGame, indexOfTheLastGame);
    } else if (genreBolean) {
      return filterByGenre.slice(indexOfFirstGame, indexOfTheLastGame);
    } else if (originBolean) {
      return filterByOrigin.slice(indexOfFirstGame, indexOfTheLastGame);
    } 
    // else if (platformBolean) {
    //   return filterbyPlatform.slice(indexOfFirstGame, indexOfTheLastGame);
    // }
     else {
      return currentGames;
    }
  }, [
    currentGames,
    gamesAZ,
    gamesRating,
    filterByGenre,
    genreBolean,
    indexOfFirstGame,
    indexOfTheLastGame,
    orderBolean,
    ratingBolean,
    filterByOrigin,
    originBolean,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-container">
      <header className="home-titulo">Gamer Zone</header>
      <Pagination gamesPerPage={gamesPerPage} allGames={allGames.length} />
      <div className="search-filter-container">
        <Filter />
        <Search />
      </div>
      <Cards allGames={displayedGames} />
    </div>
  );
};

export default Home;
