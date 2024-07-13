import React, { memo, useEffect } from 'react';
import Information from '../../Components/Information';
import contactUsBg from '../../Components/shopComponents/Photos/contactUsBg.png'
import ContactInfo from '../../Components/ContactInfo';
import ContactUsForm from '../../Components/ContactUsForm';

const ContactUsPage = memo(() => {

  
  
  return(
    <div className='flex flex-col   '>
      <Information
       name='Contacts'
       description='Tristique nulla aliquet enim tortor at auctor urna nunc. Massa enim nec dui nunc mattis enim ut tellus'
       image={contactUsBg}/>


        <div className='flex flex-col w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto gap-[160px] mt-[100px] '>
          <ContactInfo/>
          <ContactUsForm/>
        </div>

    </div>
  )
})
 

export default ContactUsPage