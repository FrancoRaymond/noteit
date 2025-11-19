import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import NoteDetail from "./pages/NoteDetail"

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/create' element={ <CreateNote /> } />
        <Route path='/note/:id' element={ <NoteDetail /> } />
        <Route path='*' element={<Home /> } />
      </Routes>
    </div>
  )
}

export default App
