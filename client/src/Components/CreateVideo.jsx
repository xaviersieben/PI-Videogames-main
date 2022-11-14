import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideoGame, getGenres, getVideoGame } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateVideo.module.css";

export default function CreateVideo() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allGenres = useSelector((state) => state.genres);
  const allGames = useSelector((state) => state.videogames);

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getVideoGame());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectForGenres(e) {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
  }

  function handleGenresDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e),
    });
  }

  function handleSelectForPlatform(e) {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
  }

  function handlePlatformDelete(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e),
    });
  }
  let regexRating = /[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
  let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name) {
      return alert("Enter game name");
    } else if (!expReg.test(input.name)) {
      return alert("The name must only have letters or numbers");
    } else if (!input.released) {
      return alert("Enter a released date");
    } else if (!regexRating.test(input.rating)) {
      return alert("Enter a rating from 0 to 5 (Integer or Float)");
    } else if (!input.genres.length) {
      return alert("Select at least 1 genres");
    } else if (!input.platforms.length) {
      return alert("Select at least 1 platform");
    } else if (!input.description) {
      return alert("Enter description game");
    }

    dispatch(postVideoGame(input));
    alert("VideoGame Created Successfully");
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }

  const setArr = [];

  allGames.map((e) => e.platforms?.map((e) => setArr.push(e)));
  let newSet = [...new Set(setArr)];

  return (
    <div className={styles.container}>
      <div className={styles.blurCont}>
        <div className={styles.mainContainer}>
          <div className={styles.formContainer1}>
            <div className={styles.formContainer2}>
              <h1 className={styles.formTitle}>Crea tu juego...</h1>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <div className={styles.divContainer}>
                    <label htmlFor="name" className={styles.labelContainer1}>
                      Nombre{" "}
                    </label>
                    <input
                      className={styles.inputContainer}
                      type="text"
                      value={input.name}
                      name="name"
                      required=""
                      autoComplete="off"
                      onChange={(e) => handleChange(e)}
                    />

                    {!input.name || !expReg.test(input.name) ? (
                      <h4 className={styles.msjInputError}>
                        {"Enter a Valid Name"}
                      </h4>
                    ) : (
                      false
                    )}
                  </div>
                  {/* --------------------------------------- */}

                  <div className={styles.divContainer}>
                    <label
                      htmlFor="released"
                      className={styles.labelContainer3}
                    >
                      Fecha de lanzamiento{" "}
                    </label>
                    <input
                      className={styles.inputContainer}
                      type="date"
                      value={input.released}
                      name="released"
                      required=""
                      autoComplete="off"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {!input.released || !regexRating.test(input.rating) ? (
                      <h4 className={styles.msjInputError}>
                        {"Enter a released date"}
                      </h4>
                    ) : (
                      false
                    )} */}
                  </div>
                  {/* ---------------------------------------- */}
                  <div className={styles.divContainer}>
                    <label htmlFor="rating" className={styles.labelContainer4}>
                      Rating:{" "}
                    </label>
                    <input
                      className={styles.inputContainer}
                      type="text"
                      value={input.rating}
                      name="rating"
                      required=""
                      autoComplete="off"
                      placeholder="Rating"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {input.rating? <h4 className={styles.msjInputError}>{input.rating}</h4>: false} */}
                  </div>
                  {/* --------------------------------------- */}
                  <div className={styles.divContainer}>
                    <label htmlFor="image" className={styles.labelContainer5}>
                      Imagen:{" "}
                    </label>
                    <input
                      className={styles.inputContainer}
                      type="text"
                      value={input.image}
                      name="image"
                      required=""
                      autoComplete="off"
                      placeholder="http://image_path.jpg"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* --------------------------------------- */}
                  <div className={styles.divContainer}>
                    <label
                      htmlFor="description"
                      className={styles.labelContainer2}
                    >
                      Descripción{" "}
                    </label>
                    <textarea
                      className={styles.inputDescriContainer}
                      type="text"
                      value={input.description}
                      name="description"
                      required=""
                      autoComplete="off"
                      placeholder="Description"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {input.description? <h4 className={styles.msjInputError}>{input.description}</h4>: false}  */}
                  </div>
                  {/* --------------------------------------- */}
                  <div className={styles.selectContainer}>
                    <div>
                      <select
                        className={styles.inputGenres}
                        onChange={(e) => handleSelectForGenres(e)}
                      >
                        <option value="gen">Géneros</option>
                        {allGenres.map((e) => (
                          <option key={e.id} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* --------------------------------------- */}

                    <div>
                      <select
                        className={styles.inputPlatform}
                        onChange={(e) => handleSelectForPlatform(e)}
                      >
                        <option value="plat">Plataformas</option>
                        {newSet.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* --------------------------------------- */}

                  <Link to="/home">
                    <button className={styles.formBackBtn}>Back</button>
                  </Link>
                  <button
                    className={styles.formCreateBtn}
                    type="submit"
                    disabled={false}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.GenContainer}>
            {/* <ul><li>{input.genres.map(e => e  + " | ")}</li></ul> */}
            {input.genres.map((e) => (
              <div className={styles.deleteGenresContainer} key={e}>
                <p
                  className={styles.pGenres}
                  onClick={() => handleGenresDelete(e)}
                >
                  {e}
                </p>
                {/* <button onClick={()=> handleGenresDelete(e)}>X</button> */}
              </div>
            ))}
          </div>

          <div className={styles.PlatContainer}>
            {/* <ul><li>{input.platforms?.map(e => e  + " | ")}</li></ul> */}
            {input.platforms.map((e) => (
              <div className={styles.deletePlatformContainer} key={e}>
                <p
                  onClick={() => handlePlatformDelete(e)}
                  className={styles.pPlatform}
                >
                  {e}
                </p>
                {/* <button onClick={()=> handlePlatformDelete(e)}>X</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
