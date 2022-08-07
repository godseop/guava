import {forwardRef, useImperativeHandle, useState} from "react";
import {v4 as uuidv4} from 'uuid';

const DetailComponent = forwardRef((props, ref) => {

  const [dataSource, setDataSource] = useState({
      FIELD1: 'DDDDDDDD',
      FIELD2: 'FFFFFFFF',
      FIELD3: 'GGGGGGGG',
      FIELD4: 'QQQQQQQQ',
      FIELD5: 'ZZZZZZZZ',
  });

  const [headerText, setHeaderText] = useState([
    '필드1', '필드2', '필드3', '필드4', '필드5',
  ]);

  useImperativeHandle(ref, () => ({
    setData: (data) => {
      setDataSource(data);
    }
  }));


  return (
    <table>
      <thead></thead>
      <tbody>
      {
        Object.entries(dataSource).map(([key, value], index, row) => {
          return (
              <tr key={uuidv4()}>
                <td>{headerText[index]}</td>
                <td>{value}</td>
              </tr>
          );
        })
      }
      </tbody>
    </table>
  );
});

export default DetailComponent;