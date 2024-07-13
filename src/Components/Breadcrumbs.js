import {NavLink, useLocation, useParams } from "react-router-dom"
import { setSelectedService } from "../Redux/Slices/servicesSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"



const Breadcrumbs = () => {
  const dispatch = useDispatch()
 
  const location = useLocation()



  let currentLink = ''

 

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, index, array) => {

      currentLink += `/${crumb}`

      console.log('CRUMBS' , crumb)
      
      return(
        <div key={crumb} className={`after:content-['●'] after:text-additional after:text-[20px]  after:rounded-[50%] after:mx-[10px] last:after:hidden text-primary last:text-black text-h5 leading-[19px] font-bold${
          index === array.length - 1 && currentLink.match(/\d+$/)?.[0] ? 'hidden' : '' // Hide the last crumb
        } 
        `}>
          <NavLink to={currentLink} >{crumb}  </NavLink>
          
        </div>
      )
    })


   


    const lastInteger = currentLink.match(/\d+$/)?.[0] || ''

    // tu last integeri araaa local storageshi wavshalo id anu '' davuwero !!!!!!!!!!!!!!!!!!
    if(lastInteger!==''){
      localStorage.setItem('currentServiceId', lastInteger); 
    }



 
    
   

  return(
    <div className="flex">
      <NavLink to='/' className="after:content-['●'] after:text-additional leading-[19px] after:text-[20px]  after:rounded-[50%] after:mx-[10px] text-h5  text-primary font-bold" >Home</NavLink>
      <div className=" flex ">{crumbs}</div>
    </div>
    
  )
}


export default Breadcrumbs