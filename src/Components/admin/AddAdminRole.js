import { httpsCallable } from 'firebase/functions';
import React, { useState } from 'react';
import { functions } from '../../config/firebase';

const AddAdminRole = () => {

  const [email ,setEmail] = useState('')

  const handleAddAdminRole = async(email) => {
    try {
      const addAdminRole = httpsCallable(functions, 'addAdminRole');
      await addAdminRole({email});
      setEmail('')
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
   <div className='flex flex-col  w-fit m-auto gap-[30px]'>
      <input className='h-[50px] w-[300px]' onChange={(e)=>setEmail(e.currentTarget.value)} value={email}></input>
      <button className='text-[30px] font-bold text-white bg-purple-600 rounded-[20px] p-[10px]'  onClick={() => handleAddAdminRole(email)}>Make admin</button>
   </div>
  );
};

export default AddAdminRole;
