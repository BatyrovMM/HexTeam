import React from 'react';

function Header({ userName, signOut }) {
  return (
  <>
    <header className="header">
      <div className="wrapper header__wrapper">
      <p className='header__title'>URLSHORT</p>
      <button className='header__sign-out' onClick={signOut}>Выйти</button>
      </div>
    </header>
  </>
  );
}

export default Header;