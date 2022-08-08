import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import DetailComponent from "../common/DetailComponent";
import GridComponent from "../common/GridComponent";
import ColumnComponent from "../common/ColumnComponent";

const Test = () => {

  const [condition, setCondition] = useState({
    CONDITION1: '',
    CONDITION2: '',
    CONDITION3: '',
  });

  const [viewCondition, setViewCondition] = useState(true);
  const [viewList, setViewList] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);

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
        FIELD1: 'asd',
        FIELD2: 'ㅈㄷㅈㄷㄹ',
        FIELD3: '455',
      },
      {
        FIELD1: 'qoiefjdl',
        FIELD2: '123',
        FIELD3: 'ert,j',
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

  const onSelect = (e) => {
    setViewList(false);
    setViewDetail(true);

    detailRef.current.setData({
        FIELD1: 'asd',
        FIELD2: 'ㅈㄷㅈㄷㄹ',
        FIELD3: '455',
        FIELD4: 'ㅅㄹㅎㅎ',
        FIELD5: 'sldkfjlskdjf',
    });
  }

  const save = () => {

  }

  return (
    <div>
      <div className={viewCondition ? 'visible' : 'hidden'}>
        <input type='text' name='WH_CD' value={condition.WH_CD} onChange={onChangeCondition} />
        <input type='text' name='STRR_ID' value={condition.STRR_ID} onChange={onChangeCondition}/>
        <input type='text' name='CUST_CD' value={condition.CUST_CD} onChange={onChangeCondition}/>
        <br/>
        <button onClick={search}>검색</button>
        <button onClick={main}>뒤로</button>
      </div>

      <div className={viewList ? 'visible' : 'hidden'}>
        <GridComponent ref={listRef} onSelect={onSelect}>
          <ColumnComponent field='' headerText=''/>
          <ColumnComponent field='' headerText=''/>
          <ColumnComponent field='' headerText=''/>
        </GridComponent>
        <br/>
        <button onClick={back}>뒤로</button>
      </div>

      <div className={viewDetail ? 'visible' : 'hidden'}>
        <DetailComponent ref={detailRef}/>
        <br/>
        <button onClick={back}>뒤로</button>
        <button onClick={save}>저장</button>
      </div>
    </div>
  )
}

export default Test;