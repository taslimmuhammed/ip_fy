import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';
import { Col, Row } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import '../Styles/Welcome.css'
import { shortenAddress } from "../Utils/ShortenAddress";
// import { shortenAddress } from "../utils/shortenAddress";
import { Button } from 'react-bootstrap';
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
  const { currentAccount, connectWallet, L1 } = useContext(EthersContext)
  const navigate = useNavigate()

  return (
    <div className="wel_main">
      <div className="wel_sub">
        <Row>
          <Col sm={9} xs={12} lg={5} md={5} >
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 w-full">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 font-light">
                Advancing innovation with<br /> Decentralization.
              </h1>
              <p className="text-left mt-3 text-white font-light md:w-9/12 w-11/12 text-base">
                Protect your Works  with the power of BlockChain technology .
              </p>

              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Patents
                </div>
                <div className={companyCommonStyles}> CopyRights</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Secure
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  FVM
                </div>
                <div className={companyCommonStyles}> Reliabile </div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Fast
                </div>
              </div>
            </div>
          </Col>
          <Col sm={9} xs={12} lg={5} md={5} className="welcome_left">
            {
              currentAccount ? <div className="flex flex-col flex-1 items-center justify-start w-full  mt-2">
                <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
                  <div className="flex justify-between flex-col w-full h-full">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                        <SiEthereum fontSize={21} color="#fff" />
                      </div>
                      <BsInfoCircle fontSize={17} color="#fff" />
                    </div>
                    <div>
                      <p className="text-white font-light text-sm">
                        {/* {shortenAddress(currentAccount)} */}
                      </p>
                      <p className="text-white font-semibold text-lg mt-1">
                        Polygon
                      </p>
                      <p className="text-white">{shortenAddress(currentAccount)}</p>
                    </div>
                  </div>
                </div>
                <button className="button-85" onClick={() => { navigate('/create') }}>Create Proof </button>
              </div> :
                <div className="flex flex-col h-full justify-center text-4xl">
                  <Button onClick={connectWallet} variant="primary">Connect Wallet </Button>
                </div>
            }

          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Welcome;
