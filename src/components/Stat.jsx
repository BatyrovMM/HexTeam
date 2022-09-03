import React from 'react';
import Header from './Header';
import Table from './Table';

function Stat({ userName, signOut, tableMap, onUrlSent, urlShort, refresh, whatPagination, whatFilter, whatButtonPag }) {
  const [urlData, setUrlData] = React.useState('');
  const [copySuccess, isCopySuccess] = React.useState('');
  const ifUrlShort = urlShort ? 'stat__short-url-span stat__short-url-span_active' : 'stat__short-url-span';
  
  const handleChange = (event) => {
    setUrlData(event.target.value)
  };

  const handleSubmitUrl = (event) => {
    event.preventDefault()

    isCopySuccess('')
    onUrlSent(urlData);
    setUrlData('')
  }

  const toClipBoard = (event) => {
    if (urlShort) {
      isCopySuccess(' - теперь скопирована!')
      return navigator.clipboard.writeText(event.target.textContent)
    }

    return
  }

  const handlePagination = (event) => {
    const value = event.target.value

    whatPagination(value)
  }

  const handleButtonPag = () => {
    if (whatButtonPag === 0) {
      
    }
  }

  return (
  <>
  <Header userName={userName} signOut={signOut}/>
  <section className='stat'>
    <div className="wrapper wrapper_stat">
      <h1 className='stat__title'>Статистика ваших UrlShort</h1>
      <form className='stat__form' onSubmit={handleSubmitUrl}>
        <input type="text"
          className='stat__form-input' 
          id='stat-form-input' 
          onChange={handleChange} 
          value={urlData}
          placeholder='Сделаем вашу ссылку короче'
        />
        <button type="submit" className='stat__form-button'>Короче</button>
      </form>
      <p className="stat__short-url">Ваша новая ссылка:&#160; 
      <span className={ifUrlShort} onClick={toClipBoard}>http://79.143.31.216/s/{urlShort}</span>
      <span className='stat__short-url-copy'>{copySuccess}</span>
      </p>
      <Table tableMap={tableMap} refresh={refresh} whatFilter={whatFilter}/>
      <div className="stat__pagination">
        <button className='stat__pagination-button' value='back' onClick={handlePagination}>Назад</button>
        <button className='stat__pagination-button' value='home' onClick={handlePagination}>В начало</button>
        <button className='stat__pagination-button' value='next' onClick={handlePagination}>Вперед</button>
      </div>
    </div>
  </section>
  </>
  );
}

export default Stat;