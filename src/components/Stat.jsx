import React from 'react';
import Header from './Header';
import Table from './Table';

function Stat({ userName, signOut, tableMap }) {
  return (
  <>
  <Header userName={userName} signOut={signOut}/>
  <section className='stat'>
    <div className="wrapper wrapper_stat">
      <h1 className='stat__title'>Статистика ваших UrlShort</h1>
      <Table tableMap={tableMap}/>
    </div>
  </section>
  </>
  );
}

export default Stat;