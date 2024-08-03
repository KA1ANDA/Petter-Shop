import React, { memo, useState } from 'react';
import ProductAdd from '../Components/admin/ProductAdd';
import AddAdminRole from '../Components/admin/AddAdminRole';





const AdminPage = memo(() => {

  const [activeTab, setActiveTab] = useState('productAdd'); // Initial active tab

  const tabs = [
    { name: 'productAdd', label: 'Product Add' },
    { name: 'addAdminRole', label: 'Make Admin' },
    { name: 'orders', label: 'Orders' },
    // Add more tabs as needed
  ];

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };


  return(
    <div className='flex flex-col gap-[35px] w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto  mt-[50px]  xl:mt-[150px]  '>
       <div className='flex border-2 bg-lightPrimary border-primary rounded-standart p-[20px] gap-[50px] text-[25px] font-bold'>
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => handleTabChange(tab.name)}
            className={`cursor-pointer rounded-standart border-2 border-primary p-[5px] ${activeTab === tab.name ? 'bg-primary text-white  ' : ''}`}
          >
            {tab.label}
          </div>
        ))}
      </div>


      <div>
      {activeTab === 'productAdd' && <ProductAdd />}
      {activeTab === 'addAdminRole' && <AddAdminRole />}
      </div>
 
    </div>
  )
})


export default AdminPage