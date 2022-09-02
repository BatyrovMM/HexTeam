import React from 'react';

function TableRow({ short, target, counter }) {
  return (
    <tr>
      <td className="stat__table-body">{short}</td>
      <td className="stat__table-body">{target}</td>
      <td className="stat__table-body stat__table-body_text_center">{counter}</td>
    </tr>
  );
}

export default TableRow;