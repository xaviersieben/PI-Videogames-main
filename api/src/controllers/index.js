const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Videogame, Genre, Videogame_Genre } = require("../db.js");

const getApi = async () => {
  let result = [];
  let query = [
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
  ];

  // console.log(query);

  await Promise.all(query)
    .then((e) => {
      e.forEach((e) => {
        result.push(
          ...e.data.results.map((e) => {
            const objectInfo = {
              id: e.id,
              image: e.background_image,
              name: e.name,
              released: e.released,
              rating: e.rating,
              platforms: e.platforms.map((e) => e.platform.name),
              genres: e.genres.map((e) => e.name),
              description: e.description,
            };

            return objectInfo;
          })
        );
      });
    })
    .then(() => result)
    .catch((error) => console.log(error));
  console.log(result.length);

  return result;
};

const getDb = async () => {
  let infoDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });

  // retorno los datos necesarios para los juegos de la DB
  infoDb = infoDb.map(
    ({ createInDb, id, name,image, releaseDate, rating, platforms,genres }) => ({
      createInDb,
      id,
      name,
      releaseDate,
      rating,
      platforms,
      image,
      genres: genres.map((e) => e.name),
    })
  );
  console.log(infoDb)
  return infoDb;
};

const allGames = async () => {
  const allApiInfo = await getApi();
  const allDbInfo = await getDb();
  const totalInfo = allApiInfo.concat(allDbInfo);
  console.log(totalInfo.length);
  return totalInfo;
};

exports.getVideogame = async (req, res) => {
  try {
    const { name } = req.query;

    let videogameAllName = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );

    if (name) {
      let videogameName = videogameAllName.data.results.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      videogameName = videogameName.slice(0, 15);
      console.log(videogameName.length);

      videogameName = videogameName.map((data) => {
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          released: data.released,
          rating: data.rating,
          image: data.background_image,
          platforms: data.platforms?.map((data) => data.platform.name),
          genres: data.genres?.map((data) => data.name),
        };
      });

      let videogameDb = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        include: Genre,
      });

      videogameDb = videogameDb.map(
        ({
          createInDb,
          id,
          name,
          released,
          rating,
          platforms,
          genres,
          image,
        }) => ({
          createInDb,
          id,
          name,
          released,
          rating,
          platforms,
          genres: genres.map((genre) => genre.name),
          image,
        })
      );

      videogameName = videogameDb.concat(videogameName);

      if (videogameName.length) {
        return res.status(200).json(videogameName);
      } else {
        return res.json({ err: "No existe ese videojuego" });
      }
    } else {
      let allVideogames = await allGames();

      res.status(200).json(allVideogames);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getVideoId = async (req, res) => {
  const { id } = req.params;

  if (id.length > 8) {
    try {
      let dbGameInfo = await Videogame.findOne({
        where: { id: id },
        include: Genre,
      });

      let gameDb = {
        image: dbGameInfo.image,
        name: dbGameInfo.name,
        released: dbGameInfo.released,
        rating: dbGameInfo.rating,
        platforms: dbGameInfo.platforms,
        genres: dbGameInfo.genres?.map((e) => e.name),
        description: dbGameInfo.description,
      };
      res.status(200).send(gameDb);
    } catch (err) {
      res.status(404).send("no se encuentra el id");
    }
  } else {
    try {
      const videoGameInfoId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let gameDetail = {
        image: videoGameInfoId.data.background_image,
        name: videoGameInfoId.data.name,
        released: videoGameInfoId.data.released,
        rating: videoGameInfoId.data.rating,
        platforms: videoGameInfoId.data.platforms.map((e) => e.platform.name),
        genres: videoGameInfoId.data.genres.map((e) => e.name),
        description: videoGameInfoId.data.description,
        website: videoGameInfoId.data.website,
      };
      console.log(gameDetail);

      res.status(200).json(gameDetail);
    } catch (err) {
      res.status(404).send("no se encuentra el id");
    }
  }
};

exports.getGenre = async (req, res) => {
  const apiGenreInfo = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const { results } = apiGenreInfo.data;

  for (let i = 0; i < results.length; i++) {
    const { name } = results[i];
    await Genre.findOrCreate({
      where: { name: name },
    });
  }
  let allGenres = await Genre.findAll();

  res.status(200).json(allGenres);
};

exports.postVideogame = async (req, res) => {
  const {
    id,
    name,
    image,
    description,
    releaseDate,
    rating,
    genres,
    platforms,
  } = req.body;
  try {
    let newVideogame = await Videogame.create({
      id,
      name,
      description,
      image,
      releaseDate,
      rating,
      platforms,
    });

    let findGenres = await Genre.findAll({
      where: { name: genres },
    });

    newVideogame.addGenres(findGenres);
    res.send("VideoGame Created Successfully");
    //res.send(newVideogame)
  } catch (error) {
    console.log(error);
    console.log("Error en la ruta de Post");
  }
};
