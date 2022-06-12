import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 

import Home from './components/Home'
import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/messages" element = {<Messages/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
