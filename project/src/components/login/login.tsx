import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, validateEmail } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { setAuthAction } from '../../store/api-actions';

const isPasswordCorrect = (password: string) => {
  if (password.length < 2) {
    toast.info('Password size should be more than 1 symbol');
    return false;
  }

  let charsCount = 0;
  let figureCount = 0;
  for (let i = 0; i < password.length; ++i) {
    if (!password[i].match(/[0-9a-z]/i)) {
      toast.info('Password has special symbols');
      return false;
    }

    if (password[i].match(/[0-9]/)) {
      ++figureCount;
    }

    if (password[i].match(/[a-z]/i)) {
      ++charsCount;
    }
  }

  const isCorrect = figureCount >= 1 && charsCount >= 1;
  if (!isCorrect) {
    toast.info('Password has not minimum 1 digit and 1 letter');
  }

  return isCorrect;
};

const isEmailCorrect = (email: string) => {
  if (validateEmail(email)) {
    return true;
  }

  toast.info('Email has bad format');
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={
          (evt: SyntheticEvent) => {
            evt.preventDefault();

            const tempEmail = email.trim();
            if (!isPasswordCorrect(password) || !isEmailCorrect(tempEmail)) {
              return;
            }

            dispatch(
              setAuthAction({
                email: tempEmail,
                password,
              }));

            navigate(AppRoute.Main);
          }
        }
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            value={email}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              setEmail(evt.target.value)}
            placeholder="Email"
            data-testid="login"
            required
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            value={password}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              setPassword(evt.target.value)}
            placeholder="Password"
            data-testid="password"
            required
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export default Login;
