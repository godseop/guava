import React from 'react';
import {v4 as uuid} from 'uuid';

const ColumnComponent = (props) => {

  return (
      <tr key={uuid()} onClick={props.onClickRow}>
        <td>{props.headerText}</td>
        <td>{props.value}</td>
     </tr>
  );
}

export default ColumnComponent;

