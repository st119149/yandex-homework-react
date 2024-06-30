// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type QueryResultType = {
  search_result: MovieCardType[];
  total_pages: number;
};

export type MovieCardType = {
  id: string;
  poster: string;
  title: string;
  genre: string;
  release_year: number;
  description: string;
  rating: string;
  children: React.ReactNode;
};

export const movieApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    search: builder.query<
      QueryResultType,
      { page: number; title?: string; release_year?: string; genre?: string }
    >({
      query: ({ page, title, release_year, genre }) => {
        const params = {
          page: page.toString(),
          ...(title && { title }),
        };
        if (release_year && release_year != "0") {
          params.release_year = release_year;
        }
        if (genre && genre != "0") {
          params.genre = genre;
        }
        const urlSearchParams = new URLSearchParams(params);
        return `/api/v1/search?${urlSearchParams.toString()}`;
      },
    }),
    getFilmById: builder.query<MovieCardType, number>({
      query: (id) => `/api/v1/movie/${id}`,
    }),
    rateMovie: builder.mutation<
      MovieCardType,
      { movieId: number; user_rate: number; token: string }
    >({
      query: (data) => ({
        url: "/api/v1/rateMovie",
        method: "POST",
        body: { movieId: data.movieId, user_rate: data.user_rate },
        headers: {
          authorization: data.token,
        },
      }),
    }),
  }),
});

export const { useSearchQuery, useGetFilmByIdQuery, useRateMovieMutation } =
  movieApi;
