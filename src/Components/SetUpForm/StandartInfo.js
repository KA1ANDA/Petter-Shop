import React, { memo } from 'react';
import { auth } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setAbout, setAddress, setCity, setphoneNumber } from '../../Redux/Slices/standartInfoFormSlice';




const StandartInfo = memo(() => {
  
  const dispatch = useDispatch()

  const {about , city , address ,phoneNumber } = useSelector(state => state.standartInfoFormSlice)

  return(
    <div className='bg-blue-300 '>
      <div>
        <div>სახელი</div>
        <input value={auth.currentUser.displayName}></input>
      </div>

      <div>
        <div>Email</div>
        <input value={auth.currentUser.email}></input>
      </div>

      <div>
        <div>ქალაქი</div>
        <input onChange={(e) => dispatch(setCity(e.target.value))} value={city}></input>
      </div>

      <div>
        <div>მისამართი</div>
        <input onChange={(e) => dispatch(setAddress(e.target.value))} value={address}></input>
      </div>


      <div>
        <div>ტელეფონის ნომერი</div>
        <input onChange={(e) => dispatch(setphoneNumber(e.target.value))} value={phoneNumber} ></input>
      </div>

      <div>
        <div>შესახებ</div>
        <input onChange={(e) => dispatch(setAbout(e.target.value))} value={about}></input>
      </div>
    </div>
  )
})


export default StandartInfo