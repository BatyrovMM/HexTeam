import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

function Login({ onLogin, loggedIn }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const { username, password } = data;
    onLogin(username, password)
  };

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/main', { replace: true })
    }
  }, [loggedIn])

  return (
  <>
    {/* <Header onPage={'login'}/> */}
    <section className="auth">
      <div className="wrapper wrapper_auth">
        <h1 className="auth__title">Авторизация</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__form-label" htmlFor="auth__form-username">
            <input className="auth__form-input"
            name="username"
            type="text"
            id="auth__form-username"
            placeholder="Пользователь"
            value={data.username}
            onChange={handleChange}
            />
          </label>
          <label className="auth__form-label" htmlFor="auth__form-password">
            <input className="auth__form-input"
            name="password"
            type="password"
            id="auth__form-password"
            placeholder="Пароль"
            value={data.password}
            onChange={handleChange}
            />
          </label>
          <button type="submit" className="auth__form-button">Войти</button>
        </form>
      </div>
    </section>
  </>
  );
}

export default Login;