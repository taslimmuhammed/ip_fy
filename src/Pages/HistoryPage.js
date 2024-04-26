import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { EthersContext } from '../Context/EthersContext';
import { BlockFunctions } from '../Utils/BlockFunctions';
import Loader from '../Components/Loader';
import HistoryBox from "../Components/HistoryBox";

function HistoryPage() {
  const { id } = useParams();
  const { getIPDetails } = useContext(EthersContext)
  const [Data, setData] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const intiator = async () => {
    setisLoading(true)
    const ip = await getIPDetails(id);
    const data = await BlockFunctions.getHistory(ip)
    setData(data)
    setisLoading(false)
  }
  useEffect(() => {
    intiator()
  }, [])
  return isLoading ? <Loader /> :
    (
      <div className='gradient-bg-welcome'>
        <h1 className='text-center text-white text-5xl py-5'>{Data && Data.name}</h1>
        <div className='flex w-full justify-evenly'>
          <div>
            <h2 className="text-xl text-white text-center">Owning History</h2>
            <div className='h_main'>
              <div className="timeline">
                <div className="outer">
                  {
                    Data?.owningHistory ?  Data.owningHistory.map((item, index) => (
                      <HistoryBox key={index} wallet={item.wallet} from={item.start} to={item.end}/>
                    )) : null
                  }
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl text-white text-center">Lending History</h2>
            <div className='h_main'>
              <div className="timeline">
                <div className="outer">
                  {
                    Data?.lendingHistory ? Data.lendingHistory.map((item, index) => (
                      <HistoryBox key={index} wallet={item.wallet} from={item.start} to={item.end} />
                    )) : <div className="text-orange-400"> No data available</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HistoryPage