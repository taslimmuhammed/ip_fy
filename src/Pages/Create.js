import React, { useState, useContext } from "react"
import Loader from "../Components/Loader";
import { EthersContext } from "../Context/EthersContext";
import '../Styles/Create.css'
import { Link, useNavigate } from 'react-router-dom';
import { BlockFunctions } from "../Utils/BlockFunctions";
import { FirebaseFunctions } from "../Utils/FirebaseFunctions";
function Create() {
    const { createIP, getIPCounter } = useContext(EthersContext)
    const navigate = useNavigate()
    const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
    const inputStyle = "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    const [Name, setName] = useState(null)
    const [Files, setFiles] = useState(null)
    const [Creator, setCreator] = useState("")
    const [Description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        setIsLoading(true)
        const cid = await BlockFunctions.uploadToIPFS(Files, Name, Creator, Description)
        console.log({cid})
        // const cid = "ipfs://QmdZu1NBvDzU7ByzcLAciRPhsbLKQbcYXpByQMh4JZddnr/0"
        if (cid == null) {
            setIsLoading(false)
            return alert("something went wrong, try filling up all the details")
        }
        const res = await createIP(cid);
        if (res) {
            const id = await getIPCounter()
            FirebaseFunctions.uploadIP(id,Name,Creator,Description)
            alert("IP Created Successfully!");
            navigate('/you')
        }
        else alert("something went wrong, try again later")
        setIsLoading(false)
    }
    return (
        <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
            <div className="container1">
                <h2>Create</h2>
                <div className="p-5  flex flex-col justify-start items-center text-left blue-glassmorphism  border-gray-400">
                    <div>
                        <div className="">
                            <div className="text-white w-full text-sm mt-3">Name of work  </div>
                            <input placeholder="project name" className={inputStyle} type="text" onChange={(e) => { setName(e.target.value) }} />
                            <div className="text-white w-full text-sm mt-3">A brief description about work</div>
                            <textarea placeholder="this project is about..." className={inputStyle} type="text" onChange={(e) => { setDescription(e.target.value) }} />
                            <div className="text-white w-full text-sm mt-3">Your name </div>
                            <input placeholder="Dr.Do Little" className={inputStyle} type="text" onChange={(e) => { setCreator(e.target.value) }} />
                            <div className="text-white w-full text-sm mt-3">Upload files (* including large documents, designs, musics, photos etc ) </div>
                            <input className={inputStyle} type="file" multiple onChange={(e) => { setFiles(e.target.files) }} />
                            <div className="h-[1px] w-full bg-gray-400 my-2" />
                            {isLoading
                                ? <Loader />
                                : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                    >
                                        Proceed to create
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create 