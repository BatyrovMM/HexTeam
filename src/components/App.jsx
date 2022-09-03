import { Api } from "../utils/api";
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Stat from "./Stat";
import Loader from "./Loader";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [table, setTable] = React.useState([]);
  const [shortUrl, setShortUrl] = React.useState('');
  const [refresh, setRefresh] = React.useState(0);
  const [filterChoice, setFilterChoice] = React.useState('asc_counter');
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(30);
  const [dataLength, setDataLength] = React.useState(0)
  const [order, setOrder] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: 'http://79.143.31.216',
    jwt: jwt
  });

  function handleLogin(username, password) {
    setLoading(true);
    return api.login(username, password)
    .then(data => {
      localStorage.setItem('jwt', data.access_token);
      setLoggedIn(true);
      navigate('/main');
    })
    .catch(() => {
      console.log('Неправильная почта или пароль');
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function handleRegister(username, password) {
    setLoading(true);
    return api.register(username, password)
    .then(data => {
      navigate('/login');
    })
    .catch(() => {
      console.log('Пользователь с такой почтой уже существует');
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/login');
  }

  function handleStatisticsLength(order, offset, limit) {
    setLoading(true);
    return api.statistics(order, offset, limit)
    .then((data) => {
      setDataLength(data.length)
    })
    .catch(() => {
      console.log('Ошибка');
    })
  }

  function handleStatistics(order, offset, limit) {
    setLoading(true);
    return api.statistics(order, offset, limit)
    .then((data) => {
      setTable(data);
    })
    .catch(() => {
      console.log('Ошибка');
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function getShortUrl(link) {
    return api.squeeze(link)
    .then(res => {
      setShortUrl(res.short);
      refreshFunc()
    })
    .catch(() => {
      console.log('Ошибка');
    })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt.length >= 67) {
      setLoggedIn(true);
      handleStatisticsLength(filterChoice, 0, 0)
      handleStatistics(filterChoice, offset, limit);
    }
  }

  function refreshFunc() {
    return setRefresh(() => refresh + 1)
  }

  function filterSelect(event) {
    const content = event.target.textContent;

    if (content === 'Short' && order) {
      setOrder(false)
      return setFilterChoice('desc_short')
    }
    if (content === 'Short' && !order) {
      setOrder(true)
      return setFilterChoice('asc_short')
    }
    if (content === 'Target' && order) {
      setOrder(false)
      return setFilterChoice('desc_target')
    }
    if (content === 'Target' && !order) {
      setOrder(true)
      return setFilterChoice('asc_target')
    }
    if (content === 'Counter' && order) {
      setOrder(false)
      return setFilterChoice('desc_counter')
    }
    if (content === 'Counter' && !order) {
      setOrder(true)
      return setFilterChoice('asc_counter')
    }
  }

  function pagination(value) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    
    if (value === 'back') {
      if (offset === 0) {
        return
      }
      if (offset - 30 < 0) {
        return setOffset(0)
      }
      return setOffset(offset - 30);
    }
    if (value === 'home') {
      return setOffset(0);
    }
    if (value === 'next') {
      if (offset + 30 > dataLength) {
        return setOffset(dataLength - 30);
      }
      if (offset + 30 === dataLength) {
        return
      }
      return setOffset(offset + 30);
    }
  }

  React.useEffect(() => {
    tokenCheck();
  },[loggedIn, refresh, filterChoice, offset])


  return (
    <div className="page">
      <main className="content">
      <Routes>
      <Route path="/main" element={
        <ProtectedRoute  loggedIn={loggedIn}>
          <Stat 
            tableMap={table} 
            signOut={handleSignOut} 
            onUrlSent={getShortUrl} 
            urlShort={shortUrl} 
            refresh={refreshFunc}
            whatFilter={filterSelect}
            whatPagination={pagination}
          />
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
      <Loader isLoading={loading}/>
    </div>
  );
}

export default App;