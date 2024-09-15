import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Pagination = ({ pages, paginate, setPaginate, setSearchParams }) => {
  const [currentPage, setCurrentPage] = useState(Number(paginate.current));

  useEffect(() => {
    setPaginate((prev) => ({
      ...prev,
      current: Number(currentPage),
    }));
    setSearchParams({ page: String(currentPage) });
  }, [currentPage, setPaginate, setSearchParams]);

  const createPagination = (pages, page) => {
    let pageCutLow = page - 1;
    let pageCutHigh = page + 1;
    let paginationItems = [];

    if (page > 1) {
      paginationItems.push(
        <li
          key="prev"
          className="page-item mr-7 p-1 bg-neutral-200 text-black rounded"
          onClick={() => setCurrentPage(page - 1)}
        >
          <a className="cursor-pointer p-2">Previous</a>
        </li>
      );
    }

    if (pages < 6) {
      for (let p = 1; p <= pages; p++) {
        paginationItems.push(
          <li
            key={p}
            className={`page-item ${
              page === p ? "bg-black text-white font-bold rounded" : ""
            }`}
            onClick={() => setCurrentPage(p)}
          >
            <a className="cursor-pointer p-2">{p}</a>
          </li>
        );
      }
    } else {
      if (page > 2) {
        paginationItems.push(
          <li
            key="first"
            className="page-item"
            onClick={() => setCurrentPage(1)}
          >
            <a className="cursor-pointer p-2">1</a>
          </li>
        );
        if (page > 3) {
          paginationItems.push(
            <li key="prev-more" className="out-of-range">
              <a className="cursor-pointer p-2">...</a>
            </li>
          );
        }
      }

      if (page === 1) pageCutHigh += 2;
      if (page === 2) pageCutHigh += 1;
      if (page === pages) pageCutLow -= 2;
      if (page === pages - 1) pageCutLow -= 1;

      for (let p = pageCutLow; p <= pageCutHigh; p++) {
        if (p === 0) p += 1;
        if (p > pages) continue;
        paginationItems.push(
          <li
            key={p}
            className={`page-item ${
              page === p ? "bg-black text-white font-bold rounded" : ""
            }`}
            onClick={() => setCurrentPage(p)}
          >
            <a className="cursor-pointer p-2">{p}</a>
          </li>
        );
      }

      if (page < pages - 1) {
        if (page < pages - 2) {
          paginationItems.push(
            <li key="next-more" className="out-of-range">
              <a className="cursor-pointer p-2">...</a>
            </li>
          );
        }
        paginationItems.push(
          <li
            key="last"
            className="page-item"
            onClick={() => setCurrentPage(pages)}
          >
            <a className="cursor-pointer p-2">{pages}</a>
          </li>
        );
      }
    }

    if (page < pages) {
      paginationItems.push(
        <li
          key="next"
          className="page-item ml-7 p-1 bg-neutral-200 text-black rounded"
          onClick={() => setCurrentPage(page + 1)}
        >
          <a className="cursor-pointer p-2">Next</a>
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <div className="flex py-3 items-center justify-center flex-col">
      <ul className="list-none select-none p-3 m-3 flex items-baseline rounded">
        {createPagination(pages, currentPage)}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  paginate: PropTypes.shape({
    current: PropTypes.number.isRequired,
    minPage: PropTypes.number,
    maxPage: PropTypes.number,
    limit: PropTypes.number,
  }).isRequired,
  setPaginate: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default Pagination;
