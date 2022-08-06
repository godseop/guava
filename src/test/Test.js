import ListComponent from "../common/ListComponent";
import {useEffect, useRef, useState} from "react";

const Test = (props) => {

  const [viewCondition, setViewCondition] = useState(true);
  const [viewList, setViewList] = useState(false);

  const listRef = useRef(null);

  const [condition, setCondition] = useState({
    WH_CD: '',
    STRR_ID: '',
    CUST_CD: '',
  });

  const Condition = () => {

    const search = () => {
      alert(JSON.stringify(condition));
      setViewCondition(false);
      setViewList(true);
    }

    const onChangeCondition = (e) => {
      console.log(e);
      setCondition({
        ...condition,
        [e.target.name]: e.target.value,
      })
    }

    return (
      <div>
        <input type='text' name='WH_CD' value={condition.WH_CD} onChange={onChangeCondition}/>
        <input type='text' name='STRR_ID' value={condition.STRR_ID} onChange={onChangeCondition}/>
        <input type='text' name='CUST_CD' value={condition.CUST_CD} onChange={onChangeCondition}/>
        <br/>
        <button onClick={search}>검색</button>
      </div>
    )
  }

  const List = () => {

    useEffect(() => {
      listRef.current.setData([
        {
          FIELD1: 'asd',
          FIELD2: 'werw',
          FIELD3: '455',
        },
        {
          FIELD1: 'urgtg',
          FIELD2: 'jklhjg',
          FIELD3: 'ert,j',
        },
      ]);
    }, [])


    const back = () => {
      setViewCondition(true);
      setViewList(false);
    }

    return (
      <div>
        <ListComponent ref={listRef}/>
        <br/>
        <button onClick={back}>뒤로</button>
      </div>
    )
  }


  return (
    <div>
      {viewCondition && <Condition/>}
      {viewList && <List/>}
    </div>
  )
}

export default Test;