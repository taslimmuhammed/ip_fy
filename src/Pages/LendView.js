import { MediaRenderer } from '@thirdweb-dev/react';
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EthersContext } from '../Context/EthersContext';
import { BlockFunctions } from '../Utils/BlockFunctions';
import Loader from '../Components/Loader';

function LendView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getIPDetails } = useContext(EthersContext)
    const [isLoading, setisLoading] = useState(false)
    const [Data, setData] = useState(null)
    const intiator = async () => {
        setisLoading(true)
        const ip = await getIPDetails(id);
        console.log({ ip });
        const data = await BlockFunctions.getIPData(ip)
        console.log({ data });
        setData(data)
        setisLoading(false)
    }
    useEffect(() => {
        intiator()
    }, [])
    //styles
    const labelFont = "text-md text-amber-200"
    const itemFont = "inline-block text-sm"
    const glassTile = "bg-yellow-100 bg-opacity-20 backdrop-blur-lg rounded-md drop-shadow-lg text-white text-center py-5 "
    return isLoading ? <div className='gradient-bg-welcome'><Loader /></div> :
        (
            <div className='gradient-bg-welcome'>
                <h1 className='text-center text-white text-5xl py-5'>{Data && Data.name}</h1>
                {/* Details part */}
                <div className='flex w-full justify-center'>
                    <div>
                        {/* first layer */}
                        <div className='flex'>
                            <div className={`${glassTile} w-64  mx-3`}>
                                <div className={labelFont}>Creator</div>
                                <div className={itemFont}>{Data && Data.creator}</div>
                            </div>
                            <div className={`${glassTile} w-96  mx-3 px-4`}>
                                <div className={labelFont}>Current Owner </div>
                                <div className={itemFont}>{Data && Data.currentOwner}</div>
                            </div>
                            <div className={`${glassTile} w-64  mx-3`}>
                                <div className={labelFont}>Created on</div>
                                <div className={itemFont}>{Data && Data.date}</div>
                            </div>
                        </div>
                        {/*  second layer */}
                        <div className='flex my-10'>
                            <div className={`${glassTile} w-64  mx-3`}>
                                <div className={labelFont}>Market Activity</div>
                                <div className='flex  text-center ml-12 mt-3'>
                                    <div className='mr-10'>Selling</div>
                                    {(Data && Data.selling) ?
                                        <div className='text-green-700 font-medium'>Active</div> :
                                        <div className='text-red-700 font-medium'>Not Active</div>
                                    }

                                </div>
                                <div className='flex  text-center ml-12 mt-2'>
                                    <div className='mr-7 '>Lending</div>
                                    {(Data && Data.lending) ?
                                        <div className='text-green-700 font-medium'>Active</div> :
                                        <div className='text-red-700 font-medium'>Not Active</div>
                                    }
                                </div>
                            </div>
                            <div className={`${glassTile} w-96  mx-3 px-4`}>
                                <div className={labelFont}>Description </div>
                                <div className={itemFont}>{Data && Data.descreption}</div>
                            </div>
                            <div className={`${glassTile} w-64  mx-3`}>
                                <div className={labelFont}>Market Price</div>
                                <div className='flex  text-center ml-10 mt-3'>
                                    <div className='mr-10'>Selling Price</div>
                                    <div className='text-green-700 font-medium'>{Data && Data.sellingPrice} M</div>
                                </div>
                                <div className='flex  text-center ml-10 mt-2'>
                                    <div className='mr-7'>Lending Price</div>
                                    <div className='text-green-700 font-medium'>{Data && Data.lendingPrice} M</div>
                                </div>
                            </div>
                        </div>
                        <div className=' w-full flex justify-evenly mt-20'>
                            <Button variant='warning' onClick={() => navigate(`/${id}/files`)}><div className='text-xl text-white w-40'>View Files</div></Button>
                            <Button variant='warning' onClick={() => navigate(`/you/${id}/manage`)}><div className='text-xl text-white w-40'>Manage Market</div></Button>
                            <Button variant='warning' onClick={() => navigate(`/${id}/history`)}><div className='text-xl text-white w-40'>View History</div></Button>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default LendView;