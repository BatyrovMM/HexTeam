import { Api } from "../utils/api";
import React from 'react';
import { Route, Routes, Navigate, useHistory, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer'
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Stat from "./Stat";

function App() {
  const [currentUser, setCurrentUser] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [table, setTable] = React.useState([])
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: 'http://79.143.31.216'
  });

  function handleLogin(username, password) {
    return api.login(username, password)
    .then(data => {
      console.log(data);
      localStorage.setItem('jwt', data.access_token)
      setLoggedIn(true);
      setCurrentUser(username)
      navigate('/main');
    })
    .catch(() => {
      console.log('Неправильная почта или пароль');
    })
  }

  function handleRegister(username, password) {
    return api.register(username, password)
    .then(data => {
      console.log(data);
    })
    .catch(() => {
      console.log('Пользователь с такой почтой уже существует');
    });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/login');
  }

  function handleStatistics(order, offset, limit, jwt) {
    return api.statistics(order, offset, limit, jwt)
    .then((data) => {
      console.log(data);
      setTable(data)
    })
    .catch(() => {
      console.log('Ошибка');
    });
  }

  // handleStatistics('asc_short', '0', '5', jwt)

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt.length >= 67) {
      setLoggedIn(true);
      handleStatistics('asc_short', '0', '5', jwt);
    }
  }

  React.useEffect(() => {
    tokenCheck();
  },[])

  return (
    <div className="page">
      <main className="content">
      <Routes>
      <Route path="/main" element={
        <ProtectedRoute  loggedIn={loggedIn}>
          <Stat tableMap={table}/>
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        <Login onLogin={handleLogin} loggedIn={loggedIn}/>
      } />
      <Route path="/sign-up" element={
        <Register onRegister={handleRegister} loggedIn={loggedIn}/>
      } />
      <Route path='/' element={loggedIn ? <Navigate to='/main' /> : <Navigate to='/sign-up' />}/>
      <Route path='/*' element={loggedIn ? <Navigate to='/main' /> : <Navigate to='/login' />}/>
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;