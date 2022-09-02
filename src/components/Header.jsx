import React from 'react';
import { Link } from 'react-router-dom';

function Header({ userName, signOut }) {
  return (
  <>
    <header className="header">
      <div className="wrapper header__wrapper">
        <Link to='/main'>
          <img className="header__logo" src={''} alt="logotype"/>
        </Link>
        <div className="header__profile">
        <p className="header__profile-name">{userName}</p>
        <button className='header__sign-out' onClick={signOut}>Выйти</button>
        </div>
      </div>
    </header>
  </>
  );
}

export default Header;