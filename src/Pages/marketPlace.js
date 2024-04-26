import NFTproduct from "../Components/NFTproduct";
import { EthersContext } from "../Context/EthersContext";
import React, {useContext, useEffect, useState} from 'react'

import '../Styles/marketplace.css'
const MarketPlace = () => {
    const {}= useContext(EthersContext)
    const [arr, setarr] = useState([])
    const initiator = async()=>{
    } 
   useEffect(() => {
     initiator()
   }, [])
   
    // let arr=[{name:"CYCLE",inventor:"zaeem",licensee:"amaal",timestamp:"9:30 10/12/2022",id:"123456676779"},{name:"CAMERA",inventor:"zaeem",licensee:"amaal",timestamp:"9:30 10/12/2022",id:"12345656565656"},{name:"TRUCK",inventor:"zaeem",licensee:"amaal",timestamp:"9:30 10/12/2022",id:"1234567222"},{name:"JCB",inventor:"zaeem",licensee:"amaal",timestamp:"9:30 10/12/2022",id:"123456"}]
    return (
        <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
            
        </div>

    );
}
 
export default MarketPlace;