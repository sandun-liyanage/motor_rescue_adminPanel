import React, { useEffect, useState } from 'react'
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate  } from 'react-router-dom';
import ChatAdmin from './ChatAdmin';
import { Chat } from './liveChat';
import Home from './Home';


export default function ChatList() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const driversRef = collection(db, "Drivers");

  const [mechanics, setMechanics] = useState<any[]>([]);
  const mechanicsRef = collection(db, "Mechanics");

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

  const navigate = useNavigate()

  const handleClick = (e: any) => {
    //<Chat id={"ss"} />
    //navigate('/liveChat/${paramValue}')
    console.log(e);
  };

  return (
    <>
    <div className='chatList'>
    <div className='chatListHeader'>Drivers</div>
    <div className="drivers">
        {drivers.map((driver) => {
          return(
          <div key={driver.id} className="driverList">
            {/* <div className='driverListItem'>{driver.fname}  &thinsp;</div> */}
            <ul className="list-group">
              <li className="list-group-item" onClick={handleClick}>{driver.fname}</li>
            </ul>
          </div>
          )
          })}
      </div>
    </div>
    
    <hr></hr>
    <div className='chatList'>
    <div className='chatListHeader'>Mechanics</div>
    <div className="mechanics">
        {mechanics.map((mechanic) => {
          return(
          <div key={mechanic.id} className="mechanicList">
            {/* <div className='mechanicListItem'>{mechanic.fname}  &thinsp;</div> */}
            <ul className="list-group">
              <li className="list-group-item">{mechanic.fname}</li>
            </ul>
          </div>
          )
          })}
      </div>
    </div>
    </>
  )
}
