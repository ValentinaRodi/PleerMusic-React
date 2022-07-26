import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/mainPage/MainPage'
import LoginPage from './components/loginPage/LoginPage'

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="MainPage" element={<MainPage />} />
        </Routes>
      </div>
  )
}

export default App
