import classes from './NewContact.module.css';

const NewContact = () => {
    return(
        <section className={classes['add-contact-form']}>
            <div className={classes['form-info']}>
                <i className="fa-solid fa-user fa-10x"></i>
                <h2>Add new user</h2>
            </div>
            <form className={classes.form}>
                <div className={classes['form-control']}>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name"/>
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" id="lastName"/>
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor='date'>Date of Birth</label>
                    <input type="date" id="date"/>
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor='contactType'>Contact Type</label>
                    <select id='contactType' name='contactType'>
                        <option value="mobile phone">Mobile phone</option>
                        <option value="telephone">Telephone</option>
                        <option value="email">Email</option>
                        <option value="pager">Pager</option>
                    </select>
                </div>
                <div className={classes['submit-btn']}>
                    <button>Add New Contact</button>
                </div>
            </form>
        </section>
    )
}

export default NewContact;