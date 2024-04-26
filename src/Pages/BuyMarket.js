import Button from 'react-bootstrap/Button';
import React, { useState, useContext, useEffect } from "react"
import { shortenAddress } from '../Utils/ShortenAddress';
import { BigNoToDC, BigNoToInt, shortenDesc, shortenName } from '../Utils/convertions';
import { EthersContext } from "../Context/EthersContext";
import { Link, useNavigate } from 'react-router-dom';
import { BlockFunctions } from '../Utils/BlockFunctions';

function BuyMarket() {
  const navigate = useNavigate()
  const { getBuyingMarket } = useContext(EthersContext)
  const [IPs, setIPs] = useState([])
  const intiator = async () => {
    const ipList = await getBuyingMarket();
    let ips = []
    if (ipList.length > 0)
      for (let i = 0; i < ipList.length; i++) {
        ips.push(await BlockFunctions.getIPData(ipList[i]))
      }
    setIPs(ips)
  }
  useEffect(() => {
    intiator()
  }, [])

  return (
    <div className="gradient-bg-welcome ">
      <h1 className='text-center text-white text-5xl py-5'>Buying Market</h1>
      <div className="flex w-full justify-center">
        <div>
          {/*table heading */}
          <div className='flex text-xl bg-yellow-100 bg-opacity-30 backdrop-blur-lg rounded drop-shadow-lg mr-5 mb-3 text-white px-4  text-center'>
            <div className="w-40 py-4">ID</div>
            <div className="w-40 py-4">Name</div>
            <div className="w-80 py-4">Description</div>
            <div className="w-40 py-4">Creator</div>
            <div className="w-64 py-4">Current Owner</div>
            <div className="w-40 py-4">Price [M]</div>
            <div className="w-40 py-4">View</div>
          </div>
          {/* table contents */}
          {IPs.map((item, index) => {
            return (
              <div className='flex  text-l bg-yellow-100 bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-1 mr-5 mb-3 text-white px-4 text-center' key={index}>
                <div className="w-40 py-2">{BigNoToInt(item.id)}</div>
                <div className="w-40 py-2">{item.name}</div>
                <div className="w-80 py-2">{shortenDesc(item.descreption)}</div>
                <div className="w-40 py-2">{shortenName(item.creator)}</div>
                <div className="w-64 py-2">{shortenAddress(item.currentOwner)}</div>
                <div className="w-40 py-2">{item.price}</div>
                <div className="w-40 ">
                  <Button variant="outline-warning" onClick={() => navigate(`/buy/${item.id}`)} >View</Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BuyMarket