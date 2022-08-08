import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {v4 as uuid} from 'uuid';
import ColumnComponent from "./ColumnComponent";

const GridComponent = forwardRef((props, ref) => {

  const [dataSource, setDataSource] = useState([
    {
      // key: value 데이터
      // ...
    },
  ]);
  const [columnInfo, setColumnInfo] = useState([
    {
      field: '',
      headerText: '',
    },
  ]);


  useImperativeHandle(ref, () => ({
    setData: (datas) => {
      // 컬럼 순서
      const orders = columnInfo.map(column => column.field);
      // 컬럼 순서로 정렬
      const sortedDatas = sortPropertiesByArray(datas, orders);
      setDataSource(sortedDatas);
    },
  }));


  useEffect(() => {
    // GridComponent 하위 ColumnComponent 정보로 columnInfo 세팅
    const columns = props.children
      .filter((child) => {
        return child.type.name === 'ColumnComponent';
      })
      .map((child, index) => {
        return {
          ...child.props,
          order: index + 1
        };
      });
    setColumnInfo(columns);
  }, []);


  const onClickRow = (e, object) => {
    if (props.onClickRow) {
      props.onClickRow(object);
    }
  }

  const sortPropertiesByArray = (src, fields) => {
    return src.map(row => (
      Object.fromEntries(fields.map((m) => [m, row[m]]))
    ));
  }


  return (
    <table>
      <thead></thead>
      <tbody>
        {
          dataSource.map(object => {
            return (
              Object.entries(object)
                .map(([key, value]) => {
                  const headerText = columnInfo.find((item) => item.field === key).headerText;
                  return (
                    <ColumnComponent key={uuid()}
                                     field={key}
                                     value={value}
                                     headerText={headerText}
                                     onClickRow={(e) => onClickRow(e, object)}/>
                  );
                })
            );
          })
        }
      </tbody>
    </table>
  );
});

export default GridComponent;

