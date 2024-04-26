import React from 'react'
import '../Styles/HistoryBox.css'
function HistoryBox({ wallet, from, to }) {
    return (
        <div className="card">
            <div className="info">
                <h3 className="title"> {wallet} </h3>
                <div className='flex  text-center ml-12 mt-2'>
                    <div className='mr-7 '>From:</div>
                    <div className='font-medium'>{from}</div>
                </div>
                <div className='flex  text-center ml-12 mt-2'>
                    <div className='mr-12 '>To:</div>
                    <div className='font-medium'>{to}</div>
                </div>
            </div>
        </div>
    )
}

export default HistoryBox