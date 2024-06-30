import React from "react";
import styles from "./MovieCard.module.scss";
import Rating from "../../../shared/ui/Rating/Rating";
import { Link } from "react-router-dom";
import { getLocalRating, setLocalRating } from "../../../utils/rating";

export type MovieCardType = {
  id: number;
  poster: string;
  title: string;
  genre: string;
  release_year: number;
  description: string;
  rating: number;
  children: React.ReactNode;
};

const MovieCard: React.FC<MovieCardType> = ({
  poster,
  title,
  genre,
  release_year,
  description,
  rating,
  children,
  id,
}) => {
  return (
    <div className={styles.card}>
      <Link to={`/${id}`}>
        <img src={poster} className={styles.img}></img>
      </Link>
      <div className={styles.container_description}>
        <div>
          <div>
            <h1>{title}</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th className={styles.disable}>Жанр</th>
                <th>{genre}</th>
              </tr>
              <tr>
                <th className={styles.disable}>Год выпуска</th>
                <th>{release_year}</th>
              </tr>
              <tr>
                <th className={styles.disable}>Описание</th>
                <th>{description}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.score}>
          <Rating
            initialRating={getLocalRating(id) ?? rating}
            // onChange={(rating) => setLocalRating(id, rating)}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
