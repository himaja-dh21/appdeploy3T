
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import TopNav from './components/TopNav';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/tasks' element={<Tasks/>}></Route>
        <Route path='/leaves' element={<Leaves/>}></Route>
        <Route path='/topNav' element={<TopNav/>}></Route>
        <Route path='/editProfile' element={<EditProfile/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
