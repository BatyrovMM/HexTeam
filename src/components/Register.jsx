import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Register({ onRegister, loggedIn }) {
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
    onRegister(username, password);
  };

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/main', { replace: true })
    }
  }, [loggedIn, navigate])

  return (
  <>
    <section className="auth">
      <div className="wrapper wrapper_auth">
      <h1 className="auth__title">Регистрация</h1>
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
          id="auth__form-auth__form-password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          />
        </label>
        <button className="auth__form-button"
        type="submit"
        >Зарегистрироваться</button>
      </form>
      <p className="auth__change">Уже зарегистрированы? <Link to="/login" className="auth__change_link">Войти</Link></p>
      </div>
    </section>
  </>
  );
}

export default Register;