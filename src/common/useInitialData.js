import {useCallback, useEffect, useState} from "react";
import axios from "axios";


const useInitialData = (requests) => {

  const [state, setState] = useState({
    obj: {},
    cnt: 0,
  });

  useEffect(() => {
    requests.forEach(request => {
      const response = axios.post(
        request.url,
        request.condition,
      );
    });
  }, []);


  useCallback(() => {

  }, [state, requests.length]);

  const isComplete = () => {
    return state.cnt === requests.length
  }

  return {
    initialData: state.obj,
    isInitialized: isComplete(),
  };
}

export default useInitialData;