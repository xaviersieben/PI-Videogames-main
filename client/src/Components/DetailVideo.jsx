import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import styles from "./DetailVideo.module.css";

export default function VideoGameDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const videoGameDetail = useSelector((state) => state.detail);

  var regexUrl =
    /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  return (
    <div className={styles.firstContainer} key={videoGameDetail.id}>
      {videoGameDetail.name ? (
        <div className={styles.detailContainer} key={videoGameDetail.id}>
          <img
            className={styles.gameImg}
            src={
              regexUrl.test(videoGameDetail.image)
                ? videoGameDetail.image
                : videoGameDetail.image
            }
            alt="File Not Found"
            width="300px"
            hight="300px"
          />
          <div className={styles.gameDetail} key={videoGameDetail.id}>
            <h1>{videoGameDetail.name}</h1>
            <p>
              <strong>Released: </strong>
              {videoGameDetail.released}
            </p>
            <div className={styles.ratingDetail}>
              <strong>Rating: </strong>
              <p className={styles.ratingDetails}>{videoGameDetail.rating}</p>
            </div>
            <div className={styles.detailPlatform}>
              <strong>Platfom: </strong>
              {videoGameDetail.platforms?.map((e) => (
                <div key={e}>{e + " "}</div>
              ))}
            </div>
            <p>
              <strong>Genre: </strong>
              {videoGameDetail.genres?.map((e) => e).join(", ")}
            </p>
            <div>
              <strong>Sinopsis: </strong>
              {
                <p
                  dangerouslySetInnerHTML={{
                    __html: videoGameDetail.description,
                  }}
                ></p>
              }
            </div>

            <Link to="/home">
              <button className={styles.backBtnDetail}>Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <p className={styles.loadingDetail}>Loading...</p>
      )}
    </div>
  );
}
