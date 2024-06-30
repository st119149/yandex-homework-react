import React, { useCallback, useEffect, useState } from "react";
import Rating from "../shared/ui/Rating/Rating";
import { useParams } from "react-router-dom";
import { movieApi, useRateMovieMutation } from "../features/MovieList/movieApi";
import styles from "./MovieDetails.module.scss";
import { getLocalRating, setLocalRating } from "../utils/rating";
import useDebounce from "../utils/debounce";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();

  const { data, error, isLoading } = movieApi.useGetFilmByIdQuery(movieId);

  const token = useSelector((state: RootState) => state.auth.token);

  const [rating, setRating] = useState(
    getLocalRating(data?.id) ?? parseInt(data?.rating ?? "")
  );

  const debouncedRating = useDebounce(rating, 500);

  const [rate] = useRateMovieMutation();

  useEffect(() => {
    if (rating !== data?.rating) {
      setLocalRating(parseInt(data?.id ?? ""), rating);
      rate({ movieId: data?.id, user_rate: rating, token: "Bearer " + token });
    }
  }, [debouncedRating]);

  return (
    <div className={styles.component}>
      <div className={styles.content}>
        <Rating
          initialRating={data?.rating}
          onChange={setRating}
          className={styles.rating}
        />
        <img src={data?.poster} className={styles.img} />
        <div>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.item}>
            <span>Жанр:</span> {data?.genre}
          </div>
          <div className={styles.item}>
            <span>Год выпуска:</span> {data?.release_year}
          </div>
          <div className={styles.item}>
            <span>Рейтинг:</span> {data?.rating}
          </div>
          {/* <div>Режиссер: {data?.total_rates_count}</div> */}
          <div className={styles.item}>
            <div>Описание</div>
            {data?.description}
          </div>
        </div>
      </div>

      <h5>Актёры</h5>
      <div className={styles.actors}>
        {data?.actors.map((actor) => (
          <div className={styles.actor}>
            <img src={actor?.photo}></img>
            <div>{actor.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
