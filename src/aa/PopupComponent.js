import React, {useState} from 'react';


const PopupComponent = (props) => {

  const [dataSource, setDataSource] = useState([
    {
      VALUE1: 'A',
    },
    {
      VALUE1: 'B',
    },
    {
      VALUE1: 'C',
    },
  ]);

  // 팝업 옵션
  const [popupOption, setPopupOption] = useState({
    title: '',           // 팝업타이틀
    queryId: '',         // 쿼리아이디
    condition: {},       // 기본 조회조건
  });



  return (
    <div>
      <table>
        <thead>
          <th>셀</th>
        </thead>
        <tbody>
        {
          dataSource.map((data) => {
            return (
              <tr onClick={(e) => { props.onClosePopup(data)}}>
                <td>{data.VALUE1}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
      <button onClick={props.onClosePopup}>뒤로</button>
    </div>
  );
}

export default PopupComponent;
