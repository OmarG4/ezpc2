import {useState, useEffect} from 'react';
import { GoCpu } from "react-icons/go";
import { CgPullClear } from "react-icons/cg";
import { FaScaleBalanced } from "react-icons/fa6";
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [priority, setPriority] = useState({
        name: 'Balanced',
        cpu: 0.22,
        gpu: 0.33,
        ram: 0.09,
        storage: 0.12,
        motherboard: 0.12,
        powerSupply: 0.07,
        pcCase: 0.05,
    });
    const [budget, setBudget] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [finalPartPrice, setFinalPartPrice] = useState({});
    const navigate = useNavigate();

    const options = [
        { label: 'Balanced', icon: <FaScaleBalanced /> },
        { label: 'GPU Focus', icon: <CgPullClear /> },
        { label: 'CPU Focus', icon: <GoCpu /> }
      ];

    useEffect(() => {
        if (priority.name) {
            const calculatedParts = calculateValue(priority, budget);
            setFinalPartPrice(calculatedParts);
            console.log(calculatedParts)
        }
    }, [priority, budget]);

    const calculateValue = (priorityObj, budgetValue) => {
        const { cpu, gpu, ram, storage, motherboard, powerSupply, pcCase } = priorityObj;
        const budgets = {
            cpu: budgetValue * cpu,
            gpu: budgetValue * gpu,
            ram: budgetValue * ram,
            storage: budgetValue * storage,
            motherboard: budgetValue * motherboard,
            powerSupply: budgetValue * powerSupply,
            pcCase: budgetValue * pcCase
        };
        return budgets;
    };

    const handleClick = (label) => {
        if (label === 'GPU Focus') {
            setPriority({
                name: 'GPU Focus',
                cpu: 0.25,
                gpu: 0.4,
                ram: 0.1,
                storage: 0.1,
                motherboard: 0.08,
                powerSupply: 0.04,
                pcCase: 0.03,
            }); 
        } else if (label === 'CPU Focus') {
            setPriority({   
                name: 'CPU Focus',
                cpu: 0.4,
                gpu: 0.15,
                ram: 0.12,
                storage: 0.1,
                motherboard: 0.1,
                powerSupply: 0.08,
                pcCase: 0.05,
            });
        }  
    }

    const handleSubmit = async (e) => {
        console.log(finalPartPrice);
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/get-parts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ finalPartPrice })
            })
            if (response.ok) {
                const data = await response.json();
                navigate('./recommended', { state: data })
                console.log(data);
            
            } else {
                console.error('Error:', response.statusText);
            }
        } catch(e){
            console.log(e)
        }

        setIsLoading(false);
    }

    return (
        <section className="flex flex-col items-center justify-center py-6">

            <div className="flex flex-col items-center justify-center gap-4 pb-6 max-w-150">
                <h2 className="text-3xl font-bold">Find Your Perfect PC Build</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-center">Tell us your budget and priorities, and we'll recommend the optimal components to maximize performance.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Build Your PC</h3>
                
                <form onSubmit={handleSubmit}>

                    <div className="flex flex-col mb-6">
                        <label htmlFor='budget' className="font-medium">Your Budget</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                            <input
                                required
                                type="number"
                                id="budget"
                                name="budget"
                                placeholder="Enter your budget"
                                min="500"
                                max="10000"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                autoComplete='off'
                                className="border rounded-md pl-7 pr-3 py-2 focus:border-teal-600 w-full"
                            />

                        </div>
                        <p className="text-xs text-gray-500">Enter budget between $500 and $10,000</p>
                    </div>

                    <h3 className='mb-1 font-semibold'>Build Priority</h3>
                    <div className="flex justify-center items-center gap-4 mb-8">
                        {options.map(({ label, icon }) => (
                            <button
                                key={label}
                                type='button'
                                onClick={() => handleClick(label)}
                                className={`flex flex-col justify-center items-center border rounded-lg min-h-21 max-w-25 px-6 py-1 cursor-pointer
                                            ${priority.name === label ? 'bg-teal-100 border-3 border-teal-600' : 'hover:bg-gray-100'}`}
                            >
                                <span className='text-xl'>{icon}</span>
                                {label}
                            </button>
                        ))}
                    </div>

                    <button type='submit' className="border rounded-xl bg-teal-700 text-white w-full py-2 cursor-pointer hover:bg-teal-600 hover:shadow-lg hover:border-teal-500/20 transition-all">
                        Generate Build
                    </button>
                </form>
            </div>
            
            {isLoading && <Loading />}
        </section>
    );
}

export default Home;