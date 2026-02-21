import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "../src/Pages/Home.jsx";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import About from './Pages/About.jsx';

function App() {

  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
