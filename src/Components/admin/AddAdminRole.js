import { httpsCallable } from 'firebase/functions';
import React, { useState } from 'react';
import { functions } from '../../config/firebase';

const AddAdminRole = () => {
  const [email, setEmail] = useState('');

  const handleAddAdminRole = async (email) => {
    try {
      const addAdminRole = httpsCallable(functions, 'addAdminRole');
      await addAdminRole({ email });
      setEmail('');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className='flex flex-col border-2 border-primary rounded-standart p-[20px] w-fit m-auto gap-[30px]'>
      <input
        className='h-[50px] border-1 border-primary rounded-standart w-[300px] bg-white text-black'
        style={{ outline: '2px solid #7c58d3' }} // Add this line
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
      />
      <button
        className='text-[30px] font-bold text-white bg-primary rounded-standart p-[10px]'
        onClick={() => handleAddAdminRole(email)}
      >
        Make admin
      </button>
    </div>
  );
};

export default AddAdminRole;
