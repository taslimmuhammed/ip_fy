import { Transaction } from '@thirdweb-dev/sdk'
import React, { useState } from 'react'

function InputRow({ details }) {
  const { id, name, fxn, params, setisLoading } = details
  const [Param1, setParam1] = useState(null)
  const inputStyle = "appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded py-3 px-3 mb-0 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500 mr-10 ml-5"
  const validator = () => {
    if (params.length == 1 && (Param1 == null || Param1 == "")) return false;
    return true;
  }
  const handleClick = async () => {
    if (!validator()) return alert("Please fill all the fields")
    setisLoading(true)
    try {
      if (params.length == 1) await fxn(id, Param1);
      else await fxn(id)
      alert("transaction succesfull")
      window.location.reload()
    } catch (error) {
      console.log('Error: ', error)
      alert("something went wrong try again later")
    }
    
    setisLoading(false)
  }
  if (params.length == 1) return (
    <tr className='m10'>
      <td className='py-4'>
        <input onChange={(e) => setParam1(e.target.value)} placeholder={params[0].name} className={inputStyle}></input>
      </td>
      <td className='py-4'>
        <button className="button-64" role="button" onClick={handleClick}>
          <span >{name}</span>
        </button>
      </td>
    </tr>
  )
  else return (
    <tr className='m10 '>
      <td className='py-4 ' colSpan='2'>
        <div className=' flex w-full justify-center'>
          <button className="button-64" role="button" onClick={handleClick}>
            <span >{name}</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default InputRow
