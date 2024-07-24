import React from 'react';
import Logo from "./Images/Lemon-logo.svg";
import cartIcon from "./Images/Cart-icon.svg";
import userIcon from "./Images/User-icon.svg";

const Header = () =>{
    return(
        <header>
            <div>
                <img src={Logo} alt = "logo-image"/>
                <h1>Little Lemon</h1>
            </div>
            <nav>
                <ul>
                    <li><a href ="/">Home</a></li>
                    <li><a href ="/About">About</a></li>
                    <li><a href ="/Menu">Menu</a></li>
                    <li><a href ="/Reservation">Reservation</a></li>
                </ul>

            </nav>
            <div>
                <img src = {cartIcon} alt = "cart-icon"/>
                <img src = {userIcon} alt = "User-icon"/>
            </div>
        </header>

    )
}

export default Header;