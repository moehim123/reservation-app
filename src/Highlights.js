import React from 'react';
import kebabMeal from "./Images/Kebab-Meal.png";
import Cart from "./Images/cartIcon.png";
import grilledChicken from "./Images/Grilled-Chicken.png";
import chickenPopcorn from "./Images/Chicken-popcorn.png";

const Highlights = () => {
  const meals = [
    {
      title: "Chicken Kebab",
      description: "is simply dummy text of the printing and typesetting industry.",
      price: 12,
      image: kebabMeal,
    },
    {
      title: "Grilled Chicken",
      description: "is simply dummy text of the printing and typesetting industry.",
      price: 24,
      image: chickenPopcorn,
    },
    {
      title: "Chicken Popcorn",
      description: "is simply dummy text of the printing and typesetting industry.",
      price: 18,
      image: grilledChicken,
    }
  ];

  return (
    <main className="p-6 md:p-24">
      <div className="container mx-auto w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-black text-3xl font-semibold">Specials</h1>
          <button className="button-hover-effect w-[157px] h-[39px] px-6 py-2.5 bg-[#78d454] rounded-[18px] shadow backdrop-blur-[8.70px] flex justify-center items-center">
            <div className="text-white text-base font-medium">Our Menu</div>
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center md:justify-start">
          {meals.map((meal, index) => (
            <div key={index} className="bg-[#f2f2f1] w-full md:w-[280px] rounded-lg overflow-hidden shadow-md mx-auto">
              <div className="flex justify-center items-center h-[180px]">
                <img
                  className="object-contain h-full"
                  src={meal.image}
                  alt={`${meal.title}-image`}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-14">
                    <h2 className="text-black text-lg font-semibold">{meal.title}</h2>
                    <div className="w-[40px] h-[40px] bg-[#78d454] rounded-full flex items-center justify-center p-2">
                      <h3 className="text-white text-sm font-medium">${meal.price}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-black text-base font-light mt-2">{meal.description}</p>
                <div className="flex items-center mt-4">
                  <h2 className="text-black text-base font-medium mr-2">Add to cart</h2>
                  <img src={Cart} alt="Add to cart" className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Highlights;
