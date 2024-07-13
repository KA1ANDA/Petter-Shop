import { arrayRemove, arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../config/firebase';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';


const useGetProductPhotos = ({product}) => {
  const [photoUrls, setPhotoUrls] = useState([]);
  
  useEffect(() => {

    if(product){
      const fetchPhotoUrls = async () => {
        const storage = getStorage();
        const folderRef = ref(storage, `products/${product.id}/`);
  
        try {
          const res = await listAll(folderRef);
          const downloadUrls = await Promise.all(
            res.items.map(async (photoRef) => {
              const url = await getDownloadURL(photoRef);
              return url;
            })
          );
  
          setPhotoUrls(downloadUrls);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPhotoUrls();
    }
   
  }, [product]);

  return {photoUrls};
}

export default useGetProductPhotos;
