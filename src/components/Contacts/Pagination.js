import classes from './Pagination.module.css';

const Pagination = (props) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalContacts / props.contactsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.pagination}>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => props.onActivePage(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
