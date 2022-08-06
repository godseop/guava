import {forwardRef, useImperativeHandle, useState} from "react";

const ListComponent = forwardRef((props, ref) => {

  const [dataSource, setDataSource] = useState([
    {
      FIELD1: 'AAAAAAAA',
      FIELD2: 'BBBBBBBB',
      FIELD3: 'CCCCCCCC',
    },
    {
      FIELD1: 'DDDDDDDD',
      FIELD2: 'FFFFFFFF',
      FIELD3: 'GGGGGGGG',
    },
  ]);

  const [headerText, setHeaderText] = useState([
    '필드1', '필드2', '필드3',
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
        dataSource.map(obj => {
          return (
            Object.entries(obj).map(([key, value], index, row) => {
              return (
                <tr>
                  <td>{headerText[index]}</td>
                  <td>{value}</td>
                </tr>
              );
            })
          );
        })
      }
      </tbody>
    </table>
  );
});

export default ListComponent;