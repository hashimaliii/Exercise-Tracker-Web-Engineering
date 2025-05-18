import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import UserDashboard from './pages/user/UserDashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/user/dashboard' element={<UserDashboard />}></Route>
      </Routes>
    </Router>
  )
}

export default App
