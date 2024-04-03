import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import DetaiPage from './pages/Detail'
import SearchPage from './pages/Search'
import Header from './components/Header/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies/:movieId' element={<DetaiPage />} />
        <Route path='/movies/search/:searchcode' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
