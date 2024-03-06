import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Send } from './pages/Send'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path={'/signin'}/>
        <Route element={<Signup />} path={'/signup'}/>
        <Route element={<Dashboard />} path={'/dashboard'}/>
        <Route element={<Send />} path={'/send'}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
