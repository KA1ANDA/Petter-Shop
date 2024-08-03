import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { setChooseActivityToggle, setLogInToggle, setRegistrationToggle } from '../../Redux/Slices/logedUserSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useGoogleAuth from '../../Hooks/useGoogleAuth';
import ForgotPassword from './ForgotPassword';
import { RxCross1 } from 'react-icons/rx';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Registration = memo(() => {
  const dispatch = useDispatch();
  const googleAuth = useGoogleAuth();
  const { registrationToggle } = useSelector((state) => state.logedUserSlice);
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [emailSent, setEmailSent] = useState(false); // New state for email confirmation
  const [emailVerificationSend, setEmailVerificationSend] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);
        // dispatch(setRegistrationToggle(false))
        setEmailVerificationSend(true)
        setEmailSent(true);
        // Log out the user immediately
        await signOut(auth);
        
        // Set email sent state to true
        // dispatch(setRegistrationToggle(false)); // Close registration
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setRegistrationError('This email is already registered.');
        } else {
          console.error('Registration error:', error.message);
          setRegistrationError('Registration failed. Please try again.');
        }
      } finally {
        setLoading(false); // Reset loading state
      }
    },
  });

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] overflow-hidden flex justify-center items-center'>
      {!emailSent ? (
        <div className='flex flex-col gap-[30px]  mx-[10px] sm:m-0 px-[10px] py-[30px] sm:p-[50px] rounded-standart w-[500px] bg-white'>
          <div onClick={() => dispatch(setRegistrationToggle(false))} className='self-end text-h4 cursor-pointer'>
            <RxCross1 />
          </div>
          <div className='text-center text-h2 font-extrabold'>Registration</div>

          <form onSubmit={formik.handleSubmit} className='flex flex-col gap-[40px]'>

            <div className='flex flex-col gap-[10px]'>
              <input
                type='text'
                placeholder='Write Your Email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`signInInput ${
                  formik.touched.email && formik.errors.email ? 'invalidInput' : ''
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className='text-[red]'>{formik.errors.email}</div>
              )}

              <input
                type='password'
                placeholder='Write Your Password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`signInInput ${
                  formik.touched.password && formik.errors.password ? 'invalidInput' : ''
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className='text-[red]'>{formik.errors.password}</div>
              )}

              {registrationError && <div className='text-[red]'>{registrationError}</div>}

            </div>
           
            <div className='flex flex-col gap-[15px]'>
              <button
                type='submit'
                className='bg-primary signInButton'
                disabled={!formik.isValid || !formik.dirty || loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
              <button className='bg-additional signInButton' onClick={() =>{ googleAuth() ; dispatch(setRegistrationToggle(false))}} disabled={loading}>
                Sign In With Google
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='flex flex-col gap-[30px] mx-[10px] sm:m-0 px-[10px] py-[30px] sm:p-[50px] rounded-standart w-[500px] bg-white'>
          <div className='text-center text-h2 font-extrabold'>Email Verification</div>
          <div className='text-center'>Email verification link sent. Please check your email and verify your account.</div>
          <button
            className='bg-primary signInButton'
            onClick={() => {
              setEmailSent(false);
              dispatch(setRegistrationToggle(false));
              dispatch(setLogInToggle(true));
            }}
          >
            Go to Sign In
          </button>
        </div>
      )}
    </div>
  );
});

export default Registration;
