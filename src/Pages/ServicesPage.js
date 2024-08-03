import React, { memo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Information from '../Components/Information';
import Services from '../Components/Services';
import GroomingService from '../Components/GroomingService';
import errorPhoto from '../Components/shopComponents/Photos/errorPhoto.png';
import { IoPawSharp } from 'react-icons/io5';
import useUserFeedback from '../Hooks/useUserFeedback';
import { auth } from '../config/firebase';

const ServicesPage = memo(() => {
  const { addWishAboutServices } = useUserFeedback();

  const formik = useFormik({
    initialValues: {
      wish: ''
    },
    validationSchema: Yup.object({
      wish: Yup.string()
        .required('This field is required')
    }),
    onSubmit: (values, { resetForm }) => {
      const userWish = {
        userName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        wish: values.wish,
      };
      addWishAboutServices(userWish);
      resetForm();
    }
  });

  return (
    <div className='bg-secondary h-[100vh] flex flex-col'>
      <div className='m-auto w-full px-[15px] lg:p-0 lg:w-[800px] flex flex-col gap-[30px]'>
        <div className='text-[120px] sm:text-[200px] justify-center items-center font-extrabold flex'>
          <span>4</span>
          <img className='w-[120px] h-[120px] sm:w-[230px] sm:h-[230px]' src={errorPhoto} alt="Error" />
          <span>4</span>
        </div>
        <div className='text-center font-extrabold text-h2 sm:text-h1'>Page Not Found</div>
        <div className='text-h5 sm:text-h3 text-center font-semibold w-full'>Page soon will be added, share with us what Services you want to see in Pet services Function</div>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-[30px] justify-center items-center'>
          <textarea
            id='wish'
            name='wish'
            value={formik.values.wish}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Share Your Wishes'
            className={`shadow-lg shadow-black resize-none w-full rounded-standart border-2 border-[#cecece] text-h6 leading-[20px] min-h-[100px] p-[20px] focus:outline-none ${formik.touched.wish && formik.errors.wish ? 'border-red-500' : ''}`}
          />
          {formik.touched.wish && formik.errors.wish ? (
            <div className='text-additional font-bold'>{formik.errors.wish}</div>
          ) : null}
          <button type='submit' className='w-full sm:w-auto shadow-md shadow-black addToCartBtn hover:bg-additional flex justify-center items-center gap-[10px] transition-all duration-300'>
            <div className='text-secondary'><IoPawSharp /></div>
            <div>Send Feedback</div>
          </button>
        </form>
      </div>

      {/* JER ESENI ARAA !!!!!!!!!!!! */}
      {/* <Information
       name='Our Services'
       description='Blandit cursus risus at ultrices. Enim sit amet venenatis urna cursus eget nunc scelerisque'/>
      <Services />
      <GroomingService /> */}
    </div>
  );
});

export default ServicesPage;
