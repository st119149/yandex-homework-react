import React, { useCallback, useEffect, useState } from "react";

import Filter from "../widget/Filter/Filter";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchInput from "../shared/ui/SearchInput/SearchInput";
import MovieCard from "../widget/movies/MovieCard/MovieCard";
import Pagination from "../shared/ui/Pagination/Pagination";
import { useSearchQuery } from "../features/MovieList/movieApi";
import useDebounce from "../utils/debounce";

const MovieList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [release_year, setReleaseYear] = useState(
    searchParams.get("release_year") || ""
  );
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const debouncedTitle = useDebounce(title, 500);

  useEffect(() => {
    setPage(1);
    setSearchParams({
      page: "1",
      ...(debouncedTitle && { title: debouncedTitle }),
      ...(release_year && { release_year: release_year }),
      ...(genre && { genre: genre }),
    });
  }, [debouncedTitle, release_year, genre]);

  useEffect(() => {
    setSearchParams({
      page: page.toString(),
      ...(debouncedTitle && { title: debouncedTitle }),
      ...(release_year && { release_year: release_year }),
      ...(genre && { genre: genre }),
    });
  }, [page]);

  const { data, error, isLoading } = useSearchQuery({
    page,
    title: debouncedTitle,
    release_year: parseInt(release_year, 10),
    genre: genre,
  });

  return (
    <div
      style={{
        width: "calc( 100% - 50px)",
        margin: "0 auto",
        display: "flex",
        gap: "16px",
      }}
      className="container"
    >
      <Filter
        values={{ genre, release_year: release_year }}
        onChange={(params) => {
          setGenre(params.genre);
          setReleaseYear(params.release_year);
        }}
      />
      <div>
        <SearchInput value={title} onChange={(value) => setTitle(value)} />
        {data?.search_result.map((el) => (
          <MovieCard {...el} key={el?.id} />
        ))}
        <Pagination
          currentPage={page}
          totalPages={data?.total_pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default MovieList;
