import React, { memo, useEffect, useState } from 'react';
import { IoMdHome } from 'react-icons/io';
import { MdApartment, MdOutlineWork } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingAddress } from '../../Redux/Slices/shopFilterSlice';
import { shippingCity } from '../../Variables/shopVariables';



const ShippingAddress = memo(() => {
  
  const dispatch = useDispatch()
  const {shippingAddress} = useSelector(state => state.shopFilterSlice)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(shippingCity[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);


  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
    dispatch(setShippingAddress({...shippingAddress , city:city.name}))
  };


  useEffect(()=>{
    dispatch(setShippingAddress({...shippingAddress , city:shippingCity[0].name}))
  },[])

  return(
    <div className='flex flex-col gap-[30px]'>
      <div className=' flex flex-col gap-[20px]'>
            <div className=' font-extrabold text-h3'>Shipping Address</div>
            <div className=' flex flex-col gap-[10px]'>
              

            <div className=' flex flex-col justify-center '>
              <div className="relative bg-white signInInput  ">
                <button 
                  onClick={toggleDropdown} 
                  className=" rounded-md flex items-center justify-between w-full "
                >
                  <div className="flex items-center">
                    <span>{selectedCity.name}</span>
                  </div>
                  <span className="ml-auto">▼</span>
                </button>

                {isOpen && (
                  <div className="absolute left-0 signInInput mt-1 w-full max-h-[200px] overflow-auto  rounded-standart shadow-lg bg-white z-10">
                    {shippingCity.map((city, index) => (
                      <div 
                        key={index} 
                        className=" flex items-center cursor-pointer rounded-standart " 
                        onClick={() => handleSelectCity(city)}
                      >
                        <span>{city.name}</span>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
            </div>


              
              <input value={shippingAddress.district}  onChange={(e) => dispatch(setShippingAddress({...shippingAddress , district:e.target.value}))} className='signInInput w-full' placeholder='District' />
              <div className='flex gap-[10px]'>
                <input value={shippingAddress.firstName} onChange={(e) => dispatch(setShippingAddress({...shippingAddress , firstName:e.target.value}))} className='signInInput w-full' placeholder='First Name' />
                <input value={shippingAddress.lastName}  onChange={(e) => dispatch(setShippingAddress({...shippingAddress , lastName:e.target.value}))} className='signInInput w-full' placeholder='Last Name' />
              </div>
              <input value={shippingAddress.address}  onChange={(e) => dispatch(setShippingAddress({...shippingAddress , address:e.target.value}))} className='signInInput w-full' placeholder='Address' />
              <input value={shippingAddress.additionalAddressInfo} onChange={(e) => dispatch(setShippingAddress({...shippingAddress , additionalAddressInfo:e.target.value}))} className='signInInput w-full' placeholder='nomeri /sartuli /sadarbazo ....' />
              <input value={shippingAddress.phoneNumber} onChange={(e) => dispatch(setShippingAddress({...shippingAddress , phoneNumber:e.target.value}))} className='signInInput w-full'  placeholder='Phone Number' />
              
            </div>
      </div>

        <div className='flex flex-col gap-[30px] md:flex-row justify-around'>
                <div className='flex flex-col gap-[10px] bg-lightPrimary border-2 border-primary rounded-standart px-[30px] py-[10px] shadow-lg shadow-black'>
                  <div className=' flex flex-col items-center'>
                    <div className=' text-h2 text-primary'><MdApartment /></div>         
                    
                  </div>
                  <input type='radio' name='type' id='apartment' value='ბინა' onChange={(e) => dispatch(setShippingAddress({...shippingAddress , type:e.target.value}))}  />
                </div>
                <div className='flex flex-col gap-[10px] bg-lightPrimary border-2 border-primary rounded-standart px-[30px] py-[10px] shadow-lg shadow-black'>
                  <div className=' flex flex-col items-center'>
                    <div className=' text-h2 text-primary'><IoMdHome/></div>                   
                    
                  </div>
                  <input type='radio' name='type' id='house' value='სახლი'  onChange={(e) => dispatch(setShippingAddress({...shippingAddress , type:e.target.value}))}/>
                </div>
                <div className='flex flex-col gap-[10px] bg-lightPrimary border-2 border-primary rounded-standart px-[30px] py-[10px] shadow-lg shadow-black'>
                  <div className=' flex flex-col items-center'>
                    <div className=' text-h2 text-primary'><MdOutlineWork /></div>                   
                    
                  </div>
                  <input type='radio' name='type' id='work' value='სამსახური'  onChange={(e) => dispatch(setShippingAddress({...shippingAddress , type:e.target.value}))}/>
                </div>
        </div>
    </div>
  )
})


export default ShippingAddress

