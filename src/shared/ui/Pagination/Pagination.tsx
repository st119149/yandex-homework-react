import React from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <span className={styles.pageNumber}>{currentPage}</span>
      <button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
