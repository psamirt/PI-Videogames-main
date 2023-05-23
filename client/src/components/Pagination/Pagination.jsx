import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../redux/Actions";
import "./Pagination.css"

const Pagination = ({ gamesPerPage, allGames }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.currentPage);
  const pageNumbers = [];

  const pages = Math.ceil(allGames / gamesPerPage);

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  const indPage = pageNumbers.indexOf(page);
  let newPage = [];

  if (indPage === -1) {
    newPage = [...pageNumbers.slice(0, 3), page, ...pageNumbers.slice(-2)];
  } else if (indPage < 2) {
    newPage = pageNumbers.slice(0, 5);
  } else if (indPage > pages - 3) {
    newPage = pageNumbers.slice(pages - 5, pages);
  } else {
    newPage = pageNumbers.slice(indPage - 2, indPage + 3);
  }

  return (
    <div className="paginated">
      <div className="paginated-container">
        <button
          onClick={() => dispatch(pagination(page - 1))}
          disabled={page === 1}
          className="button-prev"
        >
          Prev
        </button>
        {newPage.map((n) => (
          <button
            key={n}
            id={page === n ? "selected" : "buttonP"}
            onClick={() => dispatch(pagination(n))}
            className="index-page"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => dispatch(pagination(page + 1))}
          disabled={page === pages}
          className="button-next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
