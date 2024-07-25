import React, { useState } from 'react';
import Logo from "./Images/Lemon-logo.svg";
import cartIcon from "./Images/Cart-icon.svg";
import userIcon from "./Images/User-icon.svg";
import hamBurgerIcon from "./Images/Hamburger-icon.svg";
import { Transition } from '@headlessui/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-md pt-4 pb-4 flex flex-col items-center md:items-start">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0 relative">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="logo-image" className="w-12" />
          <h1 className="text-black text-lg font-medium">Little Lemon</h1>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 hover:text-green-600 focus:outline-none"
          >
            <img src={hamBurgerIcon} alt="Hamburger-icon" className="w-6 h-6" />
          </button>
        </div>

        <nav className={`hidden md:flex md:items-center space-x-4`}>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-800 hover:text-green-600">Home</a></li>
            <li><a href="/About" className="text-gray-800 hover:text-green-600">About</a></li>
            <li><a href="/Menu" className="text-gray-800 hover:text-green-600">Menu</a></li>
            <li><a href="/Reservation" className="text-gray-800 hover:text-green-600">Reservation</a></li>
          </ul>
          <div className="flex space-x-4">
            <img src={cartIcon} alt="cart-icon" className="w-6 h-6" />
            <img src={userIcon} alt="User-icon" className="w-6 h-6" />
          </div>
        </nav>

        <Transition
          show={isOpen}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {() => (
            <div className="md:hidden flex flex-col items-center space-y-4 mt-4 w-full bg-black shadow-lg py-4 absolute top-full left-0">
              <img src={cartIcon} alt="cart-icon" className="w-6 h-6" />
              <img src={userIcon} alt="User-icon" className="w-6 h-6" />
              <ul className="flex flex-col items-center space-y-4">
                <li><a href="/" className="text-white hover:text-green-600">Home</a></li>
                <li><a href="/About" className="text-white hover:text-green-600">About</a></li>
                <li><a href="/Menu" className="text-white hover:text-green-600">Menu</a></li>
                <li><a href="/Reservation" className="text-white hover:text-green-600">Reservation</a></li>
              </ul>
            </div>
          )}
        </Transition>
      </div>
    </header>
  );
}

export default Header;
