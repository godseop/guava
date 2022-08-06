import ListComponent from "../common/ListComponent";
import {useEffect, useRef, useState} from "react";

const Test = (props) => {

  const [viewCondition, setViewCondition] = useState(true);
  const [viewList, setViewList] = useState(false);

  const listRef = useRef(null);

  const Condition = () => {

    const search = () => {
      setViewCondition(false);
      setViewList(true);
    }

    return (
      <div>
        <input type='text'/>
        <input type='text'/>
        <input type='text'/>
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