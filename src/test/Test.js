import React from 'react';
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import DetailComponent from "../common/DetailComponent";
import GridComponent from "../common/GridComponent";
import ColumnComponent from "../common/ColumnComponent";
import ElementComponent from "../common/ElementComponent";

const Test = () => {

  const [condition, setCondition] = useState({
    CONDITION1: '',
    CONDITION2: '',
    CONDITION3: '',
  });

  const [viewCondition, setViewCondition] = useState(true);
  const [viewList, setViewList] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  //const [viewPopup, setViewPopup] = useState(false);

  const listRef = useRef(null);
  const detailRef = useRef(null);

  const navigate = useNavigate();

  const main = () => {
    navigate(-1);
  }

  const search = () => {
    setViewCondition(false);
    setViewList(true);

    listRef.current.setData([
      {
        FIELD3: '[0]필드3',
        FIELD2: '[0]필드2',
        FIELD1: '[0]필드1',
      },
      {
        FIELD1: '[1]필드1',
        FIELD3: '[1]필드3',
        FIELD2: '[1]필드2',
      },
      {
        FIELD2: '[2]필드2',
        FIELD3: '[2]필드3',
        FIELD1: '[2]필드1',
      },
    ]);
  }

  const onChangeCondition = (e) => {
    e.preventDefault();
    //console.log(e);
    setCondition({
      ...condition,
      [e.target.name]: e.target.value,
    })
  }


  const back = () => {
    setViewCondition(true);
    setViewList(false);
  }

  const goList = () => {
    setViewList(true);
    setViewDetail(false);
  }

  const onClickRow = (e) => {
    setViewList(false);
    setViewDetail(true);

    detailRef.current.setDetailData({
      FIELD3: '값3',
      FIELD2: '값2',
      FIELD1: '값1',
      FIELD5: '값5',
      FIELD4: '값4',
    });
  }

  const save = () => {

  }

  return (
    <div>
      <div className={viewCondition ? 'visible' : 'hidden'}>
        <input type='text' name='CONDITION1' value={condition.CONDITION1} onChange={onChangeCondition} />
        <input type='text' name='CONDITION2' value={condition.CONDITION2} onChange={onChangeCondition}/>
        <input type='text' name='CONDITION3' value={condition.CONDITION3} onChange={onChangeCondition}/>
        <br/>
        <button onClick={search}>검색</button>
        <button onClick={main}>뒤로</button>
      </div>

      <div className={viewList ? 'visible' : 'hidden'}>
        <GridComponent ref={listRef} onClickRow={onClickRow}>
          <ColumnComponent field='FIELD1' headerText='필드1'/>
          <ColumnComponent field='FIELD2' headerText='필드2'/>
          <ColumnComponent field='FIELD3' headerText='필드3'/>
        </GridComponent>
        <br/>
        <button onClick={back}>뒤로</button>
      </div>

      <div className={viewDetail ? 'visible' : 'hidden'}>
        <DetailComponent ref={detailRef}>
          <ElementComponent field='FIELD1' headerText='필드1' edit={false} editType='text'/>
          <ElementComponent field='FIELD2' headerText='필드2' edit={false} editType='text'/>
          <ElementComponent field='FIELD3' headerText='필드3' edit={true} editType='text'/>
          <ElementComponent field='FIELD4' headerText='필드4' edit={false} editType='text'/>
          <ElementComponent field='FIELD5' headerText='필드5' edit={true} editType='text'/>
        </DetailComponent>
        <br/>
        <button onClick={goList}>뒤로</button>
        <button onClick={save}>저장</button>
      </div>
    </div>
  )
}

export default Test;