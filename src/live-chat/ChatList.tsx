import React, { useEffect, useState } from 'react'
import { db, auth } from "../services/firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { useNavigate  } from 'react-router-dom';
import ChatAdmin from './ChatAdmin';
import { Chat } from './liveChat';
import Home from '../pages/Home';


export default function ChatList() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const driversRef = collection(db, "Drivers");

  const [mechanics, setMechanics] = useState<any[]>([]);
  const mechanicsRef = collection(db, "Mechanics");

  const navigate = useNavigate()

  useEffect(() => {
    const queryDrivers = query(
      driversRef
    );
    const unsuscribe = onSnapshot(queryDrivers, (snapshot) => {
      let drivers : any = [];
      snapshot.forEach((doc) => {
        drivers.push({ ...doc.data(), id: doc.id });
      });
      console.log(drivers);
      setDrivers(drivers);
    });

    return () => unsuscribe();
  }, []);

  //---------------------------------------

  useEffect(() => {
    const queryMechanics = query(
      mechanicsRef
    );
    const unsuscribe = onSnapshot(queryMechanics, (snapshot) => {
      let mechanics : any = [];
      snapshot.forEach((doc) => {
        mechanics.push({ ...doc.data(), id: doc.id });
      });
      console.log(mechanics);
      setMechanics(mechanics);
    });

    return () => unsuscribe();
  }, []);


  //------------------------------------------
  // const [email, setEmail] = useState<string | null>(null);

  // const getDriverEmail = async (e: any) => {
  //   const q = query(collection(db, 'Drivers'), where('fname', '==', e));
  //   const snapshot = await getDocs(q);
  //   if (snapshot.empty) {
  //     console.log('No matching documents.');
  //     return;
  //   }
  //   snapshot.forEach((doc) => {
  //     //const data = doc.data() as Driver;
  //     setEmail(doc.data().email);
  //   });
  // };
  
  //-----------------navigate to chat----------------
  
  const handleClickDriver =  (e: any) => {
    //<Chat id={"ss"} />
    console.log(e);
    //getDriverEmail(e);
    //console.log(email);
    navigate('/liveChat/'+ e +'-admin')
    window.location.reload();
  };

  const handleClickMechanic =  (e: any) => {
    console.log(e);
    navigate('/liveChat/'+ e +'-admin')
    window.location.reload();
  };

  return (
    <>
    <div className='chatList'>
    <div className='chatListHeader'><h5>Drivers</h5></div>
    <div className="drivers">
        {drivers.map((driver) => {
          return(
          <div key={driver.id} className="driverList">
            {/* <div className='driverListItem'>{driver.fname}  &thinsp;</div> */}
            <ul className="list-group">
              <li className="list-group-item" onClick={(e) => handleClickDriver(driver.fname)}>{driver.fname} {driver.lname}</li>
            </ul>
          </div>
          )
          })}
      </div>
    </div>
    
    <hr></hr>
    <div className='chatList'>
    <div className='chatListHeader'><h5>Mechanics</h5></div>
    <div className="mechanics">
        {mechanics.map((mechanic) => {
          return(
          <div key={mechanic.id} className="mechanicList">
            {/* <div className='mechanicListItem'>{mechanic.fname}  &thinsp;</div> */}
            <ul className="list-group">
              <li className="list-group-item" onClick={(e) => handleClickMechanic(mechanic.fname)}>{mechanic.fname} {mechanic.lname}</li>
            </ul>
          </div>
          )
          })}
      </div>
    </div>
    </>
  )
}
