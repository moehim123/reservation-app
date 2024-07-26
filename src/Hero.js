import React from 'react';
import heroImage from './Images/Hero-image.png';
import { useNavigate } from 'react-router-dom';


const Hero = () => {

    const navigate = useNavigate();

  return (
    <main className="bg-[#78d454] py-14">
      <div className="container mx-auto lg:flex-row sm:flex-col md:flex-row md:space-x-8 px-4">
        <div className="flex flex-col space-y-4 md:space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-black text-2xl font-semibold md:text-2xl lg:text-5xl">
            Delicious Flavors that speak louder than words
          </h1>
          <p className="text-white text-base md:text-lg lg:text-xl mx-auto md:mx-0">
            Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap.
          </p>
          <button onClick = {() => navigate("/booking")}className="w-[157px] md:w-[180px] h-10 px-6 py-2.5 bg-black rounded-[18px] shadow backdrop-blur-[8.70px] flex justify-center items-center gap-2.5 text-white text-base font-medium mx-auto md:mx-0">
            Reserve Table
          </button>
        </div>

        <div className="mt-8 md:mt-0 flex justify-center">
          <img src={heroImage} alt="Hero-Image-Food-Plate" className="w-[80%] md:w-[411px] h-auto md:h-[411px]" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
