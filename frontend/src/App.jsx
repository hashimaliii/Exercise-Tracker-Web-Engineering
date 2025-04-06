import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Singup from './pages/auth/Singup'
import UserDashboard from './pages/user/UserDashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Singup />}></Route>
        <Route path='/user/dashboard' element={<UserDashboard />}></Route>
      </Routes>
    </Router>
  )
}

export default App
