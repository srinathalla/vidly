import React from "react";
import PropTypes from "prop-types";

const Pagination = props => {
  const { itemsCount, pageSize } = props;

  const noOfPages =
    itemsCount < pageSize
      ? 1
      : itemsCount % pageSize === 0
      ? itemsCount / pageSize
      : itemsCount / pageSize + 1;

  if (noOfPages === 1) {
    return null;
  }

  let pages = [];
  for (let i = 1; i <= noOfPages; i++) {
    pages[i] = i;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={
              props.currentPage === page ? "page-item active" : "page-item"
            }
            onClick={() => props.onPageChange(page)}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
