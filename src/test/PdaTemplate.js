import {useRef, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import GridComponent from "../common/GridComponent";
import DetailComponent from "../common/DetailComponent";
import one from "../common/one";
import ColumnComponent from "../common/ColumnComponent";
import ElementComponent from "../common/ElementComponent";
import PopupComponent from "../common/PopupComponent";
import DatePicker from "react-datepicker";
import { ko, enUS } from "date-fns/esm/locale";
import ComboBox from "../common/ComboBox";

/**
 * 템플릿
 */
const locale = localStorage.getItem('langCd') === 'KO' ? ko : enUS;

const PdaTemplate = () => {

  const [condition, setCondition] = useState({
    WH_CD: '',
    CUST_CD: '',
    STRR_ID: '',
    START_DATE: '',
    END_DATE: '',
    TEMP_TCD: '',
  });

  const [viewCondition, setViewCondition] = useState(true);
  const [viewList, setViewList] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);

  const [popupProps, setPopupProps] = useState({});
  const [pageProps, setPageProps] = useState({
    CURRENT_PAGE: 1,
    TOTAL_PAGE: 13,
  });

  const OPTIONS = [
    { value: "apple", name: "사과" },
    { value: "banana", name: "바나나" },
    { value: "orange", name: "오렌지" },
  ];

  const listRef = useRef(null);
  const detailRef = useRef(null);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  const openPopup = () => {
    setViewPopup(true);
  }

  const closePopup = (object) => {
    setViewPopup(false);
  }

  const goCondition = () => {
    setViewCondition(true);
    setViewList(false);
    setViewDetail(false);
  }

  const goList = () => {
    setViewCondition(false);
    setViewList(true);
    setViewDetail(false);
  }


  const goDetail = () => {
    setViewCondition(false);
    setViewList(false);
    setViewDetail(true);
  }

  const onChangeCondition = (e) => {
    console.log(e);
    setCondition({
      ...condition,
      [e.target.name]: e.target.value,
    })
  }


  const prev = () => {
    if (pageProps.CURRENT_PAGE <= 1)
      return;

    setPageProps({
      ...pageProps,
      CURRENT_PAGE: pageProps.CURRENT_PAGE - 1,
    });
  }

  const next = () => {
    if (pageProps.CURRENT_PAGE >= pageProps.TOTAL_PAGE)
      return;

    setPageProps({
      ...pageProps,
      CURRENT_PAGE: pageProps.CURRENT_PAGE + 1,
    });
  }


  const search = () => {
    console.log("조회조건", condition);
    listRef.current.setData([
      {
        STRR_ID: 'HELLO',
        WH_CD: 'DC01',
        CUST_CD: 'WORLD',
      },
      {
        WH_CD: 'DC02',
        STRR_ID: 'HELL',
        CUST_CD: 'WRLD',
      },
      {
        CUST_CD: '123',
        WH_CD: '456',
        STRR_ID: '789',
      },
    ]);

    goList();
  }


  const saveDetail = () => {
    console.log(detailRef.current.getDetailData());
  }

  const onClickRow = (args) => {
    detailRef.current.setDetailData({
      ...args,
      HAHA: 'sdfsdf',
      HOHO: 'aa',
      SHIT: '1234',
    });

    goDetail();
  }

 return (
   <div>

     {/*조회조건 영역*/}
     <div className={viewCondition ? 'visible' : 'hidden'}>
       <h1>조회조건</h1>
       <table>
         <thead></thead>
         <tbody>
         <tr>
           <th>
             조회조건1
           </th>
           <td>
             <input type='text'
                    value={condition.WH_CD}
                    onChange={(e) => setCondition({...condition, WH_CD: e.target.value})}/>
           </td>
         </tr>
         <tr>
           <th>
             시작일
           </th>
           <td>
             <DatePicker selected={condition.START_DATE}
                         dateFormat="yyyy.MM.dd"
                         maxDate={condition.END_DATE}
                         onChange={(date) => setCondition({...condition, START_DATE: date})}
                         isClearable
                         locale={locale}/>
           </td>
         </tr>
         <tr>
           <th>
             종료일
           </th>
           <td>
             <DatePicker selected={condition.END_DATE}
                         dateFormat="yyyy.MM.dd"
                         minDate={condition.START_DATE}
                         onChange={(date) => setCondition({...condition, END_DATE: date})}/>
           </td>
         </tr>
         <tr>
           <th>조회조건2</th>
           <td>
             <input type='text'
                    value={condition.STRR_ID}
                    onChange={(e) => setCondition({...condition, STRR_ID: e.target.value})}/>
           </td>
         </tr>
         <tr>
           <th>
             조회조건3
           </th>
           <td>
             <ComboBox value={condition.TEMP_TCD}
                       defaultValue={'orange'}
                       dataSource={OPTIONS}
                       onChange={(e) => setCondition({...condition, TEMP_TCD: e.target.value})}/>
           </td>
         </tr>
         </tbody>
       </table>
       <br/>
       <button onClick={search}>조회</button>
       <button onClick={goBack}>뒤로</button>
       <button onClick={openPopup}>팝업</button>
     </div>

     {/*그리드 영역*/}
     <div className={viewList ? 'visible' : 'hidden'}>
       <h1>그리드</h1>
       <GridComponent ref={listRef} onClickRow={onClickRow}>
         <ColumnComponent field='CUST_CD' headerText={one.lang('CUST_CD')}/>
         <ColumnComponent field='WH_CD' headerText={one.lang('WH_CD')}/>
         <ColumnComponent field='STRR_ID' headerText={one.lang('STRR_ID')}/>
       </GridComponent>
       <button onClick={prev}>◀</button>
       <span>{pageProps.CURRENT_PAGE}/{pageProps.TOTAL_PAGE}</span>
       <button onClick={next}>▶</button>
       <button onClick={goCondition}>뒤로</button>
     </div>

     {/*상세 영역*/}
     <div className={viewDetail ? 'visible' : 'hidden'}>
       <h1>상세</h1>
       <DetailComponent ref={detailRef}>
         <ElementComponent field='WH_CD' headerText={'몰라1'} edit={false} editType='text'/>
         <ElementComponent field='STRR_ID' headerText={'몰라3'} edit={false} editType='text'/>
         <ElementComponent field='CUST_CD' headerText={'몰라2'} edit={true} editType='text'/>
         <ElementComponent field='HAHA' headerText={'몰라4'} edit={false} editType='text'/>
         <ElementComponent field='HOHO' headerText={'몰라5'} edit={true} editType='text'/>
       </DetailComponent>
       <br/>
       <button onClick={saveDetail}>저장</button>
       <button onClick={goList}>뒤로</button>
     </div>

     {/*팝업 영역*/}
     {/*<div className={viewPopup ? 'visible' : 'hidden'}>*/}
     {/*  <button onClick={closePopup}>뒤로</button>*/}
     {/*</div>*/}
     {viewPopup && <PopupComponent param={popupProps} onClosePopup={closePopup}/>}

   </div>
  );

}

export default withRouter(PdaTemplate);