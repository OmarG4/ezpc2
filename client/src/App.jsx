import "./index.css";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecommendedBuild from './pages/RecommendedBuild';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 py-8 bg-gray-50'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommended" element={<RecommendedBuild />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
