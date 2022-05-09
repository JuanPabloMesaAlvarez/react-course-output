import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const bodyRequest = {
      idToken: authCtx.token,
      password: passwordInputRef.current.value,
      returnSecureToken: false
    };

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7xlKaL35jGBMnRh_t8jDtlaZWu9BlEcM',
        {
          method: 'POST',
          body: JSON.stringify(bodyRequest),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      if (!response.ok) {
        const error = await response.json();
        let errorMessage = "Password change failed";
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        alert(errorMessage);
        throw new Error(errorMessage);
      }

      const token = await response.json();
      //authCtx.login(token.idToken);
      console.log(token);
      history.replace('/');
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={passwordInputRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
