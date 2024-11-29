import Login from "./auth/Login"
import { ClientSignUpForm } from "./auth/ClientSignUpForm"
import Home from "./Home"
import {Routes,Route} from 'react-router-dom'
import RoleOption from "./auth/RoleOption"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/RegisterClient' element={<ClientSignUpForm />}/>
      <Route path='/RoleOption' element={<RoleOption/>} />
    </Routes>
  )
}

export default App
