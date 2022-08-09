import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { withRouter } from 'react-router-dom';
import BugerMenu from "./common/BurgerMenu";
import one from "../web/common/one";

import "react-datepicker/dist/react-datepicker.css";
import './styles/App.css';
import "./styles/common.css";
import "./styles/main.css";

/*
 * Loader는 반드시 Root 폴더에 위치해함
 * webpack에서 하위 폴더의 리소스 map 생성. 동적 import시 map정보 참조하여 컴포넌트 로딩 가능.
 */
const PdaLoader = (props) => {
  const cmptPath = props.history.location.pathname.replace('/pda', '.');
  const lastView = localStorage.getItem('lastView');
  let menucode;
  let ActiveScreen;

  if  (props.history.location.pathname === '/') {
    if (one.isEmpty(lastView)) {
      ActiveScreen = () => {return (<div></div>)};
    } else {
      props.history.push('/pda/' + lastView);
    }
  } else {
    const url = new URL(window.location);
    menucode = url.searchParams.get('menucode');
    ActiveScreen = React.lazy(() => import(`${cmptPath}.js`));
  }

  const [menuList, setMenuList] = React.useState();
  const [menuTitle, setMenuTitle] = React.useState();
  const sidebarObj = React.useRef();
  const messageBar = React.useRef();

  function setScreenId(str) {
    let screenId;
    let lastView;
    if (!one.isEmpty(str) && str.indexOf('/') > -1) {
      const a = str.split('?')[0].split('/');
      screenId =  a[a.length - 1];
      lastView = str;
    } else {
      screenId = '';
      lastView = '';
    }

    localStorage.setItem('screenId', screenId);
    localStorage.setItem('lastView', lastView);
  }

  React.useEffect(() => {
    const dataManager = one.createDataManger({
      queryId: '/admMenu/getMenuInfo '
    });
    dataManager.executeQuery(
      one.getQuery({menucode: menucode, pdayn: 'Y'}),
      (res) => {
        done(res);
      },
      (res) => {
        fail(res);
      },
    ).then(() => {

    });

    function done(res) {
      if (res.result.length < 1) {
        one.alertMsg('NO_DATA_FOUND', "조회 결과가 없습니다.");
        setScreenId('');
      } else {
        const data = res.result;

        data.forEach(item => {
          if (item.LEAFYN === 'Y') {
            item.hasChild = false;
          } else {
            item.hasChild = true;
          }
        });

        setMenuTitle(data[0].MENUNAME_LANG);
        setMenuList(data);
        setScreenId(props.history.location.pathname);
      }
    }

    function fail(res) {
      // Fail callback
      console.log("/admMenu/getMenuInfo : fail");
    }
  }, [props.history.location.search]);

  const getMessage= (m) => {
    messageBar.current.alertMessage(m);
  }

  const ErrorFallback = ({error}) => {
    localStorage.setItem('lastView', '');
    one.alertMsg('', '잘못된 URL입니다.');

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{color: 'red'}}>{error.message}</pre>
      </div>
    )
  }

  return (
    <div id="wrap">
      <header id="header">
        <BugerMenu pageWrapId={"page-wrap"} outerContainerId={"wrap"} menuItem={menuList}/>
        <div id="page-wrap">
          <h1>{menuTitle ? menuTitle: '화면명'}</h1>
        </div>
      </header>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ActiveScreen sendMessage={getMessage}/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default withRouter(PdaLoader);
