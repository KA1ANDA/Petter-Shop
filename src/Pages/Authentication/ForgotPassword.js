import React, {memo, useEffect, useState } from 'react';
import {auth , db} from "../../config/firebase"
import {createUserWithEmailAndPassword  , updateProfile , sendEmailVerification, signOut , sendPasswordResetEmail} from "firebase/auth"
import { useDispatch, useSelector } from 'react-redux';
import { setChooseActivityToggle, setDisplayName, setForgotPasswordToggle, setLogInToggle } from '../../Redux/Slices/logedUserSlice';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import useGoogleAuth from '../../Hooks/useGoogleAuth';
import { FaArrowLeft } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { IoMdArrowBack } from 'react-icons/io';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword = memo(() => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await sendPasswordResetEmail(auth, values.email);
        alert('A Password Reset Link has been sent to your email');
      } catch (error) {
        console.error(error);
        if (error.code === 'auth/user-not-found') {
          // Display error message if email is not found in Firebase
          formik.setFieldError('email', 'Email not found. Please check your email address.');
        } else {
          alert('Failed to send password reset email. Please try again.');
        }
      }
    },
  });

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] overflow-hidden flex justify-center items-center'>
      <div className='flex flex-col gap-[30px] p-[50px] rounded-standart w-[500px] bg-white'>
        <div className='flex justify-between items-center'>
          <div
            onClick={() => {
              dispatch(setLogInToggle(true));
              dispatch(setForgotPasswordToggle(false));
            }}
            className='text-h4 cursor-pointer'
          >
            <IoMdArrowBack />
          </div>
          <div
            onClick={() => {
              dispatch(setForgotPasswordToggle(false));
              dispatch(setLogInToggle(false));
            }}
            className='self-end text-h4 cursor-pointer'
          >
            <RxCross1 />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className=' flex flex-col gap-[20px]'>
          <div className=' flex flex-col gap-[10px]'>
            <input
              type='email'
              name='email'
              placeholder='user@gmail.com'
              className={`signInInput ${formik.touched.email && formik.errors.email ? 'invalidInput' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='text-[red]'>{formik.errors.email}</div>
            )}
          </div>
          
          <button type='submit' className='signInButton bg-primary'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
});

export default ForgotPassword;