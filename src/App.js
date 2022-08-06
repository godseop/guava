import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "./test/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
