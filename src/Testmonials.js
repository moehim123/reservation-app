import React from 'react';

const Testmonials = () => {

  const reviews = [
    {
      review: "is simply dummy text of the printing and typesetting industry. ",
      name: "John",
      userType: "Customer"
    },
    {
      review: "is simply dummy text of the printing and typesetting industry. ",
      name: "John",
      userType: "Customer"
    },
    {
      review: "is simply dummy text of the printing and typesetting industry. ",
      name: "John",
      userType: "Customer"
    },
    {
      review: "is simply dummy text of the printing and typesetting industry. ",
      name: "John",
      userType: "Customer"
    },
  ];

  return (
    <main className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-black text-3xl font-semibold">Testimonials</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-left bg-[#EDF0EC] rounded-[18px] p-8"
            >
              <div className="text-left mb-4">
                <h1 className="text-black text-[32px] font-semibold">,,</h1>
                <p className="text-black text-base font-light">{review.review}</p>
              </div>
              <div className="flex items-left gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#78D454] text-white font-semibold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h2 className="text-[#78d454] text-sm font-semibold">{review.name}</h2>
                  <h3 className="text-black text-[11px] font-light">{review.userType}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Testmonials;

