import React from 'react';

const Aboutus = () => {
  const metrics = [
    {
      count: "42K",
      description: "Satisfied Customers"
    },
    {
      count: "42K",
      description: "Satisfied Customers"
    },
    {
      count: "42K",
      description: "Satisfied Customers"
    },
    {
      count: "42K",
      description: "Satisfied Customers"
    }
  ];

  return (
    <main className="flex justify-center p-24 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start">
              <div className="flex">
                <span className="text-black text-[32px] font-semibold">{metric.count}</span>
                <span className="text-[#78d454] text-[32px] font-semibold">+</span>
              </div>
              <p className="text-black text-base font-light">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end md:justify-center space-y-4">
          <h1 className="text-black text-4xl  md:w-[299px] font-semibold text-center md:text-right w-full">
            We have achieved many wonderful things during our time
          </h1>
          <p className="text-black font-light text-base text-center md:w-[400px] md:text-right w-full">
            Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap.
          </p>
          <button className="w-[157px] h-[39px] px-6 py-2.5 bg-[#78d454] rounded-[18px] shadow backdrop-blur-[8.70px] flex justify-center items-center gap-2.5">
            <div className="text-white text-base font-medium">Learn More</div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Aboutus;
