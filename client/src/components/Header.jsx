import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

export const Header = () => {

  const navigate = useNavigate();

  return (
    <header id='header' className='w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white shadow-md border-b border-white/10 py-4'>
        <div className='max-w-7xl mx-auto px-12 py-4 flex items-center justify-between'>

          <div>
              <div className='flex items-center gap-4'>
                  <Link to='/'><img src='./cpu.png' alt='logo'className='w-8 h-8' /></Link>
                  <h1 className='text-4xl text-[#EEEEEE] font-bold'>EzPc</h1>
              </div>

              <p className='text-teal-200'>Get optimized PC builds based on your budget and preferences</p>
          </div>

          <div className='flex flex-col items-center gap-4'>
            <button 
              className='bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>

            <button 
              className='bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all'
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
          </div>

      </div>
    </header>
  )
}