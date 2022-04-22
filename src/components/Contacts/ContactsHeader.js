import classes from "./ContactsHeader.module.css";

const ContactsHeader = (props) => {

    const sortAsc = () => {
        props.onSortAsc();
    }

    const sortDesc = () => {
        props.onSortDesc();
    }

    const searchHandler = e => {
        props.onInput(e.target.value);
        if(e.target.value){
          props.onChangePage(1);
        }
    }

    const selectChangeHandler = e => {
      props.onSelect(+e.target.value)
    }

  return (
    <div className={classes['contacts-header']}>
      <input type="search" placeholder="Search..." onChange={searchHandler} />
      <div className={classes.buttons}>
        <button onClick={sortAsc}>Sort Ascending <i className="fa-solid fa-arrow-up"></i></button>
        <button onClick={sortDesc}>Sort Descending <i className="fa-solid fa-arrow-down"></i></button>
      </div>
      <div>
        <select value="" className={classes.select} onChange={selectChangeHandler}>
          <option value="" disabled>Contacts per Page</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default ContactsHeader;
