import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { setAuthAction } from '../../store/api-actions';

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
            const tempPassword = password.trim();
            dispatch(
              setAuthAction({
                email: tempEmail,
                password: tempPassword,
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
