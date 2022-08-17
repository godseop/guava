import {useCallback, useEffect, useState} from "react";


const useInitialData = (requests) => {

  const [state, setState] = useState({
    obj: {},
    cnt: 0,
  });

  useEffect(() => {

  }, []);


  useCallback(() => {

  }, [state, requests.length]);

  const isComplete = () => {

  }

  const callRequest = async (requests) => {


  }
}

export default useInitialData;