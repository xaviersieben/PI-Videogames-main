import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({
  videoGamesPage,
  allVideoGames,
  paginado,
  page,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideoGames / videoGamesPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={styles.paginadoUl}>
        {pageNumbers?.map((number) => {
          return (
            <li className={styles.paginadoLi} key={number}>
              <button
                className={styles.paginadoBtn}
                onClick={() => paginado(number)}
                
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
