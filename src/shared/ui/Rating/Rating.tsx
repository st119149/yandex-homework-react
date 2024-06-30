import React, { useCallback, useEffect, useState } from "react";
import styles from "./Rating.module.scss";
import useDebounce from "../../../utils/debounce";
import classNames from "classnames";

interface RatingProps {
  initialRating?: number;
  onChange: (rating: number) => void;
  className?: string;
}
export const DEFAUILT_DELAY = 1000;
const Rating = ({ initialRating = 0, onChange, className }: RatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const debouncedRating = useDebounce(rating, DEFAUILT_DELAY);

  useEffect(() => {
    console.log(1);
    onChange?.(debouncedRating);
  }, [debouncedRating]);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <div className={classNames(styles.rating, className)}>
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        const isStarFilled = starIndex <= (hoverIndex ?? rating);
        return (
          <span
            key={index}
            className={isStarFilled ? styles.starFilled : styles.starEmpty}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          >
            {isStarFilled ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
