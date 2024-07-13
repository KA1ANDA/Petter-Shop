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
        alert('Email verification link sent. Please check your email.');

        // Update user profile
        await updateProfile(user, { displayName: email.split('@')[0] });

        // Check if the email is verified before setting choose activity toggle
        if (user.emailVerified) {
          dispatch(setChooseActivityToggle(true));
          console.log('Updated Firestore document and set choose activity toggle');
        } else {
          alert('Please verify your email before logging in.');
          // Handle email verification state accordingly
        }
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
      <div className='flex flex-col gap-[30px] p-[50px] rounded-standart w-[500px] bg-white'>
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
            <button className='bg-additional signInButton' onClick={googleAuth} disabled={loading}>
              Sign In With Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Registration;



