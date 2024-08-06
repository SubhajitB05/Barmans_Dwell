import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
// import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigationbar from './components/Navigationbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <>
    <BrowserRouter>
      <Navigationbar/>
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={2500}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/users/auth/register' element={<Register/>}/>
        <Route path='/users/auth/login' element={<Login/>}/>
        <Route path='/users/dashboard' element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
