import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {v4 as uuid} from 'uuid';
import ElementComponent from "./ElementComponent";
import ComboBox from "./ComboBox";
import TextBox from "./TextBox";

const DetailComponent = forwardRef((props, ref) => {

  const [dataSource, setDataSource] = useState({
      // key: value 데이터
      // ...
  });

  const [columnInfo, setColumnInfo] = useState([
    {
      field: '',
      headerText: '',
      edit: false,
      editType: 'text',
    },
  ]);

  const inputRefs = useRef([]);


  useImperativeHandle(ref, () => ({
    setDetailData: (data) => {
      // 컬럼 순서
      const orders = columnInfo.map(column => column.field);
      // 컬럼 순서로 정렬
      const sortedData = sortPropertiesByArray(data, orders);
      setDataSource(sortedData);
    },
    getDetailData: () => {
      return dataSource;
    },
  }));


  useEffect(() => {
    // DetailComponent 하위 ElementComponent 정보로 columnInfo 세팅
    const columns = props.children
      .filter((child) => {
        return child.type.name === 'ElementComponent';
      })
      .map((child, index) => {
        return {
          ...child.props,
          order: index + 1
        };
      });
    setColumnInfo(columns);
  }, []);

  const sortPropertiesByArray = (src, fields) => {
    return Object.fromEntries(fields.map((m) => [m, src[m]]));
  }

  const onChangeElement = (data) => {
    setDataSource({
      ...dataSource,
      ...data,
    });
  }


  return (
    <table>
      <thead></thead>
      <tbody>
      {
        Object.entries(dataSource)
          .map(([key, value]) => {
            const column = columnInfo.find((item) => item.field === key);
            // return (
            //   <ElementComponent key={uuid()}
            //                     field={key}
            //                     value={dataSource[key]}
            //                     headerText={column.headerText}
            //                     edit={column.edit}
            //                     editType={column.editType}
            //                     onChangeElement={onChangeElement}/>
            // );
            return (
              <tr>
                <td>{column.headerText}</td>
                {column.edit
                  ?
                  column.editType === 'combo' ?
                    <td>
                      <ComboBox ref={r => inputRefs.current[key] = r}
                                name={key}
                                defaultValue={dataSource[key] ?? ''}
                                dataSource={column.dataSource}/>
                    </td>
                    :
                    <td>
                      <TextBox ref={r => inputRefs.current[key] = r}
                               name={key}
                               defaultValue={dataSource[key] ?? ''}/>
                    </td>
                  :
                  <td>
                    {typeof(dataSource[key]) === 'number' ? dataSource[key].toLocaleString('ko-KR').toFixed(2) : dataSource[key] ?? ''}
                  </td>
                }
              </tr>
            );
          })
      }
      </tbody>
    </table>
  );
});

export default DetailComponent;


