// import { useState, useEffect } from 'react';
// import { getDocs, query, where, collection } from 'firebase/firestore';
// import { auth, db } from '../config/firebase';



// const useGetNotificationRef = () => {
//   const [docRef, setDocRef] = useState(null);
  

//   useEffect(() => {

   
//     if(auth.currentUser.uid){
//       const q = query(collection(db, 'notifications'), where('recipientId', '==',  auth.currentUser.uid));


//       console.log(q)
      
//       getDocs(q).then((querySnapshot) => {
//         if (querySnapshot.docs.length > 0) {
//           const docRef = querySnapshot.docs[0].ref;
//           setDocRef(docRef);
//         } else {
//           // Handle the case where no documents are found
//           setDocRef(null); // or handle it according to your needs
//           console.log("No document found for the selected user ID.");
//         }
        
//       });
//     }

    
//   }, [auth.currentUser.uid]);

//   return docRef;
// };

// export default useGetNotificationRef;




