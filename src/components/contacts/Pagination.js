import classes from "./Pagination.module.css";

const Pagination = ({ numOfPages, onActivePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.pagination}>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onActivePage(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
