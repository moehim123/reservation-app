import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Increase from "./Images/positiveSign.svg";
import Decrease from "./Images/negativeSign.svg";
import creditCard from "./Images/creditCards.svg";
import { submitAPI } from "./Api/fetchAPI";
import 'react-credit-cards/es/styles-compiled.css';
import InputMask from 'react-input-mask';

const BookingForm = ({ availableTimes, dispatch }) => {
  const [numberOfGuests, setGuests] = useState(0);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    focused: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardDetails({ ...cardDetails, focused: e.target.name });
  };

  const handleIncrease = () => {
    setGuests(numberOfGuests + 1);
  };

  const handleDecrease = () => {
    if (numberOfGuests > 0) {
      setGuests(numberOfGuests - 1);
    }
  };

  const submitForm = async (formData) => {
    try {
      const success = await submitAPI(formData);
      if (success) {
        const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        existingBookings.push(formData);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));
        navigate('/confirmed');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const fieldStyle = "h-[54px] bg-[#fefffd] rounded-3xl border border-[#78d454] w-full md:w-[326px] py-4 px-4 pl-4 ";
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
    onSubmit: async (values) => {
      try {
        await submitForm(values);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      }
    },
  });

  useEffect(() => {
    if (formik.values.date) {
      dispatch({ type: 'UPDATE_TIMES', payload: formik.values.date });
    }
  }, [formik.values.date, dispatch]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="container mx-auto px-4 md:px-8 py-8 space-y-14">
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
                onChange={formik.handleChange}
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
                className = {`${fieldStyle} pr-8`}
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
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="location"
                    value="indoor"
                    checked={formik.values.location === 'indoor'}
                    onChange={formik.handleChange}
                    className = "radio-style"
                    />
                  <span>Indoor</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="location"
                    value="outdoor"
                    checked={formik.values.location === 'outdoor'}
                    onChange={formik.handleChange}
                    className = "radio-style"
                  />
                  <span>Outdoor</span>
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
                className="w-full md:w-[505px] h-[228px] bg-[#fefffe] rounded-3xl border border-[#78d454] p-4"
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
                <InputMask
                  id="cardNumber"
                  name="cardNumber"
                  mask="9999 9999 9999 9999"
                  className={fieldStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                  placeholder="1234 5678 9012 3456"
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                ) : null}
              </div>

              <div className="flex flex-col items-left space-y-2">
                <label htmlFor="expiryDate" className={labelStyle}>Expiry Date</label>
                <InputMask
                  id="expiryDate"
                  name="expiryDate"
                  mask="99/99"
                  className={fieldStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiryDate}
                  placeholder="MM/YY"
                />
                {formik.touched.expiryDate && formik.errors.expiryDate ? (
                  <div className="text-red-500 text-sm">{formik.errors.expiryDate}</div>
                ) : null}
              </div>

              <div className="flex flex-col items-left space-y-2">
                <label htmlFor="cvv" className={labelStyle}>CVV</label>
                <InputMask
                  id="cvv"
                  name="cvv"
                  mask="999"
                  className={fieldStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                  placeholder="123"
                />
                {formik.touched.cvv && formik.errors.cvv ? (
                  <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
                ) : null}
              </div>

              </div>
          </>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  const handleNextStep = async () => {

    await formik.validateForm();


    if (Object.keys(formik.errors).length === 0) {
      setStep(step + 1);
    } else {
      formik.setTouched({
        firstName: true,
        lastName: true,
        email: true,
        date: true,
        time: true,
        ...(step === 2 && {
          cardNumber: true,
          expiryDate: true,
          cvv: true,
        }),
      });
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className="w-full bg-[#78d454] py-14">
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-8 px-4">
        <div className="flex flex-col space-y-4 md:space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-black text-2xl font-semibold md:text-2xl lg:text-3xl">
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
    </div>


      <div className="container mx-auto my-8 flex justify-center items-center">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-full ${step >= 1 ? 'bg-[#78d454]' : 'bg-black'}`}></div>
          <div className="h-2 w-24 bg-black rounded-full  relative">
            <div className={`absolute h-1 ${step >= 2 ? 'bg-[#78d454]' : 'bg-black'} transition-all duration-300`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
          </div>
          <div className={`w-14 h-14 rounded-full ${step >= 2 ? 'bg-[#78d454]' : 'bg-black'}`}></div>
          <div className="h-2 w-24 bg-black rounded-full relative">
            <div className={`absolute h-1 ${step >= 3 ? 'bg-[#78d454]' : 'bg-black'} transition-all duration-300`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
          </div>
          <div className={`w-14 h-14 rounded-full ${step >= 3 ? 'bg-[#78d454]' : 'bg-black'}`}></div>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="max-w-[1080px] mx-auto p-8">
        {renderStepContent()}
        <div className="flex justify-end mt-8 space-x-4">
          {step > 1 && (
            <button type="button" onClick={handlePrevStep} className="button-hover-effect w-[157px] md:w-[180px] h-10 px-6 py-2.5 bg-black rounded-[18px] shadow backdrop-blur-[8.70px] flex justify-center items-center gap-2.5 text-white text-base font-medium">
              Previous
            </button>
          )}
          {step < 2 && (
            <button type="button" onClick={handleNextStep} className="button-hover-effect w-[157px] md:w-[180px] h-10 px-6 py-2.5 bg-black rounded-[18px] shadow backdrop-blur-[8.70px] flex justify-center items-center gap-2.5 text-white text-base font-medium">
              Next
            </button>
          )}
          {step === 2 && (
            <button type="submit" className=" button-hover-effect w-[157px] md:w-[180px] h-10 px-6 py-2.5 bg-black rounded-[18px] shadow backdrop-blur-[8.70px] flex justify-center items-center gap-2.5 text-white text-base font-medium">
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default BookingForm;
