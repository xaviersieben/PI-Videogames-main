import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideoGame,
  getGenres,
  filterVideoGameByGenres,
  filterByCreated,
  orderByName,
  orderByRating,
  ratingLow,
} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import GenreSelectOption from "./GenreSelectOption";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css";
import Loading from "./Loading";

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPage] = useState(15);
  const indexOfLastVideoGame = currentPage * videoGamesPage;
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPage;
  const currentVideoGames = allVideoGames.slice(
    indexOfFirstVideoGame,
    indexOfLastVideoGame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoGame());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGame());
  }
  function handleFilterGenres(e) {
    dispatch(filterVideoGameByGenres(e.target.value));
    setCurrentPage(1);
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1);
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
  }
  function handleSortByRating(e) {
    dispatch(orderByRating(e.target.value));

    setCurrentPage(1);
  }
  function handleRatinglow(e) {
    dispatch(ratingLow());
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.wallpaperContainer}>
        <div className={styles.wallPaper}></div>
      </div>

      <div className={styles.homeTitleAndSearch}>
        <div className={styles.homeTitle}>
          <Link className={styles.titleLink} to="/">
            <h1 className={styles.homeTitle1}>VideoGames</h1>
          </Link>
        </div>
        <div className={styles.searchAndPaginado}>
          <div className={styles.homeSearchBar}>
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
          <div>
            <Paginado
              videoGamesPage={videoGamesPage}
              allVideoGames={allVideoGames.length}
              paginado={paginado}
            />
          </div>
        </div>
      </div>

      <div className={styles.homeSideAndCards}>
        <div>
          <div className={styles.homeSideOptions}>
            <Link to="/videogames">
              <button className={styles.homeOptionBtn}>Crear VideoGame</button>
            </Link>
            <button
              className={styles.homeOptionBtn}
              onClick={(e) => handleClick(e)}
            >
              Recargar VideoGame
            </button>
            <div>
              <button
                className={styles.homeOptionBtn}
                onClick={(e) => handleRatinglow(e)}
              >
                Filtrar bajo Rating
              </button>
            </div>
            <select
              className={styles.homeSelectBtn}
              onChange={(e) => handleSort(e)}
            >
              <option value="asc">Orden: A - Z</option>
              <option value="des">Orden: Z - A</option>
            </select>
            <select
              className={styles.homeSelectBtn}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="Games">Games</option>
              <option value="api">Games Api</option>
              <option value="Created">Games Creados</option>
            </select>
            <select
              className={styles.homeSelectBtn}
              onChange={(e) => handleSortByRating(e)}
            >
              <option value="Rating">Rating</option>
              <option value="Hight">Hight Rating</option>
              <option value="Low">Low Rating</option>
            </select>

            <select
              className={styles.homeSelectBtn}
              onChange={(e) => handleFilterGenres(e)}
            >
              <option value="Genres">Generos</option>
              <GenreSelectOption allGenres={allGenres} />
            </select>
          </div>
        </div>

        {
          <div className={styles.homeCardContainer}>
            {currentVideoGames.length ? (
              currentVideoGames?.map((e) => {
                return e.Error ? (
                  <h3 className={styles.errorMsj}>VideoGame No Existe</h3>
                ) : (
                  <div className={styles.homeCard} key={e.id}>
                    <Link
                      to={"/videogames/" + e.id}
                      className={styles.homeCardLink}
                    >
                      <Card
                        className={styles.mainCard}
                        name={e.name}
                        image={e.image}
                        genres={e.genres}
                        rating={e.rating}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className={styles.homeLoadingContainer}>
                {
                  <div>
                    <Loading />
                  </div>
                }
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}
