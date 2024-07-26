import React from 'react';
import footerLogo from "./Images/Footer-logo.svg";
import twitterIcon from "./Images/Twitter-icon.svg";
import facebookIcon from "./Images/Facebook-icon.svg";
import instagramIcon from "./Images/Instagram-icon.svg";

const Footer = () => {
  const listItemClass = "text-[#e7eae6]/60 text-sm font-normal ";

  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto w-full ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
          <div className="text-white text-2xl font-medium font-['Mona Sans'] flex flex-col items-center md:items-start">
            <h1>Little Lemon</h1>
            <img src={footerLogo} alt="logo-image" className="mt-4"/>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-[#d9d9d9] text-lg font-semibold ">Links</h2>
            <ul className="h-[142px] flex flex-col justify-center items-center md:items-start gap-[8px]">
              <li className={listItemClass}><a href="/">Home</a></li>
              <li className={listItemClass}><a href="/About">About</a></li>
              <li className={listItemClass}><a href="/Menu">Menu</a></li>
              <li className={listItemClass}><a href="/Reservation">Reservations</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-[#d9d9d9] text-lg font-semibold ">Contact</h2>
            <ul className="h-[142px] flex flex-col justify-center items-center md:items-start gap-[8px]">
              <li className={listItemClass}><a href="/phone">Phone</a></li>
              <li className={listItemClass}><a href="/Email">Email</a></li>
              <li className={listItemClass}><a href="/phone">address</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-[#d9d9d9] text-lg font-semibold ">Opening hours</h2>
            <ul className="h-[142px] flex flex-col justify-center items-center md:items-start gap-[8px]">
              <li className={listItemClass}>Sat: 9:00 am - 5:00 pm</li>
              <li className={listItemClass}>Sun: 9:00 am - 5:00 pm</li>
              <li className={listItemClass}>Mon: 9:00 am - 5:00 pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 flex flex-row md:flex-row justify-between items-center text-center md:text-left">
          <h3 className="text-[#e7eae6]/60 text-sm font-normal">© 2024 All rights reserved</h3>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src={twitterIcon} alt="Twitter-icon" className="w-6 h-6"/>
            <img src={facebookIcon} alt="Facebook-icon" className="w-6 h-6"/>
            <img src={instagramIcon} alt="Instagram-icon" className="w-6 h-6"/>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
