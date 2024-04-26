import React, { useState, useContext, useEffect } from "react"
import { toast } from 'react-toastify';
import { EthersContext } from "../Context/EthersContext";
import { useNavigate } from 'react-router-dom';

import Loader from "./Loader";
const BuyingPopup = ({ trigger, setTrigger, id ,price}) => {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const { buy } = useContext(EthersContext)
    const handleClose = () => {
        setTrigger(false);
    };
    const handleSubmit = async () => {
        setisLoading(true)
        try {
            await buy(id,price)
            toast.success("Lending succeful")
            navigate("/you")
        } catch (error) {
            toast.error(error?.reason);
            console.log(error);
        }
        setisLoading(false)
    }
    return trigger ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
            {isLoading ? <Loader /> : <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={handleClose}>
                    Close
                </button>
                <h2 className="text-xl font-bold mb-4">Confirm Buying</h2>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full mb-2"
                    onClick={handleSubmit}
                >
                    Buy
                </button>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded w-full"
                    onClick={handleClose}
                >
                    Cancel
                </button>
            </div>}
        </div>
    ) : (
        ''
    );
};

export default BuyingPopup;
