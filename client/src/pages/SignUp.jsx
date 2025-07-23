import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from '../../firebaseconfig';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            // Firebase error codes: https://firebase.google.com/docs/auth/admin/errors
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('This email is already in use.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('Please enter a valid email.');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('Password should be at least 6 characters.');
                    break;
                default:
                    setErrorMessage('Something went wrong. Please try again.');
            }
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
