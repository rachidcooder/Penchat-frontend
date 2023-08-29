import { Route,Routes,BrowserRouter} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/login'
import Chat from './Pages/Chat'

function App() {


  return (
    <div className='h-screen w-screen bg-slate-100'>
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<Register/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
