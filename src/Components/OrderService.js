import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { memo, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';





const OrderService = memo(({pricing  , recipientId}) => {

  // const [price ,setPrice] = useState('')
  // const [date ,setDate] = useState(null)
  // const [info ,setInfo] = useState('')



  const [request ,setRequest] = useState({
    senderId:auth.currentUser.uid,
    senderName:auth.currentUser.displayName,
    seen:false,
    price:'',
    date:'',
    info:''
  })
  

  const sendRequest = async() => {

    const q = query(collection(db, 'notifications'), where('recipientId', '==', recipientId)); 


  
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.size > 0) {
     
      const doc = querySnapshot.docs[0];
  
      await updateDoc(doc.ref, {
        inbox: [...doc.data().inbox, request],
      });
    }else{

      try{
        await addDoc(collection(db, "notifications"), {
          recipientId,
          inbox:[
            request
          ]
        })
      }catch(err){
        console.error(err)
      }
    }
    


    console.log(request) 
  }


  // useEffect(() => {
  //   updateDoc(docRef, {inbox:{
  //     request
  //   }})
  //   console.log(request)

  // },[request])

  return(
    <div className='bg-pink-300 '>
      <div>
        <div>აირჩიეთ პაკეტი </div>

        <div className='bg-green-200 flex flex-col  gap-[15px]'>
          {pricing.map(el =>
            <div className='bg-yellow-200 flex justify-between hover:bg-green-400 cursor-pointer'
             onClick={() => setRequest({...request ,price:`${el.time}/${el.price}$`})} >
              <div>{el.time}წთ</div>
              <div>{el.price}ლარი</div>
            </div>
          )}
        </div>
        
      </div>


      <div>
        <div>დრო</div>
        <input type='date' onChange={(e) => setRequest({...request ,date:e.target.value})}></input>
      </div>


      <div>
        <div>დამატებითი ინფო</div>
        <input type='textarea' onChange={(e) =>setRequest({...request ,info:e.target.value})}></input>
      </div>


      <button onClick={sendRequest}>გაგზავნა</button>
    </div>
  )
})


export default OrderService