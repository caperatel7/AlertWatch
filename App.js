import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './components/Login';
import Landing from './components/Landing';

function App() {

  return (
    <div className="App">
       <h5>neeew </h5>
      <Router>
   
        <Routes>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Landing" element={<Landing/>}/>
          
        
        </Routes>
    </Router>

    </div>
  );
}

export default App;