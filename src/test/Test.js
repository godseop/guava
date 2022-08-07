import ListComponent from "../common/ListComponent";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Test = (props) => {

  const [viewCondition, setViewCondition] = useState(true);
  const [viewList, setViewList] = useState(false);

  const listRef = useRef(null);

  const navigate = useNavigate();

  const [condition, setCondition] = useState({
    WH_CD: '',
    STRR_ID: '',
    CUST_CD: '',
  });

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
        <ListComponent ref={listRef}/>
        <br/>
        <button onClick={back}>뒤로</button>
      </div>
    </div>
  )
}

export default Test;