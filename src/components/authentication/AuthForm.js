import classes from './AuthForm.module.css';
import addressBg from '../../assets/addressBook.webp';

const AuthForm = props => {
    return (
        <section className={classes['form-page']}>
            <div className={classes['form-info']}>
                <h1>Address Book</h1>
                <img src={addressBg} alt='address book'/>
            </div>
            <div className={classes['form-container']}>
                <form className={classes.form}>
                    <div className={classes['form-control']}>
                        <label for="email">Email</label>
                        <input type="email" id="email"/>
                        <p>Please enter a valid email address</p>
                    </div>
                    <div className={classes['form-control']}>
                        <label for="password">Password</label>
                        <input type="password" id="password"/>
                        <p>Please enter a valid password</p>
                    </div>
                    <div className={classes['btn-container']}>
                        <button>Login</button>
                    </div>
                    <button className={classes['switchBtn']}>Don't have an account? Sign up for free!</button>
                </form>
            </div>
        </section>
    )
}

export default AuthForm;