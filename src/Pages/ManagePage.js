import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { EthersContext } from '../Context/EthersContext';
import { BlockFunctions } from '../Utils/BlockFunctions';
import Loader from '../Components/Loader';
import { stringToBigInt } from "../Utils/convertions";
import InputRow from "../Components/InputRow";
import GreenDot from "../Components/GreenDot";
import RedDot from "../Components/RedDot";

function ManagePage() {
    const { id } = useParams();
    const { getIPDetails, putforSell, changeBuyingPrice, putforLend, changeLendingPrice, withdrawLend, withdrawSell, checkCurrentLendingStatus } = useContext(EthersContext)
    const [Data, setData] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [OnLend, setOnLend] = useState(false)
    const [Managers, setManagers] = useState([])
    const glassTile = "bg-yellow-100 bg-opacity-20 backdrop-blur-lg rounded-md drop-shadow-lg text-white text-center py-5 "
    const managersNormal = [
        { id: id, name: "Sell IP", fxn: putforSell, params: [{ name: "price" }], setisLoading },
        { id: id, name: "Lend IP", fxn: putforLend, params: [{ name: "price" }], setisLoading },
        { id: id, name: "Change Selling Price", fxn: changeBuyingPrice, params: [{ name: "price" }], setisLoading },
        { id: id, name: "Change Lending Price", fxn: changeLendingPrice, params: [{ name: "price" }], setisLoading },
    ]
    const managersLending = [
        { id: id, name: "Change Lending Price", fxn: changeLendingPrice, params: [{ name: "price" }], setisLoading },
        { id: id, name: "Withdraw from Lending", fxn: withdrawLend, params: [], setisLoading },
    ]
    const managersSelling=[
        { id: id, name: "Change Selling Price", fxn: changeBuyingPrice, params: [{ name: "price" }], setisLoading },
        { id: id, name: "Withdraw from Selling", fxn: withdrawSell, params: [], setisLoading },
    ]
    const managersOnLend = [
        { id: id, name: "Change Selling Price", fxn: changeBuyingPrice, params: [{ name: "price" }], setisLoading },
        { id: id, name: "Change Lending Price", fxn: changeLendingPrice, params: [{ name: "price" }], setisLoading },
    ]
    const intiator = async () => {
        setisLoading(true)
        const ip = await getIPDetails(id);
        const data = await BlockFunctions.getIPData(ip)
        const onlend = await checkCurrentLendingStatus(id);
        if (onlend) setManagers(managersOnLend)
        else if (data?.selling)
            setManagers(managersSelling)
        else if (data?.lending) 
            setManagers(managersLending)
        else setManagers(managersNormal)
        setData(data)
        setOnLend(onlend)
        setisLoading(false)
    }
    useEffect(() => {
        intiator()
    }, [])

    return isLoading ? <div className='gradient-bg-welcome'><Loader /></div> :
        (
            <div className='gradient-bg-welcome'>
                <h1 className='text-center text-white text-5xl py-5'>{Data && Data.name}</h1>
                <div className='flex w-full justify-between px-64'>
                    <div className={`${glassTile} w-80`}>
                        <div className="w-full text-center text-2xl mb-12">Status</div>
                        <table className=''>
                            <tbody>
                                <tr>
                                    <td className="w-40 py-3 ">Selling Market</td>
                                    <td>:</td>
                                    <td className="w-40">
                                        {(Data && Data.selling) ?
                                            <div className='flex font-medium'><GreenDot />Active</div> :
                                            <div className='flex font-medium'><RedDot />Not Active</div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-40 py-3">Lending Market</td>
                                    <td>:</td>
                                    <td className="w-40">
                                        {(Data && Data.lending) ?
                                            <div className='flex font-medium'><GreenDot />Active</div> :
                                            <div className='flex font-medium'><RedDot />Not Active</div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-40 py-3">On Lend</td>
                                    <td>:</td>
                                    <td className="w-40">
                                        {(OnLend) ?
                                            <div className='flex font-medium'><GreenDot />Active</div> :
                                            <div className='flex font-medium'><RedDot />Not Active</div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-40 py-3">Selling price</td>
                                    <td>:</td>
                                    <td className="w-40">{Data && Data.sellingPrice} M</td>
                                </tr>
                                <tr>
                                    <td className="w-40 py-3">Lending Price</td>
                                    <td>:</td>
                                    <td className="w-40">{Data && Data.lendingPrice} M</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <table>
                        <tbody>
                            {
                                Managers.map((manager, index) => (<InputRow details={manager} key={index} />))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
}

export default ManagePage