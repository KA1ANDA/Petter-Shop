import { useState, useEffect } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const useGetServices = () => {
  
  const ServicesdocRef = collection(db, "services");

  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const docSnapshots = await getDocs(ServicesdocRef);
      const data = docSnapshots.docs.map((doc) => doc.data());
      setServicesData(data);
    };
  
    fetchServices();

  }, []);

  return servicesData;
};

export default useGetServices;




