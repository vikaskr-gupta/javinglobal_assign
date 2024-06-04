import './App.css';
import Login from './components/Login';
import Employee from './components/Employee';
import Add from './components/Add';
import Edit from './components/Edit';
import {Routes, Route} from 'react-router-dom';  

function App() {

  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/employee" element={<Employee/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/edit/:id" element={<Edit/>} />
       </Routes>
    </div>
  );
}

export default App;