import { MediaRenderer } from '@thirdweb-dev/react';
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { EthersContext } from '../Context/EthersContext';
import { BlockFunctions } from '../Utils/BlockFunctions';
import Loader from '../Components/Loader';

function FilesPage() {
  const { id } = useParams();
  const { getIPDetails } = useContext(EthersContext)
  const [Data, setData] = useState(null)
  const [Files, setFiles] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const intiator = async () => {
    setisLoading(true)
    const ip = await getIPDetails(id);
    const data = await BlockFunctions.getIPData(ip)
    let arr = []
    let mainArr = []
    const keys = Object.keys(data.files)
    for (let i = 0; i < keys.length; i++) {
      if (i % 3 == 0) {
        mainArr.push(arr)
        arr = []
      }
      arr.push(data.files[i])
      console.log({ arr });
    }
    mainArr.push(arr)
    setData(data)
    setFiles(mainArr)
    setisLoading(false)
  }
  useEffect(() => {
    intiator()
  }, [])
  return isLoading?  <Loader/>:
   (
    <div className='gradient-bg-welcome'>
      <h1 className='text-center text-white text-5xl py-5'>{Data && Data.name}</h1>
      <div className='flex w-full justify-center'>
        {
          Files && Files.map((files, i) => (
            <div key={i}>
              {
                files.map((file, j) => (
                  <a href={file} key={j} >
                    <MediaRenderer src={file} />
                  </a>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FilesPage