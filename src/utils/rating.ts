const RATINGS_KEY = "ratings";

export const getLocalRating = (id: string | undefined) => {
  const ratings = localStorage.getItem(RATINGS_KEY);
  if (!ratings || id === undefined) return;

  return JSON.parse(ratings)[id];
};

export const setLocalRating = (id: string, rating: string) => {
  console.log(id, rating);
  const ratings: Record<string, string> =
    JSON.parse(localStorage.getItem(RATINGS_KEY) ?? "") ?? {};

  localStorage.setItem(
    RATINGS_KEY,
    JSON.stringify({ ...ratings, [id]: rating })
  );
};
