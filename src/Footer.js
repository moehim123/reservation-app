import React from 'react';
import footerLogo from "./Images/Footer-logo.svg";
import twitterIcon from "./Images/Twitter-icon.svg";
import facebookIcon from "./Images/Facebook-icon.svg";
import instagramIcon from "./Images/Instagram-icon.svg";



const Footer = () =>{
    return(
        <footer>
            <div>
                 <h1>Little Lemon</h1>
                <img src={footerLogo} alt = "logo-image"/>
            </div>
            <div>
                <h2>Links</h2>
                <ul>
                    <li><a href ="/">Home</a></li>
                    <li><a href ="/About">About</a></li>
                    <li><a href ="/Menu">Menu</a></li>
                    <li><a href ="/Reservation">Reservation</a></li>
                </ul>

            </div>
            <div>
                <h2>Contact</h2>
                <ul>
                    <li><a href ="/phone">Phone</a></li>
                    <li><a href ="/Email">Email</a></li>
                </ul>

            </div>
            <div>
                <h2>Openning hours</h2>
                <ul>
                    <li>sat: 9:00 am - 5:00pm  </li>
                    <li>sat: 9:00 am - 5:00pm  </li>
                    <li>sat: 9:00 am - 5:00pm  </li>

                </ul>

            </div>
            <div>
                <h3>@2024 all rights reserved </h3>
                <div>
                    <img src = {twitterIcon} alt = "Twitter-icon"/>
                    <img src = {facebookIcon} alt = "Facebook-icon"/>
                    <img src = {instagramIcon} alt = "Instagram-icon"/>

                </div>
            </div>
        </footer>
    )
}

export default Footer;