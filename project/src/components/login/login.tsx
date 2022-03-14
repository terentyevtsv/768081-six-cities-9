import { AnyAction } from '@reduxjs/toolkit';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { setAuthAction } from '../../store/api-actions';
import { store } from '../../types/state';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post">
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
          onClick={(evt: MouseEvent) => {
            evt.preventDefault();
            const tempEmail = email.trim();
            const tempPassword = password.trim();
            store.dispatch(setAuthAction({email: tempEmail, password: tempPassword}) as unknown as AnyAction);
          }}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export default Login;
