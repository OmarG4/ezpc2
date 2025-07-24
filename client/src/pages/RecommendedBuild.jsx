import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useUser } from '../components/UserContext';
import { FaRegSave } from "react-icons/fa";
import { db } from '../../firebaseconfig';
import { useState } from 'react';

const partLabels = {
  cpuPart: 'CPU',
  gpuPart: 'GPU',
  ramPart: 'RAM',
  storagePart: 'Storage',
  motherboardPart: 'Motherboard',
  powerSupplyPart: 'Power Supply',
  casePart: 'Case',
};

const RecommendedBuild = () => {
  const [saved, setSaved] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const build = location.state?.finalParts || {};
  const { user } = useUser();

  const totalPrice = Object.values(build).reduce((sum, partArr) => {
    const part = partArr?.[0];
    return part && part.price ? sum + Number(part.price) : sum;
  }, 0);

  const buildObj = {
    cpuPart: build.cpuPart?.[0] || null,
    gpuPart: build.gpuPart?.[0] || null,
    ramPart: build.ramPart?.[0] || null,
    storagePart: build.storagePart?.[0] || null,
    motherboardPart: build.motherboardPart?.[0] || null,
    powerSupplyPart: build.powerSupplyPart?.[0] || null,
    casePart: build.casePart?.[0] || null,
    totalPrice: totalPrice
  }
  
  async function fetchBuildFromFirestore() {
    const docRef = doc(db, "userBuilds", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.builds || [];
    } else {  
      console.log("No such document!");
      return [];
    }
  }

  async function saveBuildToFirestore() {
    let builds = await fetchBuildFromFirestore();
    await setDoc(doc(db, "userBuilds", user.email), {
      builds: [...builds, buildObj]
    }, { merge: true });

    setSaved(true)

    setTimeout(() => {
      setSaved(false);
    }, 1500);
  }
  
  return (
    <section className="flex flex-col items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center gap-2 pb-4 max-w-150">
        <h2 className="text-3xl font-bold">Your Recommended PC Build</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">Based on your budget and priorities, here are the best parts we found for you.</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold mb-4">Recommended Parts</h3>
          <div className="flex flex-col gap-2">
            <button className='flex justify-end cursor-pointer text-xl hover:opacity-70 transition-all' onClick={saveBuildToFirestore}>
              <FaRegSave />
            </button>
            {saved && <span className="text-green-600 text-sm">Build saved!</span>}
          </div>
        </div>
        <div className="mb-6 text-xl font-bold text-teal-700 flex justify-between items-center">
          <span>Total Price:</span>
          <span>${totalPrice.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(partLabels).map(([key, label]) => {
            const part = build[key]?.[0];
            return part ? (
              <div key={key} className="border rounded-lg p-4 flex flex-col gap-1 bg-gray-50">
                <span className="font-semibold text-teal-700">{label}</span>
                <span className="text-lg font-bold">{part.name}</span>
                <span className="text-gray-700">${part.price}</span>
                <a href={part.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 underline text-sm">View Product</a>
              </div>
            ) : (
              <div key={key} className="border rounded-lg p-4 flex flex-col gap-1 bg-gray-50 opacity-60">
                <span className="font-semibold text-teal-700">{label}</span>
                <span className="text-gray-400">No part found</span>
              </div>
            );
          })}
        </div>
        <button
          className="mt-8 border rounded-xl bg-teal-700 text-white w-full py-2 cursor-pointer hover:bg-teal-600 hover:shadow-lg hover:border-teal-500/20 transition-all"
          onClick={() => navigate(-1)}
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default RecommendedBuild;