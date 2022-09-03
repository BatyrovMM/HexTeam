import React from 'react';

function TableRow({ short, target, counter, refresh }) {
  const shortLink = `http://79.143.31.216/s/${short}`;
  return (
    <>
    <tr>
      <td className="stat__table-body">  
        <a href={shortLink} onClick={refresh} target="_blank" rel="noopener noreferrer" className='stat__table-link'>{short}</a> 
      </td>
      <td className="stat__table-body">
        <a href={target} target="_blank" rel="noopener noreferrer" className='stat__table-link'>{target}</a> 
      </td>
      <td className="stat__table-body stat__table-body_text_center">{counter}</td>
    </tr>
    </>
  );
}

export default TableRow;