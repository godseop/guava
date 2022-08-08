import React, {useState} from 'react';
import one from "./one";


const PopupComponent = (props) => {

  const [dataSource, setDataSource] = useState([]);

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
        <tr>
          <td>값1</td>
        </tr>
        <tr>
          <td>값2</td>
        </tr>
        <tr>
          <td>값3</td>
        </tr>
        <tr>
          <td>값4</td>
        </tr>
        </tbody>
      </table>
      <button onClick={props.onClosePopup}>뒤로</button>
    </div>
  );
}

export default PopupComponent;
