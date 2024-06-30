import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Select from "../../shared/ui/Select/Select";

const GENRES = {
  "0": "Не выбран",
  comedy: "Комедия",
  drama: "Драма",
  action: "Боевик",
  thriller: "Триллер",
  horror: "Ужасы",
  family: "Семейный",
  cartoon: "Анимированный",
  fantasy: "Фэнтези",
  romance: "Романтика",
  adventure: "Приключения",
  musical: "Мьюзикл",
  war: "Военный",
} as const;

type Option = {
  value: string;
  label: string;
};

const genresOptions: Option[] = Object.entries(GENRES).map(
  ([value, label]) => ({
    value: value,
    label: label,
  })
);

const YEARS = {
  "0": "Не выбран",
  "2009": "2009",
  "2008": "2008",
  "2007": "2007",
  "2006": "2006",
  "1990-2005": "1990-2005",
  "1950-1989": "1950-1989",
} as const;

const yearOptions: Option[] = Object.entries(YEARS).map(([value, label]) => ({
  value: value,
  label: label,
}));

type FilterProps = {
  values: { genre: string; release_year: string };
  onChange: (params: { genre?: string; release_year?: string }) => void;
};

const Filter: React.FC<FilterProps> = ({
  onChange,
  values: { genre, release_year: release_year },
}) => {
  const handleGenreChange = (genre: string) => {
    onChange({ genre, release_year: release_year });
  };

  const handleYearChange = (release_year: string) => {
    onChange({ genre, release_year: release_year });
  };

  return (
    <div className={styles["container_filter"]}>
      <h1>Фильтр</h1>
      <div className={styles["container_select"]}>
        <label htmlFor="">Жанр</label>
        <Select
          placeholder="Выберите жанр"
          options={genresOptions}
          onChange={handleGenreChange}
          value={genre}
        />
      </div>
      <div className={styles["container_select"]}>
        <label htmlFor="">Год выпуска</label>
        <Select
          placeholder="Выберите год"
          value={release_year}
          onChange={handleYearChange}
          options={yearOptions}
        />
      </div>
    </div>
  );
};

export default Filter;
