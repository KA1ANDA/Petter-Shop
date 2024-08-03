import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { setForgotPasswordToggle, setLogInToggle, setRegistrationToggle } from '../../Redux/Slices/logedUserSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ForgotPassword from './ForgotPassword';
import useGoogleAuth from '../../Hooks/useGoogleAuth';
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleAuth = useGoogleAuth();
  const { forgotPasswordToggle } = useSelector((state) => state.logedUserSlice);
  const [signInError, setSignInError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      const { email, password } = values;
      setLoading(true);
      setSignInError(null);

      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Check email verification before proceeding
        if (!userCredential.user.emailVerified) {
          setSignInError('Email is not verified. Please check your inbox for the verification link.');
          await auth.signOut(); // Log out unverified user
          return; // Exit the submit function
        }

        dispatch(setLogInToggle(false));
        navigate('/');
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            setFieldError('email', 'Invalid email format');
            break;
          case 'auth/wrong-password':
            setFieldError('email', 'Incorrect email or password');
            break;
          case 'auth/user-not-found':
            setFieldError('email', 'User not found. Please check your email.');
            break;
          default:
            console.error('Sign-in error:', error.message);
            setSignInError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  if (forgotPasswordToggle) {
    return <ForgotPassword />;
  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] overflow-hidden flex justify-center items-center'>
      <div className='flex flex-col gap-[30px] mx-[10px] sm:m-0 p-[10px] sm:p-[50px] rounded-standart w-[500px] bg-white'>
        <div onClick={() => dispatch(setLogInToggle(false))} className='self-end text-h4 cursor-pointer'>
          <RxCross1 />
        </div>

        <div className='text-center text-h2 font-extrabold'>Sign In</div>

        {signInError && (
          <div className='text-[red] mb-4 border-2 border-[red] rounded-standart p-[5px]'>
            {signInError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[10px]'>
            <input
              type='text'
              placeholder='Write Your Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`signInInput w-full ${
                formik.touched.email && formik.errors.email ? 'invalidInput' : formik.touched.email ? 'validInput' : ''
              }`}
            />
            {formik.touched.email && formik.errors.email && <div className='text-[red]'>{formik.errors.email}</div>}

            <input
              type='password'
              placeholder='Write Your Password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`signInInput w-full ${
                formik.touched.password && formik.errors.password ? 'invalidInput' : formik.touched.password ? 'validInput' : ''
              }`}
            />
            {formik.touched.password && formik.errors.password && <div className='text-[red]'>{formik.errors.password}</div>}
          </div>

          <a onClick={() => dispatch(setForgotPasswordToggle(true))} className='text-blue-400 cursor-pointer'>
            Forgot password?
          </a>

          <div className='flex flex-col gap-[15px]'>
            <button type='submit' className='bg-primary signInButton' disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <button className='bg-additional signInButton' onClick={() => { googleAuth(); dispatch(setLogInToggle(false)); }} disabled={loading}>
              {loading ? 'Loading...' : 'Sign In With Google'}
            </button>
          </div>

          <div className='sm:flex-row flex flex-col justify-center items-center gap-[10px]'>
            Don't have an account?{' '}
            <span
              onClick={() => {
                dispatch(setLogInToggle(false));
                dispatch(setRegistrationToggle(true));
              }}
              className='text-primary font-bold cursor-pointer'
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
});

export default SignIn;
