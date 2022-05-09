import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();

    let url;

    const bodyRequest = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      returnSecureToken: true
    }

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7xlKaL35jGBMnRh_t8jDtlaZWu9BlEcM';
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7xlKaL35jGBMnRh_t8jDtlaZWu9BlEcM';
    }

    try {
      const response = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(bodyRequest),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      if (!response.ok) {
        const error = await response.json();
        let errorMessage = "Authentication failed";
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        alert(errorMessage);
        throw new Error(errorMessage);
      }

      const token = await response.json();
      authCtx.login(token.idToken, token.expiresIn);
      history.replace('/');
    } 
    catch (error) {
      console.log(error);
    }

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
