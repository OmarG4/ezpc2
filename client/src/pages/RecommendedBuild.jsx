import { useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const navigate = useNavigate();
  const build = location.state?.finalParts || {};

  // Calculate total price
  const totalPrice = Object.values(build).reduce((sum, partArr) => {
    const part = partArr?.[0];
    return part && part.price ? sum + Number(part.price) : sum;
  }, 0);

  return (
    <section className="flex flex-col items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center gap-2 pb-4 max-w-150">
        <h2 className="text-3xl font-bold">Your Recommended PC Build</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">Based on your budget and priorities, here are the best parts we found for you.</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">Recommended Parts</h3>
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