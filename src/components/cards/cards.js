import { useState, useEffect } from 'react';
import CardComponent from '../cardComponent/cardComponent.js';
import AddCardComponent from '../addCardComponent/addCardComponent.js';
import Test from '../test/test.js';

import './cards.css'

export default function Cards() {
    const [data, setData] = useState([]);

    const getData = async() => {
    const res = await fetch('http://localhost:3001/api/phones');
      if (!res.ok) {
        throw new Error('Erreur dans la récuperation dans getData')
      }
      return res.json()
    };

  
    useEffect(() => {
      const fetchData = async () => { 
        try {
          const result = await getData();
          setData(result);
        } catch (error) {
          console.error('Erreur dans la récupération des données :', error);
        }
      };
      fetchData();
    }, []);

  
    const handlePhoneCreate = (newPhone) => {
      setData((prevData) => [...prevData, newPhone]);
    };
    const handlePhoneUpdate = (id, updatedPhone) => {
      setData((prevData) =>
        prevData.map((phone) => (phone._id === id ? { ...phone, ...updatedPhone } : phone))
      );
    };
    const handlePhoneDelete = (id) => {
      setData((prevData) => prevData.filter((phone) => phone._id !== id));
    };

    return (
      <div>
        <div className='addPhoneButton'>
          <AddCardComponent onPhoneCreate={handlePhoneCreate} />
        </div>
        <div className='cardsContainer'>
          {data.map((phone) => (
            <CardComponent
              key={phone._id}
              phone={phone}
              onPhoneUpdate={handlePhoneUpdate}
              onPhoneDelete={handlePhoneDelete}
            />
          ))}
        </div>
      </div>
    );
}
