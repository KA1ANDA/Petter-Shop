import React, { memo, useEffect, useState } from 'react';
import Information from '../Components/Information';
import Services from '../Components/Services';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedService, setServicesPage } from '../Redux/Slices/servicesSlice';
import useGetServiceInfo from '../Hooks/useGetServiceInfo';
import { NavLink, useNavigate, useParams } from 'react-router-dom';



const ServicePage = memo(() => {


  const service = useGetServiceInfo()



  var selectedService = localStorage.getItem("currentServiceId");

  const [loading , setLoading] = useState(false)

  const {currentServiceURL } = useSelector(state => state.servicesSlice)



  useEffect(() => {
    if(!selectedService){
      setLoading(true)
    }else{
      setLoading(false)
    }
    
  },[selectedService])

  useEffect(() => {
    if(service){
      localStorage.setItem('currentServiceName', service.service); 
    }
    
  },[service])

 
 

  if(loading){
    return(
      <div>LOADING...............</div>
    )
  }

  return(
    <div className='bg-gray-400 h-[100%] flex flex-col gap-[160px]'>
      <Information
       name={service?.service}
       description={service?.description}/>
      {/* droebiti gilaki */}
      <NavLink  to={`/Discover/${currentServiceURL}`} className='border  border-black bg-green-500 p-[50px] m-[20px] hover:bg-white text-center' > <button >GET SERVICE</button></NavLink>
      
    </div>
  )
})


export default ServicePage