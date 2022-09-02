import React from 'react';
import TableRow from './TableRow';

function Table({ tableMap }) {
  return (
  <>
    <table className="stat__table">
      <thead>
        <tr>
          <th className="stat__table-head">Short</th>
          <th className="stat__table-head">Target</th>
          <th className="stat__table-head">Counter</th>
        </tr>
      </thead>
      <tbody>
        {
          tableMap.map(data => {
            return <TableRow key={data.id} {...data}/>
          })
        }
      </tbody>
    </table>
  </>
  );
}

export default Table;