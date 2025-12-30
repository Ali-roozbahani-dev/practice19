import './App.css'
import Login from './components/pages/login/Login'
import { Routes,Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Register from './components/pages/register/Register'
import Dashbord from './components/pages/dashbord/Dashbord'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/dashbord' element={<Dashbord />}></Route>
      </Routes>     
    </BrowserRouter>
  )
}

export default App
