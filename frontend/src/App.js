import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Newsapp from './Components/Newsapp';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';


function App() {
  return (
    <div className="App">
      
    <Router>
    <Routes>
    <Route path = "/" element = {<Newsapp/>} />
    <Route path = "/login" element = {<Login/>} />
    <Route path = "/register" element = {<Register/>} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;

