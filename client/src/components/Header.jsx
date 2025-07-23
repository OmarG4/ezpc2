import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';

export const Header = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  const { user } = useUser();
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

        {user ? (
          <div className='flex items-center gap-4'>
            <span className='text-lg font-semibold'>Welcome, {user.email}</span>
            <button
              className='bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all cursor-pointer'
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
          ) : (
          <div className='flex flex-col items-center gap-4'>
            <button
              className='bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all cursor-pointer'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>

            <button
              className='bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  )
}