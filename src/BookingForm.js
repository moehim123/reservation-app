import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Increase from "./Images/positiveSign.svg";
import Decrease from "./Images/negativeSign.svg";
import creditCard from "./Images/creditCards.svg";

const BookingForm = ({ availableTimes, dispatch }) => {
  const [numberOfGuests, setGuests] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrease = () => {
    setGuests(numberOfGuests + 1);
  };

  const handleDecrease = () => {
    if (numberOfGuests > 0) {
      setGuests(numberOfGuests - 1);
    }
  };

  const fieldStyle = "h-[54px] bg-[#fefffd] rounded-3xl border border-[#78d454] w-[326px] py-4 px-4";
  const labelStyle = "text-black text-base font-medium";

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      location: 'indoor',
      notes: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      date: Yup.date().required('Required'),
      time: Yup.string().required('Required'),
      notes: Yup.string(),
      cardNumber: Yup.string().when('step', {
        is: 2,
        then: Yup.string().required('Required'),
      }),
      expiryDate: Yup.string().when('step', {
        is: 2,
        then: Yup.string().required('Required'),
      }),
      cvv: Yup.string().when('step', {
        is: 2,
        then: Yup.string().required('Required'),
      }),
    }),
    onSubmit: values => {
      if (step === 1) {
        setStep(2);
      } else {
        alert(JSON.stringify(values, null, 2));
      }
    },
  });

  const handleDateChange = (e) => {
    formik.handleChange(e);
    dispatch({ type: 'UPDATE_TIMES', date: e.target.value });
  };


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="container mx-auto pl-48 items-center py-8 space-y-6">
            <div className="flex flex-col items-left space-y-2">
              <label htmlFor="firstName" className={labelStyle}>First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={fieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
              ) : null}
            </div>

            <div className="flex flex-col items-left space-y-2">
              <label htmlFor="lastName" className={labelStyle}>Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={fieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
              ) : null}
            </div>

            <div className="flex flex-col items-left space-y-2">
              <label htmlFor="email" className={labelStyle}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={fieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="flex flex-col items-left space-y-2">
              <label htmlFor="date" className={labelStyle}>Date</label>
              <input
                id="date"
                name="date"
                type="date"
                className={fieldStyle}
                onChange={handleDateChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-red-500 text-sm">{formik.errors.date}</div>
              ) : null}
            </div>

            <div className="flex flex-col items-left space-y-2">
              <label htmlFor="time" className={labelStyle}>Available Time</label>
              <select
                id="time"
                name="time"
                className={fieldStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
              >
                <option value="" label="Select time" />
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
              {formik.touched.time && formik.errors.time ? (
                <div className="text-red-500 text-sm">{formik.errors.time}</div>
              ) : null}
            </div>

            <div className="flex flex-col items-left space-y-4">
              <label className={labelStyle}>Location</label>
              <div className="flex space-x-8">
                <label>
                  <input
                    type="radio"
                    name="location"
                    value="indoor"
                    checked={formik.values.location === 'indoor'}
                    onChange={formik.handleChange}
                    className="w-3.5 h-3.5  rounded-full border-2 border-[#78d454]"
                  />
                  Indoor
                </label>
                <label>
                  <input
                    type="radio"
                    name="location"
                    value="outdoor"
                    checked={formik.values.location === 'outdoor'}
                    onChange={formik.handleChange}
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#78d454]"
                  />
                  Outdoor
                </label>
              </div>
            </div>

            <div className="flex flex-col items-left space-y-8">
              <div className={labelStyle}>
                <h1>Number of guests</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button type="button" onClick={handleIncrease}>
                  <img src={Increase} alt="positive-sign-icon" />
                </button>
                <h1 className="text-black text-base font-normal">{numberOfGuests}</h1>
                <button type="button" onClick={handleDecrease}>
                  <img src={Decrease} alt="negative-sign-icon" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-left space-y-8">
              <label htmlFor="notes" className={labelStyle}>Special Notes</label>
              <textarea
                id="notes"
                name="notes"
                className="w-[505px] h-[228px] bg-[#fefffe] rounded-3xl border border-[#78d454] p-4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
              />
              {formik.touched.notes && formik.errors.notes ? (
                <div className="text-red-500 text-sm">{formik.errors.notes}</div>
              ) : null}
            </div>
          </div>
        );
      case 2:
        return (
          <>
            <div className="container mx-auto px-4 space-y-6">
              <div className="flex flex-col items-left space-y-2">
                <label htmlFor="cardNumber" className={labelStyle}>Card Number</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  className={fieldStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                ) : null}
              </div>

              <div className="flex flex-col items-left space-y-2">
                <label htmlFor="expiryDate" className={labelStyle}>Expiry Date</label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  className={fieldStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiryDate}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate ? (
                  <div className="text-red-500 text-sm">{formik.errors.expiryDate}</div>
                ) : null}
              </div>

              <div className="flex flex-col items-left space-y-2">
                <label htmlFor="cvv" className={labelStyle}>CVV</label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  className={fieldStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                />
                {formik.touched.cvv && formik.errors.cvv ? (
                  <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
                ) : null}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>

        <div className="container mx-auto flex flex-col md:flex-row md:space-x-8 px-4 bg-[#78d454] py-14">
        <div className="flex flex-col space-y-4 md:space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-black text-xl font-semibold md:text-2xl lg:text-3xl">
          Book a table by filling form below and check your email for details of the booking
          </h1>
          <p className="text-white text-base md:text-lg lg:text-xl mx-auto md:mx-0">
          We Charge $50 deposit to hold your booking for you
          </p>
        </div>

        <div className="mt-8 md:mt-0 flex justify-center">
          <img src={creditCard} alt="Hero-Image-credit-card" className="w-[235px] h-[168px]" />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="container mx-auto my-10 space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={`w-14 h-14 rounded-full ${step === 1 ? 'bg-[#78d454]' : 'bg-[#000000]'}`} />
          <hr className="border-t border-[#000000] w-14" />
          <div className={`w-14 h-14 rounded-full ${step === 2 ? 'bg-[#78d454]' : 'bg-[#000000]'}`} />
        </div>
        {renderStepContent()}
        <div className="flex justify-center space-x-4">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-black rounded-3xl text-white"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-[#78d454] rounded-3xl text-white"
          >
            {step === 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
