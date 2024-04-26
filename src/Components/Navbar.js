import React, { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import '../Styles/Navbar.css'
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false);
  const [SearchText, setSearchText] = useState("")
  const navs = ["", "view", "transfer", ""]
  const handleEnter = (event)=>{
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      navigate(`search/${SearchText}`)
    }
  }
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li onClick={() => navigate('/you')} className="navbar_item">Your Works</li>
        <li onClick={() => navigate('/lendings')} className="navbar_item">Your Lendings</li>
        <li onClick={() => navigate('/create')} className="navbar_item">Create</li>
        <li onClick={() => navigate('/lend')} className="navbar_item">lend</li>
        <li onClick={() => navigate('/buy')} className="navbar_item">buy</li>

        <li>
          <input onChange={(e) => { setSearchText(e.target.value) }} placeholder="Enter product Id" className="search-bar" onKeyDown={(e)=>handleEnter(e)}></input>
        </li>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]" onClick={() => navigate(`search/${SearchText}`)}>
          Search
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            <NavBarItem title="Your Works" classprops="my-2 text-lg" onClick={() => navigate('/you')}></NavBarItem>
            <NavBarItem title="Create" classprops="my-2 text-lg" onClick={() => navigate('/create')} ></NavBarItem>
            <NavBarItem title="Lend" classprops="my-2 text-lg" onClick={() => navigate('/lend')} ></NavBarItem>
            <NavBarItem title="Buy" classprops="my-2 text-lg" onClick={() => navigate('/buy')}></NavBarItem>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
