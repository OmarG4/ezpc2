import { getDoc } from "firebase/firestore";
import { useUser } from '../components/UserContext';
import { db } from '../../firebaseconfig';
import { useState, useEffect } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";

const PreviousBuilds = () => {

    const { user } = useUser();
    const [builds, setBuilds] = useState([]);

    useEffect(() => {
        async function fetchBuildsFromFirestore() {
            if (!user?.email) return;
            const docRef = doc(db, "userBuilds", user.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setBuilds(data.builds || []);
            } else {
                console.log("No such document!");
                setBuilds([]);
            }
        }

        fetchBuildsFromFirestore();
    }, [user]);         

    const handleDeleteBuild = async (indexToDelete) => {
        if (!user?.email) return;

        const docRef = doc(db, "userBuilds", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const updatedBuilds = data.builds.filter((_, index) => index !== indexToDelete);

            await setDoc(docRef, { builds: updatedBuilds }, { merge: true });

            // Update local state to reflect the change immediately
            setBuilds(updatedBuilds);
        } else {
            console.log("No such document!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Previous Builds</h1>
            {builds.length === 0 ? (
                <p className="text-gray-500">No previous builds found.</p>
            ) : (
                <ul className="space-y-4">
                    {builds.map((build, index) => (
                        <li key={index} className="bg-white p-4 rounded shadow">
                            <div className='flex justify-between items-center mb-2'>
                                <h2 className="text-xl font-semibold mb-2">Build {index + 1}</h2>
                                <button className='cursor-pointer text-red-500 hover:text-red-700 transition-all' onClick={() => handleDeleteBuild(index)}>
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                            <ul>
                                {Object.entries(build).map(([part, details]) => (
                                    details && details.name ? (
                                        <li key={part} className="mb-1">
                                            <strong>{part}:</strong> {details.name} - ${details.price}
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                            <p className="mt-2 font-bold">Total Price: ${build.totalPrice.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PreviousBuilds;