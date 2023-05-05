import React, { useState, useEffect } from 'react';
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


import "../assets/home.css";
import JobsChart from './JobsChart';

export default function Home() {
  const driversRef = collection(db, "Drivers");
  const mechanicsRef = collection(db, "Mechanics");
  const activeJobsRef = collection(db, "Jobs");
  const [driverCount, setdriverCount] = useState(0);
  const [mechanicCount, setmechanicCount] = useState(0);
  const [activeJobs, setactiveJobs] = useState(0);

  useEffect(() => {
    const queryDrivers = query(driversRef);
    const unsuscribe = onSnapshot(queryDrivers, (snapshot) => {
      setdriverCount(snapshot.size);
    });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const queryMechanics = query(mechanicsRef);
    const unsuscribe = onSnapshot(queryMechanics, (snapshot) => {
      setmechanicCount(snapshot.size);
    });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const queryActiveJobs = query(activeJobsRef, where("jobRequestStatus", "==", "accepted"));
    const unsuscribe = onSnapshot(queryActiveJobs, (snapshot) => {
      setactiveJobs(snapshot.size);
    });

    return () => unsuscribe();
  }, []);

  


  return (
    <div>
      <center>
        <div className="container shadow p-3 mb-5 bg-white rounded ">
          <center>
            <h1 className="display-6">Total Drivers</h1>
            <strong>
              <h1 className="display-4">{driverCount}</h1>
            </strong>
          </center>
        </div>

        <div className="container shadow p-3 mb-5 bg-white rounded">
          <center>
            <h1 className="display-6">Total Mechanics</h1>
            <strong>
              <h1 className="display-4">{mechanicCount}</h1>
            </strong>
          </center>
        </div>

        <div className="container shadow p-3 mb-5 bg-white rounded">
          <center>
            <h1 className="display-6">Active Jobs</h1>
            <strong>
              <h1 className="display-4">{activeJobs}</h1>
            </strong>
          </center>
        </div>
      </center>

      <div style={{width:"40%"}}>
      <JobsChart />
      </div>
      
    </div>
  );
}
