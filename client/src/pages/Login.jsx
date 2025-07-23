import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from '../../firebaseconfig';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setErrorMessage('No account found with this email.');
                    break;
                case 'auth/wrong-password':
                    setErrorMessage('Incorrect password. Please try again.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('Please enter a valid email.');
                    break;
                default:
                    setErrorMessage('Login failed. Please try again.');
            }
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-600"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
