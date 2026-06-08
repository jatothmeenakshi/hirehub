import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App(){
 return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/jobs" element={<Jobs/>}/>
    <Route path="/jobs/:id" element={<JobDetail/>}/>
    <Route path="/dashboard"element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
 )
}
export default App