import React from 'react';
import TableRow from './TableRow';

function Table({ tableMap, refresh, whatFilter}) {
  return (
  <>
    <table className="stat__table">
      <thead>
        <tr>
          <th className="stat__table-head" onClick={whatFilter}>Short</th>
          <th className="stat__table-head" onClick={whatFilter}>Target</th>
          <th className="stat__table-head" onClick={whatFilter}>Counter</th>
        </tr>
      </thead>
      <tbody>
        {
          tableMap.map(data => {
            return <TableRow key={data.id} refresh={refresh} {...data}/>
          })
        }
      </tbody>
    </table>
  </>
  );
}

export default Table;